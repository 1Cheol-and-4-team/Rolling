import { useState } from 'react';

import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';

import classNames from 'classnames/bind';
import styles from './Card.module.scss';

import { Badge, NewBadge } from '@/components/common/Badge';
import { Overlay, PaperModal, MyModal } from '@/components/common/Modal';
import { Button, IconButton } from '@/components/common/Button';

import { formatDate, getDateDiff } from '@/utils';
import { INITIAL_RECIPIENTS_TYPE, IMPORT_IMAGES } from '@/stores';

const cx = classNames.bind(styles);

export function Card({
  id,
  relationship,
  sender,
  profileImageURL,
  backgroundUrl,
  backgroundColor,
  content,
  createdAt,
  isDelete,
  getMessageApi,
}) {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { CONFRIM_MODAL } = IMPORT_IMAGES;

  const { data } = useAsync(
    () => api.get(`${ENDPOINT.MESSAGES}${id}/`),
    INITIAL_RECIPIENTS_TYPE
  );

  const getFormatDays = getDateDiff(createdAt);
  const isNewest = getFormatDays < 2;

  const hexCodeRegex = /[?&]color=([^&]+)/;
  const match = profileImageURL.match(hexCodeRegex);
  const randomColor = match ? match[1] : '#24262B';

  function createMarkup(html) {
    return { __html: html };
  }

  const handleModalOpen = () => {
    setIsMessageModalOpen(true);
  };

  const handleModalClose = () => {
    setIsMessageModalOpen(false);
  };

  const handleConfrimModalOpen = (e) => {
    e.stopPropagation();
    setIsConfirmModalOpen(true);
  };

  const handleConfrimModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleRemoveItem = async (e) => {
    e.stopPropagation();

    try {
      const res = await api.delete(`${ENDPOINT.MESSAGES}${id}/`);

      if (!res.status) return console.error('[SERVER ERROR]', e);
      await getMessageApi();
    } catch (e) {
      console.error('[API ERROR]', e);
    }
  };

  return (
    <>
      <div className={cx('card')} onClick={handleModalOpen}>
        <header className={cx('card-header')}>
          {isNewest && <NewBadge />}
          <Badge relationship={relationship} />
          <div
            className={cx('card-header-btn-delete', {
              ['card-header-btn-delete-active']: isDelete,
            })}
          >
            <IconButton
              variant='outlined'
              style='square'
              icon='ic-delete'
              iconSize='24'
              iconColor='gray500'
              isDelete={isDelete}
              onClick={handleConfrimModalOpen}
            />
          </div>
        </header>
        <main className={cx('card-content')}>
          <div className={cx('sender-info')}>
            <div
              className={cx('sender-profile')}
              style={{ '--color': randomColor }}
            >
              <img src={profileImageURL} alt='글쓴이 프로필 사진' />
            </div>
            <span className={cx('sender-name')}>{sender}</span>
          </div>
          <div
            dangerouslySetInnerHTML={createMarkup(content)}
            className={cx('card-textbox')}
          ></div>
        </main>
        <footer className={cx('card-date')}>
          <span>{formatDate(createdAt)}</span>
        </footer>
        <div className={cx('gradient-box')}></div>
      </div>
      {isMessageModalOpen && (
        <Overlay>
          <PaperModal
            profileImage={profileImageURL}
            randomColor={randomColor}
            backgroundUrl={backgroundUrl}
            backgroundColor={backgroundColor}
            messageData={data}
            handleModalClose={handleModalClose}
          />
        </Overlay>
      )}
      {isConfirmModalOpen && (
        <Overlay>
          <MyModal
            title='롤링페이퍼를 삭제하시겠습니까?'
            desc='삭제된 롤링페이퍼는 복구할 수 없습니다.'
            iconUrl={CONFRIM_MODAL.DELETE.URL}
            iconAlt={CONFRIM_MODAL.DELETE.ALT}
            handleModalClose={handleConfrimModalClose}
          >
            <div className={cx('dialog-confirm')}>
              <div className={cx('dialog-confirm-footer')}>
                <Button
                  variant='secondary'
                  size={40}
                  onClick={handleConfrimModalClose}
                >
                  취소
                </Button>
                <Button
                  variant='delete-fill'
                  size={40}
                  onClick={handleRemoveItem}
                >
                  삭제
                </Button>
              </div>
            </div>
          </MyModal>
        </Overlay>
      )}
    </>
  );
}
