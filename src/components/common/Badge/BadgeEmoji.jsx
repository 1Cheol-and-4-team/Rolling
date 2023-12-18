import styles from './BadgeEmoji.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export function BadgeEmoji({ children, key, num }) {
  // 현재는 mock 데이터를 이용함
  // 추후에 mockEmoji와 mockEmojiCount은 prop으로 받아와야 함
  // const mockEmoji = response.results[1].topReactions[1].emoji;
  // const mockEmojiCount = response.results[1].topReactions[1].count;
  return (
    <div key={key} className={cx('badge-emoji')}>
      <span>{children}</span>
      <span>{num}</span>
    </div>
  );
}
