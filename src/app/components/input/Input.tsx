'use client';
import React, { InputHTMLAttributes, useState, useRef } from 'react';
import './Input.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  className = '',
  required,
  onChange,
  value,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);

    if (e.target.value.trim() === '') {
      e.target.value = '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value?.trim();
    if (onChange) {
      onChange(e);
    }
  };

  const inputClassName = `input-custom has-value ${className}`;
  const wrapperClassName = `input-wrapper ${
    isFocused || value || ref.current?.value ? 'focused' : ''
  } ${required ? 'required' : ''}`;

  return (
    <div className={wrapperClassName}>
      <input
        value={value}
        required={required}
        className={inputClassName}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
      <label
        className={
          value || ref.current?.value ? 'input-label hasValue' : 'input-label'
        }
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
