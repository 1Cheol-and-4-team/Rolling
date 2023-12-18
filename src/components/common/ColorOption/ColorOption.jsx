import { useState } from 'react';
import { COLOR_CHIPS } from '@/stores';
import styles from './ColorOption.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export function ColorOption({ onClick }) {
  const [selectedColor, setSelectedColor] = useState('beige');
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
              className={cx(
                'color-option-chip',
                `color-option-chip-${item.option}`
              )}
              onClick={() => handleColorClick(item.option)}
              aria-label='컬러 옵션 버튼'
            >
              {selectedColor === item.option && (
                <span>
                  <i className={cx('ic-check')}></i>
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
