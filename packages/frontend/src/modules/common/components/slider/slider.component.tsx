import React, { useEffect, useState } from 'react';
import { UseMutateFunction } from 'react-query';
import { IBasicProps } from '../../types/props.types';
import { ITodo } from '../../types/todo.types';

interface IProps extends IBasicProps {
  status: boolean;
  callback?: UseMutateFunction<ITodo, unknown, ITodo, unknown>;
  todo: ITodo;
  field: string;
  disabled?: boolean;
}

export const SliderComponent = ({ className, status, callback, todo, field, disabled }: IProps) => {
  const [id] = useState(crypto.randomUUID());
  const [checked, setChecked] = useState(status);
  const handleToggle = () => {
    setChecked(!checked);
    if (callback) {
      setTimeout(() => {
        callback({
          id: todo.id?.toString(),
          title: todo.title,
          description: todo.description,
          active: field === 'active' ? checked : todo.active,
          private: field === 'private' ? !status : todo.private
        });
      }, 200);
    }
  };
  useEffect(() => {
    setChecked(status);
  }, [status]);
  return (
    <div className={`${className} container`}>
      <div className="toggle-switch">
        <input
          type="checkbox"
          disabled={disabled}
          className="checkbox"
          id={id}
          name={id}
          checked={checked}
          onChange={handleToggle}
        />
        <label className="label" htmlFor={id}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};
