import Employee from '@/db/models/employee.model';
import { NextRequest, NextResponse } from 'next/server';
import { mapEmployee } from './helpers';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { firstName, lastName, companyId, position, technologies } = body;
		if (
			!firstName ||
			!lastName ||
			!companyId ||
			!position ||
			!technologies
		) {
			return new NextResponse(null, {
				status: 400,
				statusText: `Missing field.`,
			});
		}

		const employeeDto = {
			firstName,
			lastName,
			companyId,
			position,
			technologies,
		};
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
