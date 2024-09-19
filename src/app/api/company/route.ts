import { paginatedSearch } from '@/db/models/tools/common';
import dbConnect from '@/libs/mongoose';
import { NextRequest, NextResponse } from 'next/server';
import Company from '@/db/models/company.model';
import { mapCompany } from './helpers';

export async function GET(req: NextRequest) {
	try {
		await dbConnect();
		const queryParams = req.nextUrl.searchParams;

		const limit = queryParams.get('limit');
		const offset = queryParams.get('offset');
		const searchField = queryParams.get('searchField');
		const searchValue = queryParams.get('searchValue');

		const { list, count } = await paginatedSearch(
			Company,
			{},
			searchField,
			searchValue,
			Number(limit ?? 10),
			Number(offset ?? 0),
			['founderId']
		);

		const companies = list;
		const companyCount = count;
		const mappedCompanies = companies.map((company) => mapCompany(company));

		return NextResponse.json({
			list: mappedCompanies,
			count: companyCount,
		});
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { name, founderId } = body;

		if (!name || !founderId) {
			return new NextResponse(null, {
				status: 400,
				statusText: `Missing field.`,
			});
		}

		const companyDto = { name, founderId };
		const company = await Company.create(companyDto);
		return NextResponse.json(mapCompany(company));
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}
