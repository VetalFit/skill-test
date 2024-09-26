import { ObjectId } from 'mongodb';
import { Model, PipelineStage } from 'mongoose';

export const paginatedSearch = async <T>(
	model: Model<T>,
	findQuery: any,
	searchField: string | null,
	searchValue: string | null,
	limit = 10,
	offset = 0,
	populateFields?: string[]
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

export const paginatedEmployeeSearch = async <T>(
	model: Model<T>,
	searchValue: string | null,
	limit = 10,
	offset = 0,
	companyId: string
) => {
	let count = 0;
	let list = [];
	if (searchValue) {
		const aggregation: PipelineStage[] = [
			{
				$addFields: {
					fullName: { $concat: ['$firstName', ' ', '$lastName'] },
				},
			},
			{
				$match: {
					fullName: { $regex: new RegExp(searchValue, 'i') },
				},
			},
			{
				$match: {
					companyId: new ObjectId(companyId),
				},
			},
			{
				$facet: {
					paginatedResults: [{ $skip: offset }, { $limit: limit }],
					totalCount: [{ $count: 'count' }],
				},
			},
		];
		const queryBuilder = await model.aggregate(aggregation);
		list = queryBuilder[0]?.paginatedResults || [];
		count = queryBuilder[0]?.totalCount[0]?.count || 0;
	} else {
		const query: Record<string, any> = {};
		if (companyId) {
			query.companyId = companyId;
		}
		const queryBuilder = await model.find(query).limit(limit).skip(offset);
		count = await model.countDocuments(query);
		list = queryBuilder;
	}

	return { list, count };
};
