import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from '@/components/common/Dropdown/Dropdown.module.scss';
import { onClickOutside } from '@/utils';

const cx = classNames.bind(styles);

export const Dropdown = ({ sortList, setSortOption, size }) => {
  const dropdownRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('Latest');
  const [iconContent, setIconContent] = useState('ic-arrow-down');

  useEffect(() => {
    const handleClick = (e) => {
      onClickOutside(e, dropdownRef, handleClose);
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setIconContent('ic-arrow-down');
  };

  const handleToggleDropdown = () => {
    setOpen((prev) => !prev);
    setIconContent(isOpen ? 'ic-arrow-down' : 'ic-arrow-up');
  };

  const handleOptionClick = (selectedOption) => {
    setCurrentValue(selectedOption);
    handleClose();
    setSortOption(selectedOption);
  };

  return (
    <div className={cx('dropdown', `dropdown-size-${size}`)} ref={dropdownRef}>
      <div className={cx(`dropdown-inner`)} onClick={handleToggleDropdown}>
        <button className={cx('dropdown-inner-label', `label-${size}`)}>
          {currentValue}
        </button>
        <i className={cx(iconContent)} aria-hidden></i>
      </div>

      {isOpen && (
        <ul className={cx('dropdown-option-list', `option-${size}`)}>
          {sortList.map((item) => (
            <li
              key={item.id}
              className={cx('dropdown-option-item')}
              onClick={() => handleOptionClick(item.option)}
            >
              {item.option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
