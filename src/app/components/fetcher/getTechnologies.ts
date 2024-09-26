export type Technologies = {
	id: number;
	label: string;
};

const getTechonologies = async (): Promise<Technologies[] | undefined> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/technologies`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
};

export default getTechonologies;
