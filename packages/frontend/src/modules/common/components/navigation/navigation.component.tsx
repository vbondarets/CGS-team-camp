import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TodoListButton } from '../button/button.styled';
import { IBasicProps } from '../../types/props.types';
import { Modal } from '../modal';
import { useLogOut } from '../../hooks/logOut.query';

interface IProps extends IBasicProps {}

export const NavigationComponent = ({ className }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: logOut } = useLogOut();
  const history = useHistory();

  return (
    <div className={className}>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Button
          callback={() => {
            logOut();
            setTimeout(() => {
              history.push('/auth');
            }, 100);
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
