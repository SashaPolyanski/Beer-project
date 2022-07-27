import React, { Dispatch, SetStateAction } from 'react';

import Input from '../../components/input/Input';

const Header = ({ searchValue, setSearchValue }: HeaderType) => (
  <Input onChangeText={setSearchValue} value={searchValue} />
);

export default Header;

type HeaderType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};
