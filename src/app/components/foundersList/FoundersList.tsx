'use client';
import { List, ListRowProps } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './FoundersList.module.css';
import { useEffect, useState } from 'react';
import getFoundersList, { Founders } from '../fetcher/getFoundersList';
import { Founder } from '../fetcher/getFounderById';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const FoundersList: React.FC = (): JSX.Element => {
	const [founders, setFounders] = useState<Founders | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchFounders = async () => {
		setIsLoading(true);
		try {
			const data = await getFoundersList();
			if (data) setFounders(data);
		} catch (error) {
			console.error('Failed to fetch founders', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchFounders();
	}, []);

	const deleteFounderFromServer = async (founderId: string) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/founder/${founderId}`,
				{
					method: 'DELETE',
				}
			);
			if (!response.ok) {
				throw new Error('Failed to delete founder');
			}
			console.log('Founder deleted successfully');
		} catch (error) {
			console.error('Error deleting founder:', error);
		}
	};

	const removeFounder = (founderId: string) => {
		if (!founders || !founders.list) return;

		deleteFounderFromServer(founderId);

		const updatedList = founders.list.filter(
			(founder) => founder.id !== founderId
		);
		setFounders({
			...founders,
			list: updatedList,
			count: updatedList.length,
		});
	};

	const rowRenderer = ({ key, index, style }: ListRowProps) => {
		if (!founders || !founders.list) return null;

		const founder: Founder = founders.list[index];

		return (
			<div key={key} style={style} className={styles.listItem}>
				<span>
					{founder?.firstName} {founder?.lastName}
				</span>
				<button
					className={styles.deleteButton}
					onClick={() => removeFounder(founder.id)}
				>
					&times;
				</button>
			</div>
		);
	};

	if (isLoading) {
		return (
			<div className={styles.spinnerWrapper}>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className={styles.wrapper}>
			<p className={styles.results}>
				Results: {founders ? founders.count : 0}
			</p>
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
