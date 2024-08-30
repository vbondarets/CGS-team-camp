import React from 'react';
import { IBasicProps } from '../../types/props.types';
import { Svg } from '../svg';

interface IProps extends IBasicProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const SearchBarComponent = ({ className, searchValue, setSearchValue }: IProps) => (
  <div className={className}>
    <Svg viewBox="0 0 50 50" left="30px">
      {/* eslint-disable-next-line max-len  */}
      <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
    </Svg>
    <input
      placeholder="Search"
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.currentTarget.value);
      }}
    />
    <Svg viewBox="0 0 14 21" right="30px" cursor="pointer">
      <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
        <g fill="#000000" id="Icons-AV" transform="translate(-3.000000, -43.000000)">
          <g id="mic" transform="translate(3.000000, 43.500000)">
            <path
              /* eslint-disable-next-line max-len  */
              d="M7,12 C8.7,12 10,10.7 10,9 L10,3 C10,1.3 8.7,0 7,0 C5.3,0 4,1.3 4,3 L4,9 C4,10.7 5.3,12 7,12 L7,12 Z M12.3,9 C12.3,12 9.8,14.1 7,14.1 C4.2,14.1 1.7,12 1.7,9 L0,9 C0,12.4 2.7,15.2 6,15.7 L6,19 L8,19 L8,15.7 C11.3,15.2 14,12.4 14,9 L12.3,9 L12.3,9 Z"
              id="Shape"
            />
          </g>
        </g>
      </g>
    </Svg>
  </div>
);
