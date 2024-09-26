'use client';
import React, { useEffect, useState } from 'react';
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
	const [isVisible, setIsVisible] = useState(isOpen);

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
		} else {
			const timer = setTimeout(() => {
				setIsVisible(false);
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	if (!isVisible) return null;

	const handleOverlayClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className={`${styles.modalOverlay} ${
				isOpen ? styles.modalOverlayOpen : ''
			}`}
			onClick={handleOverlayClick}
		>
			<div
				className={`${styles.modalContent} ${
					isOpen ? styles.modalContentOpen : ''
				}`}
			>
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
