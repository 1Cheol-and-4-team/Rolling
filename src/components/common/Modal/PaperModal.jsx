import { useEffect, useRef } from 'react';

import classNames from 'classnames/bind';
import styles from '@/components/common/Modal/Modal.module.scss';

import { Button } from '@/components/common/Button';
import { onClickOutside } from '@/utils';

const cx = classNames.bind(styles);

export const PaperModal = ({
  profileImage,
  randomColor,
  backgroundUrl,
  backgroundColor,
  messageData,
  handleModalClose,
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

  function createMarkup(html) {
    return { __html: html };
  }

  return (
    <div className={cx('modal')} ref={modalRef}>
      <div
        className={cx('modal-banner', {
          [`modal-banner-${backgroundColor}`]: backgroundColor,
        })}
        style={{
          backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : '',
        }}
      ></div>
      <div className={cx('modal-content')}>
        <div
          className={cx('modal-content-profile')}
          style={{ '--color': randomColor }}
        >
          <img src={profileImage} alt='글쓴이 프로필 이미지' />
        </div>
        <div className={cx('modal-content-textbox')}>
          <strong>{messageData.sender}</strong>
          <div
            className={cx('modal-content-textArea')}
            dangerouslySetInnerHTML={createMarkup(messageData.content)}
          ></div>
        </div>
        <Button variant='secondary' size={40} onClick={handleModalClose}>
          닫기
        </Button>
      </div>
    </div>
  );
};
