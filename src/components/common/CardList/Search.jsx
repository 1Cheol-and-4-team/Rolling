import { useRef, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import searchImg from '@/assets/images/icons/search.svg';
import searchbtn from '@/assets/images/icons/searchbtn.svg';

const cx = classNames.bind(styles);

function Search({ setKeyword }) {
  const [value, setValue] = useState('');
  const input = useRef();

  const handleChange = () => {
    const newValue = input.current.value;
    setValue(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setKeyword(value);
  };

  return (
    <div className={cx('wrap')}>
      <form onSubmit={handleSubmit} className={cx('search')}>
        <input
          className={cx('search-input')}
          ref={input}
          value={value}
          onChange={handleChange}
          placeholder='Seach...'
        />
        <div className={cx('search-wrap')}>
          <img src={searchImg} className={cx('search-wrap-img')} />
          <button className={cx('search-wrap-button')}>
            <img src={searchbtn} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
