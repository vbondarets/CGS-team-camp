import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import { IBasicProps } from '../../types/props.types';
import { Input } from '../input';
import { Button } from '../button';
import userSchema from '../../utils/validation/schemas/user.schema';
import { useAuth } from '../../hooks';
import { Loader } from '../loader';
import { EAuth } from '../../types/auth.types';
import { onSubmit } from '../../utils/onSubmit/onSubmit';
import { setError } from '../../utils/setError/setError';

interface IProps extends IBasicProps {
  setCurrentAction: React.Dispatch<React.SetStateAction<EAuth>>;
}

export const LoginComponent = ({ className, setCurrentAction }: IProps) => {
  const [email, setEmail] = useState<string | boolean>('');
  const [password, setPassword] = useState<string | boolean>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { handleLogin, errorLogin, isLoadingLogin } = useAuth();

  const [isLoadingNow, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(isLoadingLogin);
  }, [isLoadingLogin]);
  useEffect(() => {
    if (errorLogin && errorLogin instanceof Error) {
      if (axios.isAxiosError(errorLogin)) {
        setError(errorLogin.response?.data.message, setErrorMessage);
      }
      setIsLoading(false);
    }
  }, [errorLogin]);

  return (
    <div className={className}>
      {isLoadingNow && <Loader />}
      <Formik
        initialValues={{
          email,
          password
        }}
        onSubmit={() => {
          onSubmit(
            userSchema,
            {
              email,
              password
            },
            setErrorMessage,
            setIsLoading,
            () => {
              handleLogin({ email: email as string, password: password as string });
            }
          );
        }}
      >
        <Form>
          <Input value={email} setValue={setEmail} name="email" placeholder="email" label="Email" />
          <Input
            value={password}
            setValue={setPassword}
            type="password"
            name="password"
            placeholder="password"
            label="Password"
          />
          <a href="/reset-password" className="forgot-password">
            Forgot password?
          </a>
          <div className="login-form-buttons">
            <Button callback={() => setCurrentAction(EAuth.none)}>Back</Button>
            <Button type="submit">Submit</Button>
          </div>
          {errorMessage && <h3 className="error-message">{errorMessage}</h3>}
        </Form>
      </Formik>
    </div>
  );
};
