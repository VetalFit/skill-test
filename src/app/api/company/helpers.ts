import Company from '@/db/models/company.model';
import { mapFounder } from '../founder/helpers';

export const mapCompany = (company: InstanceType<typeof Company>) => {
	return {
		id: company._id,
		name: company.name,
		founder: company.founderId ? mapFounder(company.founderId) : null,
	};
};
