import React from 'react';
import styles from './modal.module.css';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

export default function Modal({
	isOpen,
	onClose,
	title,
	children,
}: ModalProps) {
	if (!isOpen) return null;

	const handleOverlayClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div className={styles.modalOverlay} onClick={handleOverlayClick}>
			<div className={styles.modalContent}>
				<div className={styles.modalHeader}>
					<h2>{title}</h2>
					<button onClick={onClose} className={styles.closeButton}>
						&times;
					</button>
				</div>
				{children}
			</div>
		</div>
	);
}
