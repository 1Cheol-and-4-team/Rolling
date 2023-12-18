import { useState } from 'react';
import { colorChips } from '@/stores';
import styles from './ColorOption.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export function ColorOption({ onClick }) {
  const [selectedColor, setSelectedColor] = useState('orange');
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <ul className={cx('color-option')}>
      {colorChips.map((item) => {
        return (
          <li
            key={item.id}
            name='backgroundColor'
            value={item.color}
            onClick={(e) => onClick(e)}
          >
            <button
              className={cx(
                'color-option-chip',
                `color-option-chip-${item.color}`
              )}
              onClick={() => handleColorClick(item.color)}
              aria-label='컬러 옵션 버튼'
            >
              {selectedColor === item.color && (
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
