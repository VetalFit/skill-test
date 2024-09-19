import Link from 'next/link';
import styles from './CloseButton.module.css';

const CloseButton = () => {
	return (
		<Link href={`/`} className={styles.closeButton}>
			&times;
		</Link>
	);
};

export default CloseButton;
