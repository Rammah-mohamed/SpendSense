import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function CacheDebugger() {
	const qc = useQueryClient();
	useEffect(() => {
		// console.log("React Query Cache:", qc.getQueryData(["spendData"]));
	}, [qc]);
	return null;
}
