import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { IBasicProps } from '../../types/props.types';
import { Button } from '../button';
import { ITodo } from '../../types/todo.types';
import { Input } from '../input';
import validation from '../../utils/validation/validation';
import TodoSchema from '../../utils/validation/schemas/todo.schema';
import { setError } from '../../utils/setError/setError';
import { TextArea } from '../textArea';

interface IProps extends IBasicProps {
  callback: (value: ITodo) => void;
  action: 'create' | 'update';
  todo?: ITodo;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoFormComponent = ({ className, callback, action, todo, setModalOpen }: IProps) => {
  const [title, setTitle] = useState<string | boolean>(todo ? todo.title : '');
  const [description, setDescription] = useState<string>(todo ? todo.description : '');
  const [isActive, setActive] = useState<string | boolean>(todo ? todo.active : false);
  const [isPrivate, setPrivate] = useState<string | boolean>(todo ? todo.private : false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
