import React from 'react';
import usePagination from '@mui/material/usePagination/usePagination';
import { IBasicProps } from '../../types/props.types';
import { List } from './list';

interface IProps extends IBasicProps {
  pages: number;
  currPage: number;
  setPage: (value: number) => void;
}

export const PaginationComponent = ({ className, pages, setPage, currPage }: IProps) => {
  const { items } = usePagination({
    count: pages
  });
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
                className={`pagination-button ${currPage === page && 'active'}`}
                {...item}
                onClick={(e) => {
                  onClick(e);
                  setPage(page || 1);
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
                  setPage(page || 1);
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
