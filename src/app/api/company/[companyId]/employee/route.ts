import mongoose from 'mongoose';
import dbConnect from '@/libs/mongoose';
import EmployeeModel from '@/db/models/employee.model';
import { paginatedEmployeeSearch } from '@/db/models/tools/common';
import { NextRequest, NextResponse } from 'next/server';
import { mapEmployee } from '@/app/api/employee/helpers';
import { Employee } from '@/app/components/fetcher/getEmployeesList';

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
		const searchValue = queryParams.get('searchValue');

		const { list, count } = await paginatedEmployeeSearch(
			EmployeeModel,
			searchValue,
			Number(limit ?? 10),
			Number(offset ?? 0),
			companyId
		);

		const employees = list;
		const employeeCount = count;
		const mappedEmployees = employees.map((employee: Employee) =>
			mapEmployee(employee)
		);

		return NextResponse.json({
			list: mappedEmployees,
			count: employeeCount,
		});
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}
