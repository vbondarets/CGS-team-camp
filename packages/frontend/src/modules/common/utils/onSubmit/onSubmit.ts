import { Schema } from 'joi';
import validation from '../validation/validation';
import { setError } from '../setError/setError';

export const onSubmit = (
  schema: Schema,
  body: object,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  callback: () => void
) => {
  setIsLoading(true);
  const result = validation(schema, body);
  if (result.message !== 'ok') {
    setError(result.message, setErrorMessage);
    setIsLoading(false);
  } else {
    callback();
  }
};
