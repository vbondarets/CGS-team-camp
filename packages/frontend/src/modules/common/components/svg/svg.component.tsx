import React from 'react';
import { IBasicProps } from '../../types/props.types';

interface IProps extends IBasicProps {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  viewBox?: string;
  top?: string;
  bootom?: string;
  left?: string;
  right?: string;
  callback?: () => void;
  cursor?: 'pointer' | 'not-allowed' | 'wait';
}

export const SvgComponent = ({
  viewBox,
  className,
  children,
  top,
  bootom,
  left,
  right,
  callback,
  cursor
}: IProps) => (
  <svg
    className={`${className} ${top} ${bootom} ${left} ${right} ${cursor}`}
    viewBox={viewBox}
    onClick={(e) => {
      e.stopPropagation();
      if (callback) {
        e.preventDefault();
        callback();
      }
    }}
  >
    {children}
  </svg>
);
