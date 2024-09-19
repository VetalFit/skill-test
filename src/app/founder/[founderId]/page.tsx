import getFounderById from '@/app/components/fetcher/getFounderById';
import styles from './page.module.css';
import CloseButton from '@/app/components/buttons/closeBtn/CloseButton';

export default async function Page({
	params,
}: {
	params: { founderId: string };
}) {
	const founder = await getFounderById(params.founderId);

	return (
		<div className={styles.wrapper}>
			<h1>
				Founder: {founder?.firstName} {founder?.lastName}
			</h1>
			<CloseButton />
		</div>
	);
}
