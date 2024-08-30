import React, { useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { IBasicProps } from '../../types/props.types';
import { Button } from '../button';
import { SearchBar } from '../searchBar';
import { EFilter } from '../../types/filter.types';

interface IProps extends IBasicProps {
  currentFilter: EFilter;
  setCurrentFilter: (value: EFilter) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const FilterComponent = ({
  className,
  setSearchValue,
  searchValue,
  setCurrentFilter,
  currentFilter
}: IProps) => {
  const setDebouncedSearch = useDebounceCallback(setSearchValue, 500);
  const [search, setSearch] = useState(searchValue);
  const handleSearch = (value: string) => {
    setSearch(value);
    setDebouncedSearch(value);
  };

  return (
    <div className={className}>
      <div className="filter-buttons-container">
        <Button
          active={currentFilter === EFilter.All}
          callback={() => setCurrentFilter(EFilter.All)}
        >
          All
        </Button>
        <Button
          active={currentFilter === EFilter.Private}
          callback={() => setCurrentFilter(EFilter.Private)}
        >
          Private
        </Button>
        <Button
          active={currentFilter === EFilter.Public}
          callback={() => setCurrentFilter(EFilter.Public)}
        >
          Public
        </Button>
        <Button
          active={currentFilter === EFilter.Complited}
          callback={() => setCurrentFilter(EFilter.Complited)}
        >
          Complited
        </Button>
      </div>
      <SearchBar searchValue={search} setSearchValue={handleSearch} />
    </div>
  );
};
