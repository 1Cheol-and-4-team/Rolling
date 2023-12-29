import { useEffect } from 'react';

import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';

import { INITIAL_MESSAGE_TYPE } from '@/stores';

import PropTypes from 'prop-types';

import styles from './ProfileImg.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

ProfileImg.propTypes = {
  messageCount: PropTypes.number,
  recentMessages: PropTypes.array,
};

export function ProfileImg({ id, recentMessages }) {
  const {
    data: { results },
    execute: profileData,
  } = useAsync(
    () =>
      api.get(`${ENDPOINT.RECIPIENTS}${id}/messages/`, {
        params: { limit: 100 },
      }),
    INITIAL_MESSAGE_TYPE,
    false
  );

  useEffect(() => {
    if (!id) return;
    profileData();
  }, [id]);

  const member = new Set(results.map((item) => item.sender)).size;
  const memberCount = member - 3;
  if (!recentMessages) {
    return null;
  }
  return (
    <div className={cx('wrap')}>
      {recentMessages[0] && <img src={recentMessages[0].profileImageURL} />}
      {recentMessages[1] && (
        <img className={cx('img1')} src={recentMessages[1].profileImageURL} />
      )}
      {recentMessages[2] && (
        <img className={cx('img2')} src={recentMessages[2].profileImageURL} />
      )}
      {memberCount > 0 && (
        <span>+{memberCount < 1000 ? memberCount : '999'}</span>
      )}
    </div>
  );
}
