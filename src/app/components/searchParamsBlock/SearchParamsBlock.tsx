'use client';
import styles from './SearchParamsBlock.module.css';
import Searchbar from '../searchbar/Searchbar';

function SearchParamsBlock({
	count,
	searchParams,
	searchField,
}: {
	count: number;
	searchParams: { [key: string]: string | undefined };
	searchField: string;
}) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.results}>
				<p className={styles.resultsCounter}>Results: {count}</p>
			</div>
			<div className={styles.searchHeader}>
				<Searchbar
					initialSearch={searchParams.searchValue}
					searchField={searchField}
				/>
			</div>
		</div>
	);
}

export default SearchParamsBlock;
