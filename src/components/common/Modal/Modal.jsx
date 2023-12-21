import { useEffect, useRef } from 'react';

import styles from './Modal.module.scss';
import classNames from 'classnames/bind';

import { Button } from '@/components/common/Button';
import { fontToEnglish, onClickOutside } from '@/utils';

const cx = classNames.bind(styles);

export function Modal({
  profileImage,
  backgroundUrl,
  backgroundColor,
  messageData,
  handleModalClose,
}) {
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

  function createMarkup(html) {
    return { __html: html };
  }

  const fontClassName = fontToEnglish(messageData.relationship);

  return (
    <div className={cx('modal')} ref={modalRef}>
      <div
        className={cx('modal-banner', `modal-banner-${backgroundColor}`)}
        style={{
          backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : '',
        }}
      ></div>
      <div className={cx('modal-content')}>
        <div className={cx('modal-content-profile')}>
          <img src={profileImage} alt='글쓴이 프로필 이미지' />
        </div>
        <div className={cx('modal-content-textbox')}>
          <strong>{messageData.sender}</strong>
          <div
            className={cx(
              'modal-content-textArea',
              `modal-content-textArea-${fontClassName}`
            )}
            dangerouslySetInnerHTML={createMarkup(messageData.content)}
          ></div>
        </div>
        <Button variant='secondary' size={40} onClick={handleModalClose}>
          닫기
        </Button>
      </div>
    </div>
  );
}
