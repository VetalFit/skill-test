'use client';
import React, { useEffect, useState } from 'react';
import Modal from '../../modal/Modal';
import styles from './AddEmployee.module.css';
import searchCompanies, {
	Companies,
	Company,
} from '../../fetcher/searchCompanies';

export default function AddEmployeeButton() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [companyId, setCompanyId] = useState('');
	const [companies, setCompanies] = useState<Companies>();
	const [companyName, setCompanyName] = useState('');
	const [position, setPosition] = useState('');
	const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

	useEffect(() => {
		const fetchFounders = async () => {
			try {
				const data = await searchCompanies();
				setCompanies(data);
			} catch (error) {
				console.error('Failed to fetch companies', error);
			}
		};
		if (isModalOpen) {
			fetchFounders();
		}
	}, [isModalOpen]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setCompanyName(value);

		if (value && companies) {
			const filtered = companies.list.filter((company) =>
				company.name.toLowerCase().includes(value.toLowerCase())
			);
			setFilteredCompanies(filtered);
		}
	};

	const handleSubmit = async () => {
		try {
			const response = await fetch(`http://localhost:3000/api/employee`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					firstName,
					lastName,
					companyId,
					position,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to add founder');
			}

			alert('Founder added successfully!');
			setIsModalOpen(false);
			setFirstName('');
			setLastName('');
			window.location.reload();
		} catch (error) {
			alert('Error adding founder');
		}
	};

	return (
		<>
			<button onClick={() => setIsModalOpen(true)}>Add Employee</button>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Add Employee"
			>
				<div className={styles.inputWrapper}>
					<input
						type="text"
						value={firstName}
						className={styles.input}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="Enter FirstName"
					/>
					<input
						type="text"
						value={lastName}
						className={styles.input}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Enter LastName"
					/>
					<input
						type="text"
						value={position}
						className={styles.input}
						onChange={(e) => setPosition(e.target.value)}
						placeholder="Enter Position"
					/>
					<input
						type="text"
						value={companyName}
						className={styles.input}
						onChange={handleInputChange}
						placeholder="Enter Company"
					/>
				</div>
				{filteredCompanies.length > 0 && (
					<ul className={styles.dropdown}>
						{filteredCompanies.map((company) => (
							<li
								key={company.id}
								className={styles.dropdownItem}
								onClick={() => {
									setCompanyName(company.name);
									setCompanyId(company.id);
									setFilteredCompanies([]);
								}}
							>
								{company.name}
							</li>
						))}
					</ul>
				)}
				<button className={styles.submitButton} onClick={handleSubmit}>
					Add
				</button>
			</Modal>
		</>
	);
}
