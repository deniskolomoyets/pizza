import React from 'react';
import searchIcon from '../../assets/img/search-icon.svg';
import cancelIcon from '../../assets/img/cancel-icon.svg';
import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  }; //инпут с самонаведением с помощью хука useref

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="searchIcon" />
      <input
        ref={inputRef}
        value={searchValue} //хранит то что мы меняем
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Search pizzas"
      />
      {searchValue && (
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
