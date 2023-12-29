import { useRef, useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { IMPORT_IMAGES } from '@/stores';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '@/components/common/Skeleton/skeleton.css';
const cx = classNames.bind(styles);
const {
  CARD_LIST: { LOGO_SYMBOL, SEARCH },
} = IMPORT_IMAGES;

function Search({ setKeyword }) {
  const [value, setValue] = useState('');
  const input = useRef();
  const isFocus = value.length > 0;

  const handleChange = () => {
    const newValue = input.current.value;
    setValue(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setKeyword(value);
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, 5000);
  return isLoading ? (
    <Skeleton className={cx('search', { active: isFocus })} />
  ) : (
    <form onSubmit={handleSubmit} className={cx('search', { active: isFocus })}>
      <div className={cx('search-group')}>
        <img src={SEARCH.URL} alt={SEARCH.ALT} aria-hidden />
        <input
          type='text'
          className={cx('search-group-input')}
          ref={input}
          value={value}
          onChange={handleChange}
          placeholder='Find your dashboard...'
        />
      </div>
      <button className={cx('search-button')}>
        <img src={LOGO_SYMBOL.URL} alt={LOGO_SYMBOL.ALT} />
      </button>
    </form>
  );
}

export default Search;
