import React from 'react';
import { Company } from '../fetcher/searchCompanies';
import CardCompany from '../cardCompany/CardCompany';

interface CompanyCardProps {
	companies: Company[];
}

const CompaniesCards: React.FC<CompanyCardProps> = ({ companies }) => {
	return (
		<>
			{companies.map((company) => (
				<CardCompany key={company.id} company={company} />
			))}
		</>
	);
};

export default CompaniesCards;
