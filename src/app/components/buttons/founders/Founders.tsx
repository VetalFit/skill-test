'use client';
import React, { useState } from 'react';
import Modal from '../../modal/Modal';
import styles from './Founders.module.css';
import FoundersList from '../../foundersList/FoundersList';

export default function AddEmployeeButton() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<button
				className={styles.submitButton}
				onClick={() => setIsModalOpen(true)}
			>
				Founders list
			</button>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Founders list"
			>
				<FoundersList />
			</Modal>
		</>
	);
}
