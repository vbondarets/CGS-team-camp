import React, { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { useHistory } from 'react-router-dom';
import { IBasicProps } from '../../types/props.types';
import { Button } from '../button';
import { SearchBar } from '../searchBar';
import { EFilter } from '../../types/filter.types';
import { setQueryUtil } from '../../utils/setQueryUtil/setQueryUtil';

interface IProps extends IBasicProps {
  setQueryParams: React.Dispatch<React.SetStateAction<string>>;
  page: number;
}

export const FilterComponent = ({ className, setQueryParams, page }: IProps) => {
  const [curentFilter, setCurentFilter] = useState(EFilter.All);
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const debouncedValue = useDebounce<string>(searchValue, 500);

  useEffect(() => {
    history.push({
      search: setQueryUtil(curentFilter, searchValue, page)
    });
  }, [curentFilter, debouncedValue, page]);

  useEffect(() => {
    setQueryParams(history.location.search);
  }, [history.location.search]);

  return (
    <div className={className}>
      <div className="filter-buttons-container">
        <Button active={curentFilter === EFilter.All} callback={() => setCurentFilter(EFilter.All)}>
          All
        </Button>
        <Button
          active={curentFilter === EFilter.Private}
          callback={() => setCurentFilter(EFilter.Private)}
        >
          Private
        </Button>
        <Button
          active={curentFilter === EFilter.Public}
          callback={() => setCurentFilter(EFilter.Public)}
        >
          Public
        </Button>
        <Button
          active={curentFilter === EFilter.Complited}
          callback={() => setCurentFilter(EFilter.Complited)}
        >
          Complited
        </Button>
      </div>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
  );
};
