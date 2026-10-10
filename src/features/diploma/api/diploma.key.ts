export const DIPLOMA_KEY = {
  all: ["diplomas"] ,
  lists: () => [...DIPLOMA_KEY.all, "list"] as const,
  list: (searchParams = "") =>
    [...DIPLOMA_KEY.lists(), searchParams] as const,
  details: () => [...DIPLOMA_KEY.all, "detail"] as const,
  detail: (id: string) => [...DIPLOMA_KEY.details(), id] as const,
}as const;


export const DIPLOMA_SEARCH_PARAMS = {
  page: (page: number) =>page,
}as const;
