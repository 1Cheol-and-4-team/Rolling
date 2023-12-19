import { Badge } from '@/components/common/Badge';
import styles from './Member.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

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
      <Badge relationship={relationship} type='sidebar' />
    </div>
  );
}
