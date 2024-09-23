import mongoose from 'mongoose';
import dbConnect from '@/libs/mongoose';
import Company from '@/db/models/company.model';
import { NextRequest, NextResponse } from 'next/server';
import { mapCompany } from '../helpers';
import Employee from '@/db/models/employee.model';

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

		const company = await Company.findById(companyId).populate('founderId');

		if (!company) {
			return NextResponse.json(
				{ error: 'Company not found.' },
				{ status: 404 }
			);
		}

		const mappedCompany = mapCompany(company);

		return NextResponse.json(mappedCompany);
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}

export async function DELETE(
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

		const deletedCompany = await Company.findByIdAndDelete(companyId);

		if (!deletedCompany) {
			return NextResponse.json(
				{ error: 'Company not found.' },
				{ status: 404 }
			);
		}

		// I know that this is the bad practice and employees should be deleted cascade automatically, but this is hard to achieve in mongodb
		await Employee.deleteMany({ companyId });

		return NextResponse.json(
			{ message: 'Company deleted successfully.' },
			{ status: 200 }
		);
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}

export async function PATCH(
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

		const body = await req.json();
		const { name, founderId } = body;

		if (!name && !founderId) {
			return NextResponse.json(
				{ error: 'No fields provided for update.' },
				{ status: 400 }
			);
		}

		const updateFields: {
			name?: string;
			founder?: mongoose.Types.ObjectId;
		} = {};

		if (name) {
			updateFields.name = name;
		}

		if (founderId && mongoose.Types.ObjectId.isValid(founderId)) {
			updateFields.founder = new mongoose.Types.ObjectId(founderId);
		}

		const updatedCompany = await Company.findByIdAndUpdate(
			companyId,
			updateFields,
			{ new: true, runValidators: true }
		);

		if (!updatedCompany) {
			return NextResponse.json(
				{ error: 'Company not found.' },
				{ status: 404 }
			);
		}

		const mappedEmployee = mapCompany(updatedCompany);

		return NextResponse.json(mappedEmployee, { status: 200 });
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}
