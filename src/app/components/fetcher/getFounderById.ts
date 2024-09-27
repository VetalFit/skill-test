export type Founder = {
	id: string;
	firstName: string;
	lastName: string;
};

const getFounderById = async (
	founderId: string
): Promise<Founder | undefined> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/founder/${founderId}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('No founderId provided:', error);
	}
};

export default getFounderById;
