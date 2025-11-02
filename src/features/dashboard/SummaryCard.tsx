import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface SummaryCardProps {
	title: string;
	value: string | number;
	icon?: React.ReactNode;
	trend?: string; // optional e.g. "+12%" or "-3%"
	highlight?: boolean; // for primary KPIs
}

export const SummaryCard = ({ title, value, icon, trend, highlight = false }: SummaryCardProps) => {
	const { theme } = useTheme();
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			transition={{ type: "spring", stiffness: 300, damping: 22 }}
			className="w-full"
		>
			<Card
				className={cn(
					"rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md",
					theme === "dark"
						? "bg-surface-dark border-border-dark hover:border-border-dark/80"
						: "bg-surface border-border hover:border-border/80",
					highlight &&
						(theme === "dark"
							? "bg-linear-to-br from-accent-dark/10 to-accent-dark/5"
							: "bg-linear-to-br from-accent/10 to-accent/5")
				)}
			>
				<CardContent className="flex items-center justify-between p-6">
					{/* Left: Text */}
					<div>
						<p
							className={cn(
								"text-sm font-medium mb-1 tracking-wide",
								theme === "dark" ? "text-text-muted-dark" : "text-text-muted"
							)}
						>
							{title}
						</p>
						<div className="flex items-end gap-2">
							<p
								className={cn(
									"text-3xl font-semibold",
									theme === "dark" ? "text-text-dark" : "text-text"
								)}
							>
								{typeof value === "number" ? value.toLocaleString("en-US") : value}
							</p>
							{trend && (
								<span
									className={cn(
										"text-sm font-medium",
										trend.startsWith("-")
											? theme === "dark"
												? "text-danger-dark"
												: "text-danger"
											: theme === "dark"
											? "text-success-dark"
											: "text-success"
									)}
								>
									{trend}
								</span>
							)}
						</div>
					</div>

					{/* Right: Icon */}
					{icon && (
						<div
							className={cn(
								"p-3 rounded-xl shadow-sm transition-colors",
								theme === "dark" ? "bg-accent-dark/10 text-accent-dark" : "bg-accent/10 text-accent"
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
