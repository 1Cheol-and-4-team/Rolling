// import { response } from '@/stores';
import { relationshipToEnglish } from '@/utils';
import styles from './Badge.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export function Badge({ relationship }) {
  // 현재는 mock 데이터를 이용함
  // 추후에 relationship은 prop으로 받아와야 함
  // const mockRelationship = response.results[1].recentMessages[0].relationship;
  // const mockRelationship = '가족';

  return (
    <span
      className={cx('badge', `badge-${relationshipToEnglish(relationship)}`)}
    >
      {relationship}
    </span>
  );
}
