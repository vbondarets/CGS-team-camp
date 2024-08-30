import React, { useState } from 'react';
import { Button, TodoListButton } from '../button/button.styled';
import { IBasicProps } from '../../types/props.types';
import { Modal } from '../modal';
import { useAuth } from '../../hooks';

interface IProps extends IBasicProps {}

export const NavigationComponent = ({ className }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogOut } = useAuth();

  return (
    <div className={className}>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Button
          callback={() => {
            handleLogOut();
          }}
        >
          Log Out
        </Button>
      </Modal>
      <Button as={TodoListButton}>Todo List</Button>
      <Button
        callback={() => {
          setIsOpen(true);
        }}
      >
        My Profile
      </Button>
    </div>
  );
};
