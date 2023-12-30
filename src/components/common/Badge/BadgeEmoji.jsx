import classNames from 'classnames/bind';
import styles from './BadgeEmoji.module.scss';

const cx = classNames.bind(styles);

export function BadgeEmoji({ emoji, count }) {
  return (
    <div className={cx('tag-emoji')}>
      <span className={cx('emoji')}>{emoji}</span>
      <span className={cx('emoji-count')}>{count}</span>
    </div>
  );
}
