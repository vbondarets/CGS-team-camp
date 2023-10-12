import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { IBasicProps } from '../../types/props.types';

interface IProps extends IBasicProps {
  message: string;
}

export const ErrorContainer = ({ className, message }: IProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <div className={className}>
        <h2 className="error-message">{message}</h2>
      </div>
    </Modal>
  );
};
