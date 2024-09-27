import mongoose from 'mongoose';
import dbConnect from '@/libs/mongoose';
import Founder from '@/db/models/founder.model';
import { NextRequest, NextResponse } from 'next/server';
import { mapFounder } from './helpers';
import { searchWithoutPagination } from '@/db/models/tools/common';

export async function GET(req: NextRequest) {
	try {
		await dbConnect();
		const queryParams = req.nextUrl.searchParams;

		const searchField = queryParams.get('searchField');
		const searchValue = queryParams.get('searchValue');

		const { list, count } = await searchWithoutPagination(
			Founder,
			{},
			searchField,
			searchValue
		);

		const founders = list;
		const mappedFounders = founders.map((founder) => mapFounder(founder));

		return NextResponse.json({ list: mappedFounders, count });
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { firstName, lastName } = body;
		if (!firstName || !lastName) {
			return new NextResponse(null, {
				status: 400,
				statusText: `Missing field.`,
			});
		}
		const founderDto = { firstName, lastName };
		const founder = await Founder.create(founderDto);
		return NextResponse.json(mapFounder(founder));
	} catch (e: any) {
		console.error(e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	try {
		await dbConnect();

		const { searchParams } = req.nextUrl;
		const founderId = searchParams.get('id');

		if (!founderId) {
			return new NextResponse(null, {
				status: 400,
				statusText: 'Founder ID is missing.',
			});
		}

		if (!mongoose.Types.ObjectId.isValid(founderId)) {
			return new NextResponse(null, {
				status: 400,
				statusText: 'Invalid founder ID format.',
			});
		}

		const founder = await Founder.findByIdAndDelete(founderId);

		if (!founder) {
			return new NextResponse(null, {
				status: 404,
				statusText: 'Founder not found.',
			});
		}

		return NextResponse.json({ message: 'Founder deleted successfully.' });
	} catch (e: any) {
		console.error('Error:', e?.message);
		return NextResponse.json({ error: e?.message }, { status: 500 });
	}
}
