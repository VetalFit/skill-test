'use client';

import styles from './DeleteEmployeeButton.module.css';

interface DeleteEmployeeButtonProps {
	employeeId: string;
}

const DeleteEmployeeButton = ({ employeeId }: DeleteEmployeeButtonProps) => {
	const handleDelete = async () => {
		const confirmation = confirm('Are you sure you want to delete this employee?');
		if (!confirmation) return;

		try {
			const response = await fetch(`/api/employee/${employeeId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				alert('Employee deleted successfully.');
				window.location.reload();
			} else {
				alert('Failed to delete the employee.');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while deleting the employee.');
		}
	};

	return (
		<button className={styles.deleteButton} onClick={handleDelete}>
			Delete Employee
		</button>
	);
};

export default DeleteEmployeeButton;