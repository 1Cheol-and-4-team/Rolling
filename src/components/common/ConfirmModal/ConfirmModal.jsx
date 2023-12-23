import { useEffect, useRef } from 'react';

import styles from '@/components/common/ConfirmModal/ConfirmModal.module.scss';
import classNames from 'classnames/bind';

import { onClickOutside } from '@/utils';

const cx = classNames.bind(styles);

export const ConfirmModal = ({
  info,
  desc,
  children,
  iconUrl,
  handleModalClose,
  footerType = 'double',
}) => {
  const modalRef = useRef();
  const isDoubleFooter = footerType === 'double';

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
    <div className={cx('modal')} ref={modalRef}>
      <div className={cx('modal-content')}>
        <div>
          <img src={iconUrl} alt='모달창 확인 아이콘' />
        </div>
        <div className={cx('modal-content-message')}>
          <p className={cx('modal-content-message-info')}>{info}</p>
          <p className={cx('modal-content-message-desc')}>{desc}</p>
        </div>
        <div className={cx('modal-content-footer')}>
          {isDoubleFooter ? (
            <div className={cx('modal-content-footer-inner')}>{children}</div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};
