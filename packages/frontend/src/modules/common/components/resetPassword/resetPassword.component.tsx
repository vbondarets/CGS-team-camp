import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { IBasicProps } from '../../types/props.types';
import { Input } from '../input';
import { Button } from '../button';
import { useResetPassword } from '../../hooks/resetPassword.query';
import { Loader } from '../loader';
import { ErrorCont } from '../error';

interface IProps extends IBasicProps {}

export const ResetPasswordComponent = ({ className }: IProps) => {
  const [password, setPassword] = useState<string | boolean>('');
  const [confPassword, setConfPass] = useState<string | boolean>('');
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: resetPassword, isSuccess, isError, isLoading, error } = useResetPassword();

  useEffect(() => {
    if (isSuccess) {
      navigate('/auth');
    }
  }, [isSuccess]);

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
          password: password as string,
          confPassword: confPassword as string
        }}
        onSubmit={() => {
          if (password && confPassword === password) {
            resetPassword({
              password: password as string,
              token: location.pathname.split('/')[2]
            });
          }
        }}
      >
        <Form>
          <Input value={password} setValue={setPassword} label="Password" />
          <Input value={confPassword} setValue={setConfPass} label="Confirm password" />
          <div className="form-buttons">
            <Button
              callback={() => {
                navigate(-1);
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
