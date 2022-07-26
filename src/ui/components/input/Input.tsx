import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import s from './Input.module.scss';

const Input = ({ onChange, onChangeText, ...restProps }: SuperInputTextPropsType) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText && onChangeText(e.currentTarget.value);
  };
  return (
    <div className={s.inputWrapper}>
      <input
        placeholder="search"
        className={s.input}
        type="text"
        onChange={onChangeCallback}
        {...restProps}
      />
    </div>
  );
};

export default Input;
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
};
