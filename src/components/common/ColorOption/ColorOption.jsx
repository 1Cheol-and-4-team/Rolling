import { useState } from 'react';

import styles from './ColorOption.module.scss';
import classNames from 'classnames/bind';

import { COLOR_CHIPS } from '@/stores';

const cx = classNames.bind(styles);

export function ColorOption({ onClick }) {
  const [selectedColor, setSelectedColor] = useState('green');
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <ul className={cx('color-option')}>
      {COLOR_CHIPS.map((item) => {
        return (
          <li
            key={item.id}
            name='backgroundColor'
            value={item.option}
            onClick={(e) => onClick(e)}
          >
            <button
              className={cx('color-option-chip', {
                [`color-option-chip-${item.option}`]: item.option,
              })}
              onClick={() => handleColorClick(item.option)}
              aria-label='컬러 옵션 버튼'
            >
              {selectedColor === item.option && (
                <div className={cx('color-option-chip-select')}>
                  <span>
                    <i className={cx('ic-check')}></i>
                  </span>
                </div>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
