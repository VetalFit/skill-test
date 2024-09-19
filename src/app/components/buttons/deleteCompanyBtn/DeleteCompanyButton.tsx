'use client';

import styles from './DeleteCompanyButton.module.css';

interface DeleteCompanyButtonProps {
	companyId: string;
}

const DeleteCompanyButton = ({ companyId }: DeleteCompanyButtonProps) => {
	const handleDelete = async () => {
		const confirmation = confirm('Are you sure you want to delete this company?');
		if (!confirmation) return;

		try {
			const response = await fetch(`/api/company/${companyId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				alert('Company deleted successfully.');
				window.location.href = '/';
			} else {
				alert('Failed to delete the company.');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while deleting the company.');
		}
	};

	return (
		<button className={styles.deleteButton} onClick={handleDelete}>
			Delete Company
		</button>
	);
};

export default DeleteCompanyButton;