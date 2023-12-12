import { useState } from 'react';
import { colorChips } from '@/stores';
import styles from './ColorOption.module.scss';
import classNames from 'classnames/bind';
import checkIcon from '@/assets/images/icons/checkIcon.svg';

const cx = classNames.bind(styles);

export function ColorOption() {
  const [selectedColor, setSelectedColor] = useState('orange');

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <ul className={cx('color-option')}>
      {colorChips.map((item) => {
        return (
          <li key={item.id}>
            <button
              className={cx('color-chip', `color-chip-${item.color}`)}
              onClick={() => handleColorClick(item.color)}
              aria-label='컬러 옵션 버튼'
            >
              {selectedColor === item.color && (
                <img src={checkIcon} alt='확인 아이콘' />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
