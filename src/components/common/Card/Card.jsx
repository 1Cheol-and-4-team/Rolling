import { useState } from 'react';
// api
import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';
import { INITIAL_RECIPIENTS_TYPE } from '@/stores';
// lib
import classNames from 'classnames/bind';
import styles from './Card.module.scss';
// component
import { Badge } from '@/components/common/Badge';
import { Overlay, Modal } from '@/components/common/Modal';
import { formatDate } from '@/utils';

const cx = classNames.bind(styles);

export function Card({
  id,
  relationship,
  sender,
  profileImageURL,
  content,
  createdAt,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useAsync(
    () => api.get(`${ENDPOINT.MESSAGES}${id}/`),
    INITIAL_RECIPIENTS_TYPE
  );

  function createMarkup(html) {
    return { __html: html };
  }

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={cx('card')} onClick={handleModalOpen}>
        <header className={cx('card-header')}>
          <Badge relationship={relationship} />
        </header>
        <main className={cx('card-content')}>
          <div className={cx('sender-info')}>
            <div className={cx('sender-profile')}>
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
      </div>
      {isModalOpen && (
        <Overlay>
          <Modal messageData={data} handleModalClose={handleModalClose} />
        </Overlay>
      )}
    </>
  );
}
