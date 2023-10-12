import { Schema } from 'joi';
import axios from 'axios';
import validation from '../validation/validation';
import { setError } from '../setError/setError';

export const onSubmit = <T>(
  schema: Schema,
  body: object,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  callback: () => void,
  error: T
) => {
  const result = validation(schema, body);
  if (result.message !== 'ok') {
    setError(result.message, setErrorMessage);
  } else {
    callback();
    if (error && error instanceof Error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message, setErrorMessage);
      }
    }
    setIsLoading(true);
  }
};
