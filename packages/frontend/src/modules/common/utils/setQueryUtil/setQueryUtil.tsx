import { EFilter } from '../../types/filter.types';

export const setQueryUtil = (curentFilter: EFilter, searchValue: string, page: number): string => {
  let string = '';
  switch (curentFilter) {
    case EFilter.Complited:
      string = `active=false&page=${page}`;
      break;
    case EFilter.Private:
      string = `isPrivate=true&page=${page}`;
      break;
    case EFilter.Public:
      string = `isPrivate=false&page=${page}`;
      break;
    default:
      string = `&page=${page}`;
      break;
  }
  string = `${string.split('&title=')[0]}&title=${searchValue}`;
  return string;
};
