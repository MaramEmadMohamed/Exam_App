
import { useQuery } from "@tanstack/react-query";
import { getDiploma, getDiplomas } from "../diploma.apis";
import { DIPLOMA_KEY, type DiplomaListParams } from "../diploma.key";

export function useDiplomas(params?: DiplomaListParams) {
  return useQuery({
    queryKey: DIPLOMA_KEY.list(params),
    queryFn: () => getDiplomas(params),
  });
}

export function useDiploma(id?: string) {
  return useQuery({
    queryKey: DIPLOMA_KEY.detail(id ?? ""),
    queryFn: () => getDiploma(id as string),
    enabled: Boolean(id),
  });
}

export default useDiplomas;
