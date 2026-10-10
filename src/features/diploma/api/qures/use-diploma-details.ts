
import { useQuery } from "@tanstack/react-query";
import { getDiplomaDetailsApi } from "../diplomas.api";
import { DIPLOMA_KEY } from "../diploma.key";

export default function useDiplomaDetails(id?: string) {
  return useQuery({
    queryKey: DIPLOMA_KEY.detail(id ?? ""),
    queryFn: () => {
      if (!id) {
        throw new Error("A diploma ID is required to fetch diploma details");
      }

      return getDiplomaDetailsApi(id);
    },
    enabled: Boolean(id),
  });
}