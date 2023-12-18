import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from '@/components/common/Dropdown/Dropdown.module.scss';
import { onClickOutside } from '@/utils';

const cx = classNames.bind(styles);

export const Dropdown = ({ sortList, size, state, setSortOption, onClick }) => {
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

  const handleOptionClick = (e, selectedOption) => {
    setCurrentValue(selectedOption);
    handleClose();
    setSortOption(selectedOption);
    onClick(e);
  };

  return (
    <div className={cx('dropdown', `dropdown-size-${size}`)} ref={dropdownRef}>
      <div className={cx(`dropdown-inner`)} onClick={handleToggleDropdown}>
        <button
          className={cx(
            'dropdown-inner-label',
            `label-${size}`,
            `label-${state}`
          )}
        >
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
              name='relationship'
              value={item.option}
              onClick={(e) => {
                handleOptionClick(e, item.option);
              }}
            >
              {item.option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
