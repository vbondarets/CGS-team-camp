import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { IBasicProps } from '../../types/props.types';
import { Button } from '../button';
import { Input } from '../input';
import { useAuth } from '../../hooks';
import userSchema from '../../utils/validation/schemas/user.schema';
import { Loader } from '../loader';
import { EAuth } from '../../types/auth.types';
import { onSubmit } from '../../utils/onSubmit/onSubmit';
import { setError } from '../../utils/setError/setError';

interface IProps extends IBasicProps {
  setCurrentAction: React.Dispatch<React.SetStateAction<EAuth>>;
}

export const RegisterComponent = ({ className, setCurrentAction }: IProps) => {
  const { handleRegister, isLoadingRegister, errorRegister, isRegisterSuccess } = useAuth();
  const [email, setEmail] = useState<string | boolean>('');
  const [password, setPassword] = useState<string | boolean>('');
  const [passwordConf, setPasswordConf] = useState<string | boolean>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(isLoadingRegister);

  useEffect(() => {
    if (isRegisterSuccess) {
      setCurrentAction(EAuth.none);
    }
  }, [isRegisterSuccess]);

  useEffect(() => {
    setIsLoading(isLoadingRegister);
  }, [isLoadingRegister]);

  useEffect(() => {
    if (errorRegister && errorRegister instanceof Error) {
      if (axios.isAxiosError(errorRegister)) {
        setError(errorRegister.response?.data.message, setErrorMessage);
      }
      setIsLoading(false);
    }
  }, [errorRegister]);

  return (
    <div className={className}>
      {isLoading && <Loader />}
      <Formik
        initialValues={{
          email,
          password,
          passwordConf
        }}
        onSubmit={async () => {
          onSubmit(
            userSchema,
            {
              email,
              password,
              passwordConf
            },
            setErrorMessage,
            setIsLoading,
            () => {
              handleRegister({ email: email as string, password: password as string });
            }
          );
        }}
      >
        <Form>
          <Input value={email} setValue={setEmail} name="email" placeholder="email" label="Email" />
          <Input
            value={password}
            type="password"
            setValue={setPassword}
            name="password"
            placeholder="password"
            label="Password"
          />
          <Input
            value={passwordConf}
            setValue={setPasswordConf}
            name="passwordConf"
            type="password"
            placeholder="Confirm your password"
            label="Password confirm"
          />
          <div className="register-form-buttons">
            <Button callback={() => setCurrentAction(EAuth.none)}>Back</Button>
            <Button type="submit">Submit</Button>
          </div>
          {errorMessage && <h3 className="error-message">{errorMessage}</h3>}
        </Form>
      </Formik>
    </div>
  );
};
