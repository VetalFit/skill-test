'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './Searchbar.module.css';
import Input from '../input/Input';

function Searchbar({
	initialSearch,
	searchField,
}: {
	initialSearch: string | undefined;
	searchField: string;
}) {
	const query = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const [input, setInput] = useState('');

	useEffect(() => {
		if (initialSearch) {
			setInput(initialSearch);
		}
	}, []);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!query) {
			return;
		}
		const modifiedQueryParams = new URLSearchParams(
			Array.from(query.entries())
		);
		modifiedQueryParams.set('searchField', searchField);
		modifiedQueryParams.set('searchValue', input);
		router.push(`${pathname}/?${modifiedQueryParams}`);
	};

	const clearSearch = () => {
		setInput('');
		const modifiedQueryParams = new URLSearchParams(
			Array.from(query.entries())
		);
		modifiedQueryParams.delete('searchValue');
		router.push(`${pathname}/?${modifiedQueryParams}`);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.searchForm}>
			<div className={styles.searchWrapper}>
				<Input
					placeholder="Search"
					className={styles.searchInput}
					type="text"
					value={input}
					onChange={(event) => setInput(event.target.value)}
					maxLength={255}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleSubmit(
								e as unknown as FormEvent<HTMLFormElement>
							);
						}
					}}
				/>
				{input.length ? (
					<button
						className={styles.clearSearch}
						onClick={clearSearch}
					>
						X
					</button>
				) : null}
			</div>
			<button
				className={styles.searchButton}
				disabled={input ? false : true}
				type="submit"
			>
				Search
			</button>
		</form>
	);
}

export default Searchbar;
