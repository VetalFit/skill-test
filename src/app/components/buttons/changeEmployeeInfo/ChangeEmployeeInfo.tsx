'use client';
import { useEffect, useState } from 'react';
import styles from './ChangeEmployeeInfo.module.css';
import Modal from '../../modal/Modal';
import getEmployeeById from '../../fetcher/getEmployeeById';
import ListTest from '../../technologiesLIst/TechnologiesList';
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';

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
	const [technologies, setTechnologies] = useState<string[]>([]);

	const handleSetSelectedTechnologies = (technology: string) => {
		setTechnologies((prevState: string[]) => {
			if (!prevState.includes(technology)) {
				return [...prevState, technology];
			}
			return prevState;
		});
	};

	const handleDelSelectedTechnologies = (technology: string) => {
		setTechnologies((prevState: string[]) => {
			return prevState.filter((tech) => tech !== technology);
		});
	};

	useEffect(() => {
		const fetchFounders = async () => {
			try {
				const employee = await getEmployeeById(employeeId);
				if (employee) {
					setFirstName(employee.firstName);
					setLastName(employee.lastName);
					setPosition(employee.position);
					setTechnologies(employee.technologies);
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
				`${process.env.NEXT_PUBLIC_API_URL}/api/employee/${employeeId}`,
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
						technologies,
					}),
				}
			);

			if (!response.ok) {
				throw new Error('Failed to add founder');
			}

			setIsModalOpen(false);
			setFirstName('');
			setLastName('');
			onSuccess();
		} catch (error) {
			console.error('Error adding founder');
		}
	};

	return (
		<>
			<button
				className={styles.mainBtn}
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
				</div>
				<div className={styles.technologiesContainer}>
					<div className={styles.titleTechnologies}>
						technologies:
					</div>
					{firstName ? (
						technologies?.map((tech) => {
							return (
								<div
									key={tech}
									onClick={() =>
										handleDelSelectedTechnologies(tech)
									}
									className={styles.technologyPill}
								>
									{tech}{' '}
									<span className={styles.removeIcon}>✖</span>
								</div>
							);
						})
					) : (
						<div className={styles.spinnerOverlay}>
							<LoadingSpinner />
						</div>
					)}
				</div>
				<ListTest handleSelect={handleSetSelectedTechnologies} />
				<button className={styles.submitButton} onClick={handleSubmit}>
					Change
				</button>
			</Modal>
		</>
	);
}
