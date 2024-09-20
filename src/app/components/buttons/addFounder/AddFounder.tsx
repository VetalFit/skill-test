'use client';
import React, { useState } from 'react';
import Modal from '../../modal/Modal';
import styles from './AddFounder.module.css';

export default function AddFounderButton() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const handleSubmit = async () => {
		try {
			const response = await fetch(`http://localhost:3000/api/founder`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ firstName, lastName }),
			});

			if (!response.ok) {
				throw new Error('Failed to add founder');
			}

			alert('Founder added successfully!');
			setIsModalOpen(false);
			setFirstName('');
			setLastName('');
		} catch (error) {
			alert('Error adding founder');
		}
	};

	return (
		<>
			<button onClick={() => setIsModalOpen(true)}>Add Founder</button>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Add Founder"
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
				</div>
				<button className={styles.submitButton} onClick={handleSubmit}>
					Add
				</button>
			</Modal>
		</>
	);
}
