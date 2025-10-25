import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
	title: string;
	value: string | number;
	icon?: React.ReactNode;
	trend?: string; // optional e.g. "+12%" or "-3%"
	highlight?: boolean; // for primary KPIs
}

export const SummaryCard = ({ title, value, icon, trend, highlight = false }: SummaryCardProps) => {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			transition={{ type: "spring", stiffness: 300, damping: 20 }}
		>
			<Card
				className={cn(
					"rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200",
					highlight && "bg-linear-to-br from-blue-50 to-blue-100/50"
				)}
			>
				<CardContent className="flex items-center justify-between p-6">
					<div>
						<p className="text-sm text-gray-500 font-medium mb-1 tracking-wide">{title}</p>
						<div className="flex items-end gap-2">
							<p className="text-3xl font-semibold text-gray-900">
								{typeof value === "number" ? value.toLocaleString("en-US") : value}
							</p>
							{trend && (
								<span
									className={cn(
										"text-sm font-medium",
										trend.startsWith("-") ? "text-red-500" : "text-green-500"
									)}
								>
									{trend}
								</span>
							)}
						</div>
					</div>

					{icon && (
						<div
							className={cn(
								"p-3 rounded-xl bg-blue-50 text-blue-600",
								highlight && "bg-white text-blue-700 shadow-sm"
							)}
						>
							{icon}
						</div>
					)}
				</CardContent>
			</Card>
		</motion.div>
	);
};
