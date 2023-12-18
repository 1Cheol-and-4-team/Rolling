import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';

import classNames from 'classnames/bind';
import styles from '@/components/common/SideBar/MemberList.module.scss';

import { Member } from '@/components/common/SideBar/';
import { Empty } from '@/components/common/Empty';
import { MixButton } from '@/components/common/Button';

import { INITIAL_MESSAGE_TYPE, IMPORT_IMAGES } from '@/stores';

const cx = classNames.bind(styles);
const { EMPTY } = IMPORT_IMAGES;

export function MemberList({ id }) {
  const {
    data: { results },
  } = useAsync(
    () => api.get(`${ENDPOINT.RECIPIENTS}${id}/messages/`),
    INITIAL_MESSAGE_TYPE
  );

  const latestMembers = results.slice(0, 4);
  const isMembersEmpty = results.every((item) => item.id === null);

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
        />
      </div>
      {isMembersEmpty ? (
        <Empty importImg={EMPTY} message={'No Members'} />
      ) : (
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
      )}
    </div>
  );
}
