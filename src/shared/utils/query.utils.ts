/**
 * maps the url search params to query keys
 * @param searchParams the url search params
 * @returns array of query keys for react query's queryKey
 */

export function mapSearchParamsToQueryKeys(searchParams?: URLSearchParams) {
    if (!searchParams) return [];
  return Object.entries(searchParams) //[['sort','createdAt']]
  .map(([key, value]) => `${key}=${value}`);
  // returns ['sort:createdAt' , 'direction:desc', 'page:1', 'limit:10']
}
