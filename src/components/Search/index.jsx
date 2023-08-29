import React from 'react';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

import searchIcon from '../../assets/img/search-icon.svg';
import cancelIcon from '../../assets/img/cancel-icon.svg';

import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  }; //инпут с самонаведением с помощью хука useref

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 250),
    [],
  ); //-если меняется value, то вызываем это действие; ссылка на функцию и сделали её отложенной

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="searchIcon" />
      <input
        ref={inputRef}
        value={value} //хранит то что мы меняем
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Search pizzas"
      />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.cancelIcon}
          src={cancelIcon}
          alt="cancelIcon"
        />
      )}
    </div>
  );
};

export default Search;
