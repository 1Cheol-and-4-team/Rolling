import { response } from '@/stores';
import styles from './Count.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// 현재는 mock 데이터를 이용함
// 추후에 아래 데이터들은 prop으로 받아와야 함
const mockPaperCount = response.results[1].messageCount;
const mockMemberCount = new Set(
  response.results[1].recentMessages.map((item) => item.sender)
).size;
const mockEmotionCount = response.results[1].reactionCount;

export function Count() {
  return (
    <div className={cx('count')}>
      <div className={cx('count-element')}>
        <h1>{mockPaperCount}</h1>
        <span>Papers</span>
      </div>
      <div className={cx('count-element')}>
        <h1>{mockMemberCount}</h1>
        <span>Members</span>
      </div>
      <div className={cx('count-element')}>
        <h1>{mockEmotionCount}</h1>
        <span>Emotions</span>
      </div>
    </div>
  );
}
