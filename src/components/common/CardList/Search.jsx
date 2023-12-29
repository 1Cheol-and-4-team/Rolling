import { useRef, useState } from 'react';

import { IMPORT_IMAGES } from '@/stores';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const {
  CARD_LIST: { LOGO_SYMBOL, SEARCH },
} = IMPORT_IMAGES;

export function Search({ setIsKeyword }) {
  const [value, setValue] = useState('');
  const input = useRef();
  const isFocus = value.length > 0;

  const handleChange = () => {
    const newValue = input.current.value;
    setValue(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsKeyword(value);
  };

  return (
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
