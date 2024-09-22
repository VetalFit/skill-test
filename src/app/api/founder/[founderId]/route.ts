import mongoose from 'mongoose';
import dbConnect from '@/libs/mongoose';
import Founder from '@/db/models/founder.model';
import { NextRequest, NextResponse } from 'next/server';
import { mapFounder } from '../helpers';

export async function GET(
	req: NextRequest,
	res: { params: { founderId: string } }
) {
	try {
		await dbConnect();

		const { founderId } = res.params;

		if (!mongoose.Types.ObjectId.isValid(founderId)) {
			return NextResponse.json(
				{ error: 'Invalid founder ID format.' },
				{ status: 400 }
			);
		}

		const founder = await Founder.findById(founderId);

		if (!founder) {
			return NextResponse.json(
				{ error: 'Founder not found.' },
				{ status: 404 }
			);
		}

		const mappedFounder = mapFounder(founder);

		return NextResponse.json(mappedFounder);
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}

export async function DELETE(
	req: NextRequest,
	res: { params: { founderId: string } }
) {
	try {
		await dbConnect();

		const { founderId } = res.params;

		if (!mongoose.Types.ObjectId.isValid(founderId)) {
			return NextResponse.json(
				{ error: 'Invalid founder ID format.' },
				{ status: 400 }
			);
		}

		const deletedFounder = await Founder.findByIdAndDelete(founderId);

		if (!deletedFounder) {
			return NextResponse.json(
				{ error: 'Founder not found.' },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: 'Founder deleted successfully.' },
			{ status: 200 }
		);
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}

export async function PATCH(
	req: NextRequest,
	res: { params: { founderId: string } }
) {
	try {
		await dbConnect();

		const { founderId } = res.params;

		if (!mongoose.Types.ObjectId.isValid(founderId)) {
			return NextResponse.json(
				{ error: 'Invalid founder ID format.' },
				{ status: 400 }
			);
		}

		const body = await req.json();
		const { firstName, lastName } = body;

		if (!firstName && !lastName) {
			return NextResponse.json(
				{ error: 'No fields provided for update.' },
				{ status: 400 }
			);
		}

		const updatedFounder = await Founder.findByIdAndUpdate(
			founderId,
			{ firstName, lastName },
			{ new: true, runValidators: true }
		);

		if (!updatedFounder) {
			return NextResponse.json(
				{ error: 'Founder not found.' },
				{ status: 404 }
			);
		}

		const mappedFounder = mapFounder(updatedFounder);

		return NextResponse.json(mappedFounder, { status: 200 });
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}
