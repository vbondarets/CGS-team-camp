import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { IBasicProps } from '../../types/props.types';
import { Button } from '../button';
import { Input } from '../input';
import { useRegister } from '../../hooks';
import userSchema from '../../utils/validation/schemas/user.schema';
import { Loader } from '../loader';
import { EAuth } from '../../types/auth.types';
import { onSubmit } from '../../utils/onSubmit/onSubmit';

interface IProps extends IBasicProps {
  setCurrentAction: React.Dispatch<React.SetStateAction<EAuth>>;
}

export const RegisterComponent = ({ className, setCurrentAction }: IProps) => {
  const [email, setEmail] = useState<string | boolean>('');
  const [password, setPassword] = useState<string | boolean>('');
  const [passwordConf, setPasswordConf] = useState<string | boolean>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { mutate: register, error, isSuccess } = useRegister();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setCurrentAction(EAuth.none);
    }
  }, [isSuccess]);

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
              register({ email: email as string, password: password as string });
            },
            error
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
