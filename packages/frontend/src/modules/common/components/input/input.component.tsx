import React, { useEffect, useState } from 'react';
import { IBasicProps } from '../../types/props.types';

interface IProps extends IBasicProps {
  placeholder?: string;
  value: string | boolean;
  setValue: React.Dispatch<React.SetStateAction<string | boolean>>;
  label?: string;
  type?:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'button'
    | 'date'
    | 'email'
    | 'file'
    | 'number'
    | 'password'
    | 'tel'
    | 'text';
  name?: string;
  errorMassege?: string;
}

export const InputComponent = ({
  className,
  placeholder,
  value,
  setValue,
  label,
  type,
  name,
  errorMassege
}: IProps) => {
  const [id] = useState(crypto.randomUUID());
  const [error, setError] = useState(errorMassege);
  useEffect(() => {
    if (errorMassege) {
      setError(error);
    }
  }, [errorMassege]);
  const returnValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'checkbox') {
      setValue(e.currentTarget.checked);
    } else {
      setValue(e.currentTarget.value);
    }
  };

  return (
    <div className={className}>
      <label className="input-label" htmlFor={id}>
        {`${label && label}:`}
        <input
          type={type && type}
          id={id}
          name={name && name}
          className={`input ${type === 'checkbox' && 'checkbox'}`}
          placeholder={placeholder && placeholder}
          checked={value as boolean}
          value={value as string}
          onChange={returnValue}
        />
      </label>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};
