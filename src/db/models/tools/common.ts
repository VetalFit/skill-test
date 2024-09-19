import { Model } from 'mongoose';

export const paginatedSearch = async <T>(
	model: Model<T>,
	findQuery: any,
	searchField: string | null,
	searchValue: string | null,
	limit = 10,
	offset = 0,
	populateFields?: string[] // Array of fields to populate
) => {
	const query: Record<string, any> = { ...findQuery };

	if (searchField && searchValue) {
		query[searchField] = new RegExp(searchValue, 'i');
	}

	let queryBuilder = model.find(query).limit(limit).skip(offset);

	if (populateFields && populateFields.length > 0) {
		populateFields.forEach((field) => {
			queryBuilder = queryBuilder.populate(field);
		});
	}

	const list = await queryBuilder;
	const count = await model.countDocuments(query);

	return { list, count };
};
