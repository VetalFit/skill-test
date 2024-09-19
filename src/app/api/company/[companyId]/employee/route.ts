import { paginatedSearch } from '@/db/models/tools/common';
import dbConnect from '@/libs/mongoose';
import { NextRequest, NextResponse } from 'next/server';
import Employee from '@/db/models/employee.model';
import mongoose from 'mongoose';
import { mapEmployee } from '@/app/api/employee/helpers';

export async function GET(
	req: NextRequest,
	res: { params: { companyId: string } }
) {
	try {
		await dbConnect();

		const { companyId } = res.params;

		if (!mongoose.Types.ObjectId.isValid(companyId)) {
			return NextResponse.json(
				{ error: 'Invalid company ID format.' },
				{ status: 400 }
			);
		}

		const queryParams = req.nextUrl.searchParams;

		const limit = queryParams.get('limit');
		const offset = queryParams.get('offset');
		const searchField = queryParams.get('searchField');
		const searchValue = queryParams.get('searchValue');

		const { list, count } = await paginatedSearch(
			Employee,
			{ companyId },
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
