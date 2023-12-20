import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';

import styles from './Count.module.scss';
import classNames from 'classnames/bind';

import { INITIAL_MESSAGE_TYPE } from '@/stores';

const cx = classNames.bind(styles);

export function Count({ id, getMessageCount, getReactionCount }) {
  const {
    data: { results },
  } = useAsync(
    () =>
      api.get(`${ENDPOINT.RECIPIENTS}${id}/messages/`, {
        params: { limit: 100 },
      }),
    INITIAL_MESSAGE_TYPE
  );

  const initialCountInfo = () => {
    const memberCount = new Set(results.map((item) => item.sender)).size;
    return { memberCount };
  };
  const { memberCount } = initialCountInfo();

  const isEmpty = (array, key) => {
    if (key === 'sender') {
      return array.every((item) => item[key].length === 0);
    }
    return array.every((item) => item[key] === null);
  };

  return (
    <div className={cx('count')}>
      <div className={cx('count-element')}>
        {isEmpty(results, 'id') ? <h1>0</h1> : <h1>{getMessageCount}</h1>}
        <span>Papers</span>
      </div>
      <div className={cx('count-element')}>
        {isEmpty(results, 'sender') ? <h1>0</h1> : <h1>{memberCount}</h1>}
        <span>Members</span>
      </div>
      <div className={cx('count-element')}>
        {getReactionCount === undefined ? (
          <h1>0</h1>
        ) : (
          <h1>{getReactionCount}</h1>
        )}
        <span>Reactions</span>
      </div>
    </div>
  );
}
