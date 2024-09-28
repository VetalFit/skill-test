'use client';
import React, { useState } from 'react';
import Modal from '../../modal/Modal';
import styles from './AddEmployee.module.css';
import TechnologiesList from '../../technologiesLIst/TechnologiesList';

export default function AddEmployeeButton({
	companyId,
	onSuccess,
}: {
	companyId: string;
	onSuccess: () => void;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [position, setPosition] = useState('');
	const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
		[]
	);

	const handleSetSelectedTechnologies = (technology: string) => {
		if (selectedTechnologies.length >= 5) {
			return;
		}
		setSelectedTechnologies((prevState: string[]) => {
			if (!prevState.includes(technology)) {
				return [...prevState, technology];
			}
			return prevState;
		});
	};

	const handleDelSelectedTechnologies = (technology: string) => {
		setSelectedTechnologies((prevState: string[]) => {
			return prevState.filter((tech) => tech !== technology);
		});
	};

	const handleSubmit = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/employee`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						firstName,
						lastName,
						companyId,
						position,
						technologies: selectedTechnologies,
					}),
				}
			);

			if (!response.ok) {
				throw new Error('Failed to add founder');
			}

			setIsModalOpen(false);
			setFirstName('');
			setLastName('');
			setPosition('');
			setSelectedTechnologies([]);
			onSuccess();
		} catch (error) {
			console.error('Error adding founder');
		}
	};

	return (
		<>
			<button
				className={styles.submitButton}
				onClick={() => setIsModalOpen(true)}
			>
				Add Employee
			</button>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Add Employee"
			>
				<div className={styles.inputWrapper}>
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="Enter FirstName"
					/>
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Enter LastName"
					/>
					<input
						type="text"
						value={position}
						onChange={(e) => setPosition(e.target.value)}
						placeholder="Enter Position"
					/>
					{
						<div className={styles.technologiesContainer}>
							<div className={styles.titleTechnologies}>
								technologies:
							</div>
							{selectedTechnologies.map((tech) => {
								return (
									<div
										key={tech}
										onClick={() =>
											handleDelSelectedTechnologies(tech)
										}
										className={styles.technologyPill}
									>
										{tech}{' '}
										<span className={styles.removeIcon}>
											✖
										</span>
									</div>
								);
							})}
						</div>
					}
					<TechnologiesList
						handleSelect={handleSetSelectedTechnologies}
					/>
					<button
						className={styles.submitButton}
						onClick={handleSubmit}
					>
						Add
					</button>
				</div>
			</Modal>
		</>
	);
}
