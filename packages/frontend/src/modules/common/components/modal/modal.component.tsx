import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Modal from '@mui/material/Modal';
import { IBasicProps } from '../../types/props.types';

interface IProps extends IBasicProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalComponent = ({ className, children, isOpen, setIsOpen }: IProps) => (
  <Modal open={isOpen} onClose={() => setIsOpen(false)} className={className}>
    <div className="modal-body">{children}</div>
  </Modal>
);
