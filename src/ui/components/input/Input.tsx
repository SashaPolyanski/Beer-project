import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

const Input = ({ onChange, onChangeText, ...restProps }: SuperInputTextPropsType) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText && onChangeText(e.currentTarget.value);
  };
  return <input type="text" onChange={onChangeCallback} {...restProps} />;
};

export default Input;
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
};
