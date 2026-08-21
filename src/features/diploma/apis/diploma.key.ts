export const DIPLOMA_KEY = {
  all: ["diplomas"] as const,
  lists: () => [...DIPLOMA_KEY.all, "list"] as const,
  list: (params?: DiplomaListParams) =>
    [...DIPLOMA_KEY.lists(), params] as const,
  details: () => [...DIPLOMA_KEY.all, "detail"] as const,
  detail: (id: string) => [...DIPLOMA_KEY.details(), id] as const,
};

export interface DiplomaListParams {
  page?: number;
  limit?: number;
  search?: string;
}
