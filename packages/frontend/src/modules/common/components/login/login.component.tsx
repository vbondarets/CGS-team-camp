import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { IBasicProps } from '../../types/props.types';
import { Input } from '../input';
import { Button } from '../button';
import userSchema from '../../utils/validation/schemas/user.schema';
import { useLogin } from '../../hooks';
import { Loader } from '../loader';
import { EAuth } from '../../types/auth.types';
import { onSubmit } from '../../utils/onSubmit/onSubmit';
import { ROUTER_KEYS } from '../../consts/app-keys.const';

interface IProps extends IBasicProps {
  setCurrentAction: React.Dispatch<React.SetStateAction<EAuth>>;
}

export const LoginComponent = ({ className, setCurrentAction }: IProps) => {
  const [email, setEmail] = useState<string | boolean>('');
  const [password, setPassword] = useState<string | boolean>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { mutate: login, error, isSuccess } = useLogin();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  return (
    <div className={className}>
      {isLoading && <Loader />}
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
              login({ email: email as string, password: password as string });
              if (isSuccess) {
                history.push(ROUTER_KEYS.ROOT);
              }
            },
            error
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
            {errorMessage && <h3 className="error-message">{errorMessage}</h3>}
          </div>
        </Form>
      </Formik>
    </div>
  );
};
