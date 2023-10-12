import React, { useState } from 'react';
import { IBasicProps } from '../../types/props.types';
import { Button } from '../button';
import { LoginForm } from '../login';
import { RegisterForm } from '../register';
import { EAuth } from '../../types/auth.types';

interface IProps extends IBasicProps {}

export const authComponent = ({ className }: IProps) => {
  const [currentAction, setCurrentAction] = useState<EAuth>(EAuth.none);

  const switchCase = () => {
    switch (currentAction) {
      case 'login':
        return <LoginForm setCurrentAction={setCurrentAction} />;

      case 'register':
        return <RegisterForm setCurrentAction={setCurrentAction} />;

      default:
        return (
          <div className="auth-main">
            <h1 className="auth-header">Todo</h1>
            <Button className="auth-login-button" callback={() => setCurrentAction(EAuth.login)}>
              Login
            </Button>
            <Button
              className="auth-register-button"
              callback={() => setCurrentAction(EAuth.register)}
            >
              Register
            </Button>
          </div>
        );
    }
  };

  return <div className={className}>{switchCase()}</div>;
};
