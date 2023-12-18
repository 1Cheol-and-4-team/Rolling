import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';

import classNames from 'classnames/bind';
import styles from '@/pages/Detail/Detail.module.scss';
import { Card } from '@/components/common/Card';

import { INITIAL_MESSAGE_TYPE } from '@/stores';

const cx = classNames.bind(styles);
const id = 615;

export const GridLayout = () => {
  const getApi = async () => api.get(`${ENDPOINT.RECIPIENTS}${id}/messages/`);
  const {
    data: { results },
  } = useAsync(getApi, INITIAL_MESSAGE_TYPE);

  return (
    <ul className={cx('grid-layout')}>
      {results.map((item) => (
        <li key={item.id}>
          <Card
            id={item.id}
            relationship={item.relationship}
            sender={item.sender}
            profileImageURL={item.profileImageURL}
            content={item.content}
            createdAt={item.createdAt}
          />
        </li>
      ))}
    </ul>
  );
};
