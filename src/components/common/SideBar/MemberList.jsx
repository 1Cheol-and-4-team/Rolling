import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '@/components/common/SideBar/MemberList.module.scss';

import { Member } from '@/components/common/SideBar/';
import { Empty } from '@/components/common/Empty';
import { Overlay } from '@/components/common/Modal';
import { MemberModal } from '@/components/common/Modal';
import { MixButton } from '@/components/common/Button';

import { IMPORT_IMAGES } from '@/stores';

const cx = classNames.bind(styles);
const { EMPTY } = IMPORT_IMAGES;

export function MemberList({ messageData }) {
  const [isModal, setIsModal] = useState(false);

  const membersCount = new Set(messageData.map((item) => item.sender)).size;
  const AddMembersCount = Number(membersCount - 4);
  const isMembersEmpty = messageData.every((item) => item.id === null);
  const latestMembers = messageData.slice(0, 4);

  const handleModalOpen = () => {
    setIsModal(true);
  };

  const handleModalClose = () => {
    setIsModal(false);
  };

  return (
    <div className={cx('member-list')}>
      <div className={cx('member-list-header')}>
        <h1 className={cx('member-list-header-title')}>Members</h1>
        <MixButton
          variant='transparent'
          size={36}
          endIcon='ic-arrow-right'
          iconSize={12}
          iconColor='white'
          text='more'
          onClick={handleModalOpen}
        />
      </div>
      {isMembersEmpty ? (
        <Empty importImg={EMPTY} message={'No Members'} />
      ) : (
        <>
          <div className={cx('lg-only')}>
            <ul className={cx('member-list-content')}>
              {latestMembers.map((item) => (
                <li key={item.id}>
                  <Member
                    image={item.profileImageURL}
                    member={item.sender}
                    relationship={item.relationship}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={cx('lg-hidden')}>
            <ul className={cx('member-list-content')}>
              {latestMembers.map((item) => (
                <li key={item.id} className={cx('member-list-content-item')}>
                  <img
                    src={item.profileImageURL}
                    alt='최신 등록 프로필 이미지'
                  />
                </li>
              ))}
              {membersCount > 4 && (
                <li className={cx('member-list-content-count')}>
                  <div>
                    <span>+</span>
                    <span>{AddMembersCount}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
      {isModal && (
        <Overlay>
          <MemberModal
            memberData={messageData}
            handleModalClose={handleModalClose}
          />
        </Overlay>
      )}
    </div>
  );
}
