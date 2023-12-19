import styles from './BadgeEmoji.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export function BadgeEmoji({ emoji, count }) {
  return (
    <div className={cx('tag-emoji')}>
      <span className={cx('emoji')}>{emoji}</span>
      <span className={cx('emoji-count')}>{count}</span>
    </div>
  );
}
