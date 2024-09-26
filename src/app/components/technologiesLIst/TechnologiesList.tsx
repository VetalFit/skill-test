'use client';
import { List, ListRowProps } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './TechnologiesList.module.css';
import items from './output.json';
import { useState } from 'react';

interface Technology {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

interface ListProps {
	handleSelect: (technology: string) => void;
}

const TechnologiesList: React.FC<ListProps> = (
	props: ListProps
): JSX.Element => {
	const tech: Technology[] = items as Technology[];
	const { handleSelect } = props;
	const [technologies, setTechnologies] = useState<Technology[]>(tech);
	const [searchValue, setSearchValue] = useState('');

	const handleSearch = (value: string) => {
		setSearchValue(value.toLowerCase());

		if (!value) {
			setTechnologies(tech);
			return;
		}

		const filtered = tech.filter(
			(technology) =>
				technology.name &&
				technology.name.toLowerCase().includes(value.toLowerCase())
		);
		setTechnologies(filtered);
	};

	const rowRenderer = ({ key, index, style }: ListRowProps) => {
		const technology = technologies[index];

		return (
			<div
				onClick={() => handleSelect(technology?.name)}
				key={key}
				style={style}
				className={styles.listItem}
			>
				{technology?.name}
			</div>
		);
	};

	return (
		<div className={styles.wrapper}>
			<input
				type="text"
				value={searchValue}
				className={styles.input}
				onChange={(e) => handleSearch(e.target.value)}
				placeholder="Enter technology"
			/>
			<List
				width={360}
				height={120}
				rowCount={technologies.length}
				rowHeight={40}
				rowRenderer={rowRenderer}
			/>
		</div>
	);
};

export default TechnologiesList;
