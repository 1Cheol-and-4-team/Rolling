import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from '@/components/common/Modal/Modal.module.scss';

import { Member } from '@/components/common/SideBar/';
import { Button } from '@/components/common/Button';

import { onClickOutside } from '@/utils';

const cx = classNames.bind(styles);

export const MemberModal = ({ memberData, handleModalClose }) => {
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
    <div className={cx('modal', 'member-modal')} ref={modalRef}>
      <div className={cx('member-modal-title')}>Members</div>
      <ul className={cx('member-modal-content')}>
        {memberData.map((item) => (
          <li key={item.id}>
            <Member
              image={item.profileImageURL}
              member={item.sender}
              relationship={item.relationship}
            />
          </li>
        ))}
      </ul>
      <div>
        <Button variant='secondary' size={40} onClick={handleModalClose}>
          닫기
        </Button>
      </div>
    </div>
  );
};
