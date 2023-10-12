import React from 'react';
import { IBasicProps } from '../../types/props.types';

interface IProps extends IBasicProps {}

export const loaderComponent = ({ className }: IProps) => (
  <div className={className}>
    <div className="loader-spiner" />
  </div>
);
