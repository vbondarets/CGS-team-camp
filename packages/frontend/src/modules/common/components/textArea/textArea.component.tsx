import React, { useEffect, useState } from 'react';
import { IBasicProps } from '../../types/props.types';

interface IProps extends IBasicProps {
  label?: string;
  name?: string;
  placeholder?: string;
  value: string;
  rows?: number;
  errorMessage?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const textAreaComponent = ({
  className,
  label,
  name,
  placeholder,
  value,
  rows,
  errorMessage,
  setValue
}: IProps) => {
  const [id] = useState(crypto.randomUUID());
  const [error, setError] = useState(errorMessage);

  useEffect(() => {
    if (errorMessage) {
      setError(error);
    }
  }, [errorMessage]);

  return (
    <div className={className}>
      <label className="text-area-label" htmlFor={id}>
        {`${label && label}:`}
        <textarea
          name={name && name}
          id={id}
          className="text-area"
          rows={rows || 4}
          value={value}
          placeholder={placeholder && placeholder}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </label>
      {error && <p className="text-area-error">{error}</p>}
    </div>
  );
};
