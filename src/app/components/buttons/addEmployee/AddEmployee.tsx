'use client';
import React, { useState } from 'react';
import Modal from '../../modal/Modal';
import styles from './AddEmployee.module.css';

export default function AddEmployeeButton({
	companyId,
}: {
	companyId: string;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [position, setPosition] = useState('');

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

			setIsModalOpen(false);
			setFirstName('');
			setLastName('');
			window.location.reload();
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
					Add
				</button>
			</Modal>
		</>
	);
}
