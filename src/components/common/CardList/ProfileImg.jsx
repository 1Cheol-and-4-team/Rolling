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
  } = useAsync(
    () => api.get(`${ENDPOINT.RECIPIENTS}${id}/messages/`),
    INITIAL_MESSAGE_TYPE
  );
  //작성한 사람 수, (동일 이름은 제외)
  const member = new Set(results.map((item) => item.sender)).size;
  // 3개의 프로필을 뺀 수
  const memberCount = member - 3;
  if (!recentMessages) {
    return null;
    // 또는 오류 처리를 위한 다른 JSX 코드를 반환할 수도 있습니다.
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

      {/* {count > 0 && <span>+{count < 1000 ? count : '999'}</span>} */}
    </div>
  );
}
