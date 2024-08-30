import { EFilter } from '../../types/filter.types';

export const setQueryUtil = (curentFilter: EFilter, searchValue: string, page: number): string => {
  // const navigate = useNavigate();
  let searchQuery = '';
  switch (curentFilter) {
    case EFilter.Complited:
      searchQuery = `active=false&page=${page}`;
      break;
    case EFilter.Private:
      searchQuery = `isPrivate=true&page=${page}`;
      break;
    case EFilter.Public:
      searchQuery = `isPrivate=false&page=${page}`;
      break;
    default:
      searchQuery = `&page=${page}`;
      break;
  }
  searchQuery = `?${searchQuery.split('&title=')[0]}&title=${searchValue}`;
  return searchQuery;
};
