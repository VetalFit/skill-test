import Founder from '@/db/models/founder.model';

export const mapFounder = (founder: InstanceType<typeof Founder>) => {
	return {
		id: founder._id,
		firstName: founder.firstName,
		lastName: founder.lastName,
	};
};
