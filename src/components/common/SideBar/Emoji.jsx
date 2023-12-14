import { response } from '@/stores';
import { BadgeEmoji } from '@/components/common/Badge';
import styles from './Emoji.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// 현재는 mock 데이터를 이용함
// 추후에 아래 데이터들은 prop으로 받아와야 함
const mockEmoji = response.results[1].topReactions.slice(0, 8);

export function Emoji() {
  return (
    <div className={cx('emoji')}>
      <div className={cx('emoji-header')}>
        <h1 className={cx('emoji-header-title')}>Emotions</h1>
        <button className={cx('emoji-header-icon')}>
          <i className={cx('ic-add-emoji')}></i>
        </button>
      </div>
      <ul className={cx('emoji-content')}>
        {mockEmoji.map((item) => (
          <li key={item.id}>
            <BadgeEmoji emoji={item.emoji} count={item.count} />
          </li>
        ))}
      </ul>
    </div>
  );
}
