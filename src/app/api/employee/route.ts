import dbConnect from '@/libs/mongoose';
import Employee from '@/db/models/employee.model';
import { paginatedSearch } from '@/db/models/tools/common';
import { NextRequest, NextResponse } from 'next/server';
import { mapEmployee } from './helpers';

export async function GET(req: NextRequest) {
	try {
		await dbConnect();
		const queryParams = req.nextUrl.searchParams;

		const limit = queryParams.get('limit');
		const offset = queryParams.get('offset');
		const searchField = queryParams.get('searchField');
		const searchValue = queryParams.get('searchValue');

		const { list, count } = await paginatedSearch(
			Employee,
			{},
			searchField,
			searchValue,
			Number(limit ?? 10),
			Number(offset ?? 0),
			['companyId']
		);

		const employees = list;
		const employeeCount = count;
		const mappedFounders = employees.map((employee) =>
			mapEmployee(employee)
		);

		return NextResponse.json({
			list: mappedFounders,
			count: employeeCount,
		});
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { firstName, lastName, companyId, position } = body;
		if (!firstName || !lastName || !companyId || !position) {
			return new NextResponse(null, {
				status: 400,
				statusText: `Missing field.`,
			});
		}

		const employeeDto = { firstName, lastName, companyId, position };
		const creationResult = await Employee.create(employeeDto);
		const employee = await Employee.findById(creationResult._id).populate(
			'companyId'
		);
		return NextResponse.json(mapEmployee(employee));
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}
