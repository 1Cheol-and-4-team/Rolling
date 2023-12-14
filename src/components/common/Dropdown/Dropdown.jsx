import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '@/components/common/Dropdown/Dropdown.module.scss';

const cx = classNames.bind(styles);

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [iconContent, setIconContent] = useState('ic-arrow-down');
  const [isError, setIsError] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    setIconContent(isOpen ? 'ic-arrow-down' : 'ic-arrow-up');
    setIsError(false);
  };

  return (
    <div className={cx('dropdown', { error: isError })}>
      <div className={cx('dropdown-layout')}>
        <button
          className={cx('dropdown-toggle', { error: isError })}
          onClick={handleToggleDropdown}
        >
          Dropdown
          <i className={cx(iconContent)}></i>
        </button>
        <p className={cx('message', { 'message-hidden': !isError })}>
          Error message
        </p>
      </div>
      {isOpen && (
        <ul className={cx('dropdown-menu')}>
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
          <li>
            <a>Item 3</a>
          </li>
          <li>
            <a>Item 4</a>
          </li>
        </ul>
      )}
    </div>
  );
};
