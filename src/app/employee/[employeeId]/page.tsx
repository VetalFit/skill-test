import styles from './page.module.css';
import CloseButton from '@/app/components/buttons/closeBtn/CloseButton';
import getEmployeeById from '@/app/components/fetcher/getEmployeeById';

export default async function Page({
	params,
}: {
	params: { employeeId: string };
}) {
	const employee = await getEmployeeById(params.employeeId);

	return (
		<div className={styles.wrapper}>
			<h1>
				Employee: {employee?.firstName} {employee?.lastName}
			</h1>
			<CloseButton />
		</div>
	);
}
