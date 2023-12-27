import { useRef, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from '@/components/common/Modal/Modal.module.scss';

import { onClickOutside } from '@/utils';

const cx = classNames.bind(styles);

export const MyModal = ({
  title,
  desc,
  children,
  handleModalClose,
  iconUrl = null,
  iconAlt = null,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      onClickOutside(e, modalRef, handleModalClose);
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [handleModalClose]);

  return (
    <div className={cx('modal', 'my-modal')} ref={modalRef}>
      <div className={cx('modal-dialog')}>
        <div className={cx('modal-dialog-header')}>
          <span className={cx('hide', { 'modal-dialog-header-icon': iconUrl })}>
            <img src={iconUrl} alt={iconAlt} />
          </span>
          <h1 className={cx('modal-dialog-header-title')}>{title}</h1>
          <p className={cx('hide', { 'modal-dialog-header-desc': desc })}>
            {desc}
          </p>
        </div>
        <div className={cx('modal-dialog-body')}>{children}</div>
      </div>
    </div>
  );
};
