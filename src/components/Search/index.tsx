import React from "react";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";

import searchIcon from "../../assets/img/search-icon.svg";
import cancelIcon from "../../assets/img/cancel-icon.svg";

import styles from "./Search.module.scss";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // } //потенциальное вытаскивание данных из функции нулл или андефайнд
    inputRef.current?.focus(); //Optional chainging
  }; //инпут с самонаведением с помощью хука useref

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  ); //-если меняется value, то вызываем это действие; ссылка на функцию и сделали её отложенной

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }; // wrote about typization in workbook (23)

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
