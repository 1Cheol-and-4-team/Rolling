import { response } from '@/stores';
import { Member } from '@/components/common/SideBar/';
import styles from './MemberList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// 현재는 mock 데이터를 이용함
// 추후에 아래 데이터들은 prop으로 받아와야 함
const mockMembers = response.results[1].recentMessages.slice(0, 5);

export function MemberList() {
  return (
    <div className={cx('member-list')}>
      <div className={cx('member-list-header')}>
        <h1 className={cx('member-list-header-title')}>Members</h1>
        <button className={cx('member-list-header-icon')}>
          <span>see all</span>
          <i className={cx('ic-arrow-right')}></i>
        </button>
      </div>
      <ul className={cx('member-list-content')}>
        {mockMembers.map((item) => (
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
  );
}
