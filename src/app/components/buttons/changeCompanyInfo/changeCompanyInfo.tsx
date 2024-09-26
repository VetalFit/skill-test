'use client';
import React, { useEffect, useState } from 'react';
import Modal from '../../modal/Modal';
import styles from './changeCompanyInfo.module.css';
import getFoundersList, { Founders } from '../../fetcher/getFoundersList';
import { Founder } from '../../fetcher/getFounderById';
import getCompanyById from '../../fetcher/getCompanyById';

export default function ChangeCompanyInfo({
	companyId,
	onSuccess,
}: {
	companyId: string;
	onSuccess: () => void;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [name, setName] = useState('');
	const [founderName, setFounderName] = useState('');
	const [founderId, setFounderId] = useState('');
	const [founders, setFounders] = useState<Founders>();
	const [filteredFounders, setFilteredFounders] = useState<Founder[]>([]);

	useEffect(() => {
		const fetchFounders = async () => {
			try {
				const data = await getFoundersList();
				if (data) setFounders(data);
				const company = await getCompanyById(companyId);
				if (company) {
					setName(company.name);
					setFounderId(company.founder.id);
					setFounderName(company.founder.firstName);
				}
			} catch (error) {
				console.error('Failed to fetch founders', error);
			}
		};
		if (isModalOpen) {
			fetchFounders();
		}
	}, [isModalOpen]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setFounderName(value);

		if (value && founders) {
			const filtered = founders.list.filter((founder) =>
				founder.firstName.toLowerCase().includes(value.toLowerCase())
			);
			setFilteredFounders(filtered);
		}
	};

	const handleSubmit = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/company/${companyId}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name,
						founderId,
					}),
				}
			);

			if (!response.ok) {
				throw new Error('Failed to change company');
			}

			setIsModalOpen(false);
			setName('');
			setFounderName('');
			onSuccess();
		} catch (error) {
			console.error('Error changing company');
		}
	};

	return (
		<>
			<button
				className={styles.changeButton}
				onClick={() => setIsModalOpen(true)}
			>
				Change Info
			</button>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Change info"
			>
				<div className={styles.inputWrapper}>
					<input
						type="text"
						value={name}
						className={styles.input}
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter name"
						required
					/>
					<input
						type="text"
						value={founderName}
						className={styles.input}
						onChange={handleInputChange}
						placeholder="Enter founder"
						required
					/>
				</div>
				{filteredFounders.length > 0 && (
					<ul className={styles.dropdown}>
						{filteredFounders.map((founder) => (
							<li
								key={founder.id}
								className={styles.dropdownItem}
								onClick={() => {
									setFounderName(founder.firstName);
									setFounderId(founder.id);
									setFilteredFounders([]);
								}}
							>
								{founder.firstName} {founder.lastName}
							</li>
						))}
					</ul>
				)}
				<button
					className={styles.changeButton}
					onClick={() => handleSubmit()}
				>
					Change
				</button>
			</Modal>
		</>
	);
}
