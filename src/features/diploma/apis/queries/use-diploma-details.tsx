import { useQuery } from "@tanstack/react-query";
import { getDiploma } from "../diploma.apis";
import { DIPLOMA_KEY } from "../diploma.key";

export function useDiplomaDetails(id?: string) {
	return useQuery({
		queryKey: DIPLOMA_KEY.detail(id ?? ""),
		queryFn: () => getDiploma(id as string),
		enabled: Boolean(id),
	});
}
