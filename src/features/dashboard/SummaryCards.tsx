import {
	IconBuilding,
	IconCalendarRepeat,
	IconChartPie,
	IconCurrencyDollar,
} from "@tabler/icons-react";
import { SummaryCard } from "./SummaryCard";

interface SummaryData {
	totalSpend: number;
	departments: number;
	vendors: number;
	upcomingRenewals: number;
}

interface SummaryCardsProps {
	data: SummaryData;
}

export const SummaryCards = ({ data }: SummaryCardsProps) => {
	const cards = [
		{
			title: "Total Spend",
			value: `$${data.totalSpend.toLocaleString()}`,
			icon: <IconCurrencyDollar />,
		},
		{
			title: "Departments",
			value: data.departments,
			icon: <IconBuilding />,
		},
		{
			title: "Vendors",
			value: data.vendors,
			icon: <IconChartPie />,
		},
		{
			title: "Upcoming Renewals",
			value: data.upcomingRenewals,
			icon: <IconCalendarRepeat />,
		},
	];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
			{cards.map((card) => (
				<SummaryCard key={card.title} {...card} />
			))}
		</div>
	);
};
