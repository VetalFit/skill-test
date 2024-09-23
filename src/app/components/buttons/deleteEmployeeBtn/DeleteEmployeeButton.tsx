'use client';

import styles from './DeleteEmployeeButton.module.css';

interface DeleteEmployeeButtonProps {
	employeeId: string;
	refreshEmployeesList: () => void;
}

const DeleteEmployeeButton = ({
	employeeId,
	refreshEmployeesList,
}: DeleteEmployeeButtonProps) => {
	const handleDelete = async () => {
		const confirmation = confirm(
			'Are you sure you want to delete this employee?'
		);
		if (!confirmation) return;

		try {
			const response = await fetch(`/api/employee/${employeeId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				console.log('Employee deleted successfully.');
				refreshEmployeesList();
			} else {
				console.error('Failed to delete the employee.');
			}
		} catch (error) {
			console.error('Error:', error);
			console.error('An error occurred while deleting the employee.');
		}
	};

	return (
		<button className={styles.deleteButton} onClick={handleDelete}>
			Delete Employee
		</button>
	);
};

export default DeleteEmployeeButton;
