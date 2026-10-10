
import { useQuery } from "@tanstack/react-query";
import { getDiplomaListApi } from "../diplomas.api";
import { DIPLOMA_KEY } from "../diploma.key";
import { mapSearchParamsToQueryKeys } from "@/shared/utils/query.utils";

export default function useDiplomaList(searchParams?: URLSearchParams) {
  return useQuery({
    queryKey: DIPLOMA_KEY.list(...mapSearchParamsToQueryKeys(searchParams)),
    queryFn: () => getDiplomaListApi(searchParams),
  });
}