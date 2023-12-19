import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';

import styles from './Count.module.scss';
import classNames from 'classnames/bind';

import { INITIAL_MESSAGE_TYPE } from '@/stores';

const cx = classNames.bind(styles);

export function Count({ id, reactionCount }) {
  const {
    data: { results },
  } = useAsync(
    () => api.get(`${ENDPOINT.RECIPIENTS}${id}/messages/`),
    INITIAL_MESSAGE_TYPE
  );

  const initialCountInfo = () => {
    const messageCount = results.length;
    const memberCount = new Set(results.map((item) => item.sender)).size;
    return { messageCount, memberCount };
  };
  const { messageCount, memberCount } = initialCountInfo();

  const isEmpty = (array, key) => {
    if (key === 'sender') {
      return array.every((item) => item[key].length === 0);
    }
    return array.every((item) => item[key] === null);
  };

  return (
    <div className={cx('count')}>
      <div className={cx('count-element')}>
        {isEmpty(results, 'id') ? <h1>0</h1> : <h1>{messageCount}</h1>}
        <span>Papers</span>
      </div>
      <div className={cx('count-element')}>
        {isEmpty(results, 'sender') ? <h1>0</h1> : <h1>{memberCount}</h1>}
        <span>Members</span>
      </div>
      <div className={cx('count-element')}>
        {reactionCount === null ? <h1>0</h1> : <h1>{reactionCount}</h1>}
        <span>Reactions</span>
      </div>
    </div>
  );
}
