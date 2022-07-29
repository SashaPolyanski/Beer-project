import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import ClearIcon from '../iconsSvg/clearIcon/ClearIcon';
import SearchIcon from '../iconsSvg/searchIcon/SearchIcon';

import SM from './Input.module.scss';

const Input = ({ onChange, onChangeText, ...restProps }: SuperInputTextPropsType) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText && onChangeText(e.currentTarget.value);
  };
  return (
    <div className={SM.inputWrapper}>
      <SearchIcon />
      <input
        placeholder="search"
        className={SM.input}
        type="text"
        onChange={onChangeCallback}
        {...restProps}
      />
      <ClearIcon clearValue={onChangeText} />
    </div>
  );
};

export default Input;
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText: (value: string) => void;
};
