import React from 'react';
import { IBasicProps } from '../../types/props.types';

interface IProps extends IBasicProps {
  children: React.ReactNode;
  callback?: () => void;
  active?: boolean;
  width?: string;
  type?: 'submit' | 'button' | 'reset';
  preventDefault?: boolean;
}

export const ButtonComponent = ({
  children,
  callback,
  className,
  active,
  width,
  type,
  preventDefault
}: IProps) => (
  <button
    className={`${className} btn ${active ? 'active' : ''} ${width ? 'width' : ''}`}
    // eslint-disable-next-line react/button-has-type
    type={type && type}
    onClick={(e) => {
      if (callback) {
        if (preventDefault) {
          e.preventDefault();
        }
        callback();
      }
    }}
  >
    {children}
  </button>
);
