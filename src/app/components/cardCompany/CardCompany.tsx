'use client';
import Link from 'next/link';
import styles from './CardCompany.module.css';
// import { useContext } from 'react';
// import { useRouter } from 'next/navigation';
import { Company } from '../fetcher/searchCompanies';

interface CompanyCardProps {
	company: Company;
}

const CardCompany: React.FC<CompanyCardProps> = ({ company }) => {
	//   const { refresh } = useRouter();

	//   const deleteProject = async (projectId: number) => {
	//     await fetcher.deleteCurrentProject(projectId);
	//     context.setSnackbar({
	//       message: `Project deleted successfully!`,
	//       type: 'success',
	//     });
	//     refresh();
	//   }

	return (
		<>
			<div key={company.id} className={styles.card}>
				<div className={styles.cardHeader}>
					<Link
						href={`/company/${company.id}`}
						className={styles.cardTitle}
					>
						{company.name}
					</Link>
				</div>
				<div>
					<div className={styles.cardFounder}>
						<Link
							href={`/founder/${company.founder.id}`}
							className={styles.founder}
						>
							Founder: {company.founder.firstName}{' '}
							{company.founder.lastName}
						</Link>
						{/* <div className={styles.cardLinks}>
							<button onClick={() => deleteProject(project.id)}>
								{'delete project (DELETES IMMEDIATELY)'}
							</button>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default CardCompany;
