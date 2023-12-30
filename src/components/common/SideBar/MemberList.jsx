import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from '@/components/common/SideBar/MemberList.module.scss';

import { Empty } from '@/components/common/Empty';
import { Member } from '@/components/common/SideBar';
import { Overlay, MyModal } from '@/components/common/Modal';
import { MixButton, Button } from '@/components/common/Button';

import { IMPORT_IMAGES } from '@/stores';

const cx = classNames.bind(styles);
const { EMPTY } = IMPORT_IMAGES;

export function MemberList({ messageData }) {
  const [isModal, setIsModal] = useState(false);

  const membersCount = new Set(messageData.map((item) => item.sender)).size;
  const AddMembersCount = Number(membersCount - 5);
  const isMembersEmpty = messageData.every((item) => item.id === null);
  const latestMembers = messageData.slice(0, 5);

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
                <li key={item.id} className={cx('member-list-content-item')}>
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
            <div className={cx('members-container')}>
              <ul className={cx('members-list')}>
                {latestMembers.map((item) => {
                  const hexCodeRegex = /[?&]color=([^&]+)/;
                  const match = item.profileImageURL.match(hexCodeRegex);
                  const randomColor = match ? match[1] : '#24262B';
                  return (
                    <li
                      key={item.id}
                      className={cx('members-list-item')}
                      style={{ '--color': randomColor }}
                    >
                      <img
                        src={item.profileImageURL}
                        alt='최신 등록 프로필 이미지'
                      />
                    </li>
                  );
                })}
              </ul>
              {membersCount > 5 && (
                <div className={cx('members-list-count')}>
                  <div>
                    <span>+</span>
                    <span>{AddMembersCount}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {isModal && (
        <Overlay>
          <MyModal title='Members' handleModalClose={handleModalClose}>
            <div className={cx('dialog-members')}>
              <ul className={cx('dialog-members-list')}>
                {messageData.map((item) => (
                  <li key={item.id} className={cx('dialog-members-list-item')}>
                    <Member
                      image={item.profileImageURL}
                      member={item.sender}
                      relationship={item.relationship}
                    />
                  </li>
                ))}
              </ul>
              <div className={cx('dialog-members-footer')}>
                <Button
                  variant='secondary'
                  size={40}
                  onClick={handleModalClose}
                >
                  닫기
                </Button>
              </div>
            </div>
          </MyModal>
        </Overlay>
      )}
    </div>
  );
}
