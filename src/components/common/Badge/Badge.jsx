import { response, relationshipToEnglish } from '@/stores';
import styles from './Badge.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export function Badge() {
  // 현재는 mock 데이터를 이용함
  // 추후에 relationship은 prop으로 받아와야 함
  const mockRelationship = response.results[1].recentMessages[0].relationship;

  return (
    <span
      className={cx(
        'badge',
        `badge-${relationshipToEnglish(mockRelationship)}`
      )}
    >
      {mockRelationship}
    </span>
  );
}

// import PropTypes from 'prop-types';
// Badge.propTypes = {
//   children: PropTypes.string,
//   key: PropTypes.number,
//   num: PropTypes.number,
// };

// function Badge(children, key, num) {
//   return (
//     <div key={key}>
//       {children}
//       <span>{num}</span>
//     </div>
//   );
// }

// export default Badge;
