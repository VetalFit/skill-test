import dbConnect from '@/libs/mongoose';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Employee from '@/db/models/employee.model';
import { mapEmployee } from '../helpers';

export async function GET(
	req: NextRequest,
	res: { params: { employeeId: string } }
) {
	try {
		await dbConnect();

		const { employeeId } = res.params;

		if (!mongoose.Types.ObjectId.isValid(employeeId)) {
			return NextResponse.json(
				{ error: 'Invalid employee ID format.' },
				{ status: 400 }
			);
		}

		const employee = await Employee.findById(employeeId).populate(
			'companyId'
		);

		if (!employee) {
			return NextResponse.json(
				{ error: 'Employee not found.' },
				{ status: 404 }
			);
		}

		const mappedEmployee = mapEmployee(employee);

		return NextResponse.json(mappedEmployee);
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}

export async function DELETE(
	req: NextRequest,
	res: { params: { employeeId: string } }
) {
	try {
		await dbConnect();

		const { employeeId } = res.params;

		if (!mongoose.Types.ObjectId.isValid(employeeId)) {
			return NextResponse.json(
				{ error: 'Invalid employee ID format.' },
				{ status: 400 }
			);
		}

		const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

		if (!deletedEmployee) {
			return NextResponse.json(
				{ error: 'Employee not found.' },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: 'Employee deleted successfully.' },
			{ status: 200 }
		);
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}

export async function PATCH(
	req: NextRequest,
	res: { params: { employeeId: string } }
) {
	try {
		await dbConnect();

		const { employeeId } = res.params;

		if (!mongoose.Types.ObjectId.isValid(employeeId)) {
			return NextResponse.json(
				{ error: 'Invalid employee ID format.' },
				{ status: 400 }
			);
		}

		const body = await req.json();
		const { firstName, lastName, companyId, position } = body;

		if (!firstName || !lastName || !companyId || !position) {
			return NextResponse.json(
				{ error: 'No fields provided for update.' },
				{ status: 400 }
			);
		}

		const updatedEmployee = await Employee.findByIdAndUpdate(
			employeeId,
			{ firstName, lastName, companyId, position },
			{ new: true, runValidators: true }
		);

		if (!updatedEmployee) {
			return NextResponse.json(
				{ error: 'Company not found.' },
				{ status: 404 }
			);
		}

		const mappedEmployee = mapEmployee(updatedEmployee);

		return NextResponse.json(mappedEmployee, { status: 200 });
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}
