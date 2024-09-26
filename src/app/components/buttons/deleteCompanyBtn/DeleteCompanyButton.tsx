'use client';

import styles from './DeleteCompanyButton.module.css';

const DeleteCompanyButton = ({ companyId }: { companyId: string }) => {
	const handleDelete = async () => {
		const confirmation = confirm(
			'Are you sure you want to delete this company?'
		);
		if (!confirmation) return;

		try {
			const response = await fetch(`/api/company/${companyId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				console.log('Company deleted successfully.');
				window.location.href = '/';
			} else {
				console.error('Failed to delete the company.');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<button className={styles.deleteButton} onClick={handleDelete}>
			Delete Company
		</button>
	);
};

export default DeleteCompanyButton;
