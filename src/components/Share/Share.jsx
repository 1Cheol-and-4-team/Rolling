import { useState, useEffect, useRef } from 'react';

import classNames from 'classnames/bind';
import styles from '@/components/Share/Share.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IconButton } from '@/components/common/Button';

import { onClickOutside } from '@/utils';
import { SHARE_LIST } from '@/stores';
import { shareKakaoLink } from '@/utils/shareKakaoLink';

const cx = classNames.bind(styles);

export const Share = ({ url }) => {
  const dropdownRef = useRef();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      onClickOutside(e, dropdownRef, handleClose);
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleDropdown = (e) => {
    e.preventDefault();

    setOpen((prev) => !prev);
  };

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('URL이 복사되었습니다.');
    } catch (e) {
      console.error('[LINK COPY ERROR]', e);
    }
  };

  // 카카오톡 공유 기능
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';

    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleOptionClick = (targetId, image) => {
    if (targetId === 1) {
      shareKakaoLink(url, image);
    }
    if (targetId === 2) {
      handleCopyClipBoard(url);
    }
  };

  return (
    <>
      <ToastContainer
        style={{ fontSize: 14 }}
        position='top-center'
        limit={1}
        closeButton={false}
        autoClose={5000}
        pauseOnHover={false}
        hideProgressBar={true}
        theme='dark'
      />
      <div className={cx('share-dropdown')} ref={dropdownRef}>
        <div className={cx({ 'share-list-active': isOpen })}>
          <IconButton
            variant='outlined'
            style='square'
            icon='ic-share'
            iconSize='24'
            iconColor='white'
            onClick={handleToggleDropdown}
          />
        </div>

        {isOpen && (
          <ul className={cx('share-list')}>
            {SHARE_LIST.map((item) => (
              <li key={item.id} className={cx('share-list-item')}>
                <button
                  className={cx('share-list-item-button')}
                  onClick={() => handleOptionClick(item.id, item.url)}
                >
                  <img src={item.url} alt={item.alt} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
