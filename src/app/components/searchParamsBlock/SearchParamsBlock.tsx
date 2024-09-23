'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './SearchParamsBlock.module.css';
import SecondarySearchbar from '../searchbar/Searchbar';

function SearchParamsBlock({
	count,
	searchParams,
	// location,
	searchField,
}: {
	count: number;
	searchParams: { [key: string]: string | undefined };
	// location: 'blog' | 'project' | 'profile' | 'users';
	searchField: string;
}) {
	const query = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	// const [isModalOpen, setIsModalOpen] = useState(false);
	// const technologiesParam = searchParams?.['technologies'];
	// const technologyCount = technologiesParam
	// 	? technologiesParam.split(',').length
	// 	: 0;

	// const toggleModal = () => {
	// 	setIsModalOpen(!isModalOpen);
	// };

	const handleCheckboxChange = async () =>
		// e: React.ChangeEvent<HTMLInputElement>
		{
			const modifiedQueryParams = new URLSearchParams(
				Array.from(query.entries())
			);
			// if (!query.has('searchByDescription')) {
			// 	modifiedQueryParams.set('searchByDescription', 'true');
			// }
			// if (query.get('searchByDescription') === 'true') {
			// 	modifiedQueryParams.delete('searchByDescription');
			// }
			router.push(`${pathname}/?${modifiedQueryParams}`);
		};

	return (
		<div className={styles.wrapper}>
			<div className={styles.results}>
				<p className={styles.resultsCounter}>Results: {count}</p>
			</div>
			<div className={styles.searchHeader}>
				<div className={styles.searchBlock}>
					<SecondarySearchbar
						initialSearch={searchParams.search}
						searchField={searchField}
					/>
					<div className={styles.fullTextBlock}>
						<input
							onChange={handleCheckboxChange}
							className={styles.checkbox}
							type="checkbox"
						/>
						<label htmlFor="">Full Text Search</label>
					</div>
				</div>
				{/* <SortSelector searchParams={searchParams} /> */}
			</div>
			<div className={styles.checkboxWrapper}></div>
		</div>
	);
}

export default SearchParamsBlock;
