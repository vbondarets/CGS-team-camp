import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Formik, Form } from 'formik';
import { UseMutateFunction } from 'react-query';
import { IBasicProps } from '../../types/props.types';
import { Button } from '../button';
import { ITodo } from '../../types/todo.types';
import { Input } from '../input';
import validation from '../../utils/validation/validation';
import TodoSchema from '../../utils/validation/schemas/todo.schema';
import { setError } from '../../utils/setError/setError';
import { TextArea } from '../textArea';

interface IProps extends IBasicProps {
  callback: UseMutateFunction<ITodo, unknown, ITodo, unknown>;
  action: 'create' | 'update';
  todo?: ITodo;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoFormComponent = ({ className, callback, action, todo, setModalOpen }: IProps) => {
  const [title, setTitle] = useState<string | boolean>('');
  const [description, setDescription] = useState<string>('');
  const [isActive, setActive] = useState<string | boolean>(false);
  const [isPrivate, setPrivate] = useState<string | boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setActive(todo.active);
      setPrivate(todo.private);
    }
  }, [todo]);

  return (
    <div className={className}>
      <Formik
        initialValues={{
          title: title as string,
          description: description as string,
          active: isActive as boolean,
          private: isPrivate as boolean
        }}
        onSubmit={() => {
          const result = validation(TodoSchema, {
            title,
            description,
            active: isActive,
            private: isPrivate
          });
          if (result.message !== 'ok') {
            setError(result.message, setErrorMessage);
          } else {
            callback({
              id: todo?.id?.toString(),
              title: title as string,
              description: description as string,
              active: isActive as boolean,
              private: isPrivate as boolean
            });
            setModalOpen(false);
          }
        }}
      >
        <Form className="todo-form">
          <Input name="title" value={title} setValue={setTitle} label="Title" placeholder="Title" />
          <TextArea
            name="description"
            value={description}
            setValue={setDescription}
            label="Description"
            placeholder="Description"
            rows={5}
          />
          <Input value={isActive} setValue={setActive} label="Active" type="checkbox" />
          <Input value={isPrivate} setValue={setPrivate} label="Private" type="checkbox" />
          {errorMessage && <p className="form-error">{errorMessage}</p>}
          <Button type="submit">{action.toUpperCase()}</Button>
        </Form>
      </Formik>
    </div>
  );
};
