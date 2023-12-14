import { Badge } from '@/components/common/Badge';
import styles from './Member.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// 현재는 mock 데이터를 이용함
// 추후에 아래 데이터들은 prop으로 받아와야 함
// const mockProfilImageURL =
//   response.results[1].recentMessages[0].profileImageURL;
// const mockSender = response.results[1].recentMessages[0].sender;
// const mockRelationship = response.results[1].recentMessages[0].relationship;

export function Member({ image, member, relationship }) {
  return (
    <div className={cx('member')}>
      <div className={cx('member-profile')}>
        <div className={cx('member-profile-img')}>
          <img src={image} alt='글쓴이 프로필 사진' />
        </div>
        <h1 className={cx('member-profile-name')}>
          <span>{member}</span>
        </h1>
      </div>
      <Badge relationship={relationship} />
    </div>
  );
}
