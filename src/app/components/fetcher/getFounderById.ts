export type Founder = {
	id: string;
	firstName: string;
	lastName: string;
};

const getFounderById = async (
	founderId: string | undefined
): Promise<Founder | undefined> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/founder/${founderId}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
};

export default getFounderById;
