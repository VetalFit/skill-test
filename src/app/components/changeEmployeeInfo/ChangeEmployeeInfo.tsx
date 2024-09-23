'use client';
import { useEffect, useState } from 'react';
import styles from './ChangeEmployeeInfo.module.css';
import Modal from '../modal/Modal';
import getEmployeeById from '../fetcher/getEmployeeById';

export default function AddEmployeeButton({
	companyId,
	employeeId,
	onSuccess,
}: {
	companyId: string;
	employeeId: string;
	onSuccess: () => void;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [position, setPosition] = useState('');

	useEffect(() => {
		const fetchFounders = async () => {
			try {
				const employee = await getEmployeeById(employeeId);
				if (employee) {
					setFirstName(employee.firstName);
					setLastName(employee.lastName);
					setPosition(employee.position);
				}
			} catch (error) {
				console.error('Failed to fetch founders', error);
			}
		};
		if (isModalOpen) {
			fetchFounders();
		}
	}, [isModalOpen]);

	const handleSubmit = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/employee/${employeeId}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						firstName,
						lastName,
						companyId,
						position,
					}),
				}
			);

			if (!response.ok) {
				throw new Error('Failed to add founder');
			}

			setIsModalOpen(false);
			setFirstName('');
			setLastName('');
			onSuccess()
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
				Change info
			</button>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Change info"
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
				</div>
				<button className={styles.submitButton} onClick={handleSubmit}>
					Change
				</button>
			</Modal>
		</>
	);
}
