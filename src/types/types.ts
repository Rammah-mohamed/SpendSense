export type User = {
	username: string;
};

export type SpendRecord = {
	id: string; // generated on parse
	vendor: string;
	amount: number;
	department: string;
	renewalDate: string; // ISO format
};
