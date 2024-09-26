// 'use client';
// import React, { useEffect, useState } from 'react';
// import Modal from '../../modal/Modal';
// import styles from './Founders.module.css';
// import getFoundersList, { Founders } from '../../fetcher/getFoundersList';

// export default function EmployeeList() {
// 	const [isModalOpen, setIsModalOpen] = useState(false);
// 	const [founders, setFounders] = useState<Founders>();

// 	useEffect(() => {
// 		const fetchFounders = async () => {
// 			try {
// 				const data = await getFoundersList();
// 				if (data) setFounders(data);
// 			} catch (error) {
// 				console.error('Failed to fetch founders', error);
// 			}
// 		};
// 		if (isModalOpen) {
// 			fetchFounders();
// 		}
// 	}, [isModalOpen]);

// 	return (
// 		<>
// 			<button
// 				className={styles.submitButton}
// 				onClick={() => setIsModalOpen(true)}
// 			>
// 				Founders list
// 			</button>
// 			<Modal
// 				isOpen={isModalOpen}
// 				onClose={() => setIsModalOpen(false)}
// 				title="Founders list"
// 			>
// 				<p className={styles.results}>Results: {founders?.count}</p>
// 				<div className={styles.foundersList}>
// 					{founders && founders.list.length > 0 ? (
// 						founders.list.map((founder) => (
// 							<div
// 								key={founder.id}
// 								className={styles.founderCard}
// 							>
// 								<div className={styles.founderName}>
// 									{founder.firstName} {founder.lastName}
// 								</div>
// 							</div>
// 						))
// 					) : (
// 						<div className={styles.noFounders}>
// 							No founders available
// 						</div>
// 					)}
// 				</div>
// 			</Modal>
// 		</>
// 	);
// }

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
