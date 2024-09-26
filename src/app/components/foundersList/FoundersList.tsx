'use client';
import { List, ListRowProps } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './FoundersList.module.css';
import { useEffect, useState } from 'react';
import getFoundersList, { Founders } from '../fetcher/getFoundersList';
import { Founder } from '../fetcher/getFounderById';

const FoundersList: React.FC = (): JSX.Element => {
	const [founders, setFounders] = useState<Founders | undefined>(undefined);

	useEffect(() => {
		const fetchFounders = async () => {
			try {
				const data = await getFoundersList();
				if (data) setFounders(data);
			} catch (error) {
				console.error('Failed to fetch founders', error);
			}
		};
		fetchFounders();
	}, []);

	const rowRenderer = ({ key, index, style }: ListRowProps) => {
		if (founders == undefined || founders.list == undefined) return null;

		const founder: Founder = founders.list[index];

		return (
			<div key={key} style={style} className={styles.listItem}>
				{founder?.firstName} {founder?.lastName}
			</div>
		);
	};

	return (
		<div className={styles.wrapper}>
			<p className={styles.results}>Results: {founders?.count}</p>
			<List
				width={360}
				height={320}
				rowCount={founders ? founders.count : 0}
				rowHeight={40}
				rowRenderer={rowRenderer}
			/>
		</div>
	);
};

export default FoundersList;
