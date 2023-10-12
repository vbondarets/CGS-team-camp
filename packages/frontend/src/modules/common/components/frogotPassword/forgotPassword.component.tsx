import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { IBasicProps } from '../../types/props.types';
import { Input } from '../input';
import { Button } from '../button';
import { useForgotPassword } from '../../hooks/forgotPassword.query';
import { Loader } from '../loader';
import { ErrorCont } from '../error';

interface IProps extends IBasicProps {}

export const ForgotPasswordComponent = ({ className }: IProps) => {
  const [email, setEmail] = useState<string | boolean>('');
  const history = useHistory();
  const { mutate: forgotPassword, isSuccess, isError, isLoading, error } = useForgotPassword();

  useEffect(() => {
    if (isSuccess) {
      history.push('/auth');
    }
  }, [isSuccess, isError]);

  return (
    <div className={className}>
      {isLoading && <Loader />}
      {isError && (
        <ErrorCont
          message={
            error instanceof axios.AxiosError ? error.response?.data.message : 'Unknown Error'
          }
        />
      )}
      <Formik
        initialValues={{
          email: email as string
        }}
        onSubmit={() => {
          if (email) {
            forgotPassword(email as string);
          }
        }}
      >
        <Form>
          <Input value={email} setValue={setEmail} label="Email" />
          <div className="form-buttons">
            <Button
              callback={() => {
                history.push('/auth');
              }}
            >
              Back
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
