export type Technologies = {
	id: number;
	label: string;
};

const getTechonologies = async (): Promise<Technologies[] | undefined> => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/technologies`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
};

export default getTechonologies;
