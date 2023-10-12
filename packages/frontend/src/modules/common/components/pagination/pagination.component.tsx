import React, { useEffect, useState } from 'react';
import usePagination from '@mui/material/usePagination/usePagination';
import { IBasicProps } from '../../types/props.types';
import { List } from './list';

interface IProps extends IBasicProps {
  pages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginationComponent = ({ className, pages, setPage }: IProps) => {
  const [curentPage, setCurentPage] = useState<number | null>(1);
  const { items } = usePagination({
    count: pages
  });
  useEffect(() => {
    setPage(curentPage as number);
  }, [curentPage]);
  return (
    <nav className={className}>
      <List>
        {items.map(({ page, type, selected, onClick, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = (
              <button className="pagination-button" type="button">
                ...
              </button>
            );
          } else if (type === 'page') {
            children = (
              <button
                type="button"
                className={`pagination-button ${curentPage === page && 'active'}`}
                {...item}
                onClick={(e) => {
                  onClick(e);
                  setCurentPage(page);
                }}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                className="pagination-button"
                onClick={(e) => {
                  onClick(e);
                  setCurentPage(page);
                }}
                {...item}
              >
                {type === 'previous' ? '<' : '>'}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
};
