import styles from './Badge.module.scss';
import classNames from 'classnames/bind';
import { relationshipToEnglish } from '@/utils';

const cx = classNames.bind(styles);

export function Badge({ relationship, type = '' }) {
  return (
    <div
      className={cx(
        'badge',
        { [`badge-${relationshipToEnglish(relationship)}`]: relationship },
        type && `badge-type-${type}`
      )}
    >
      <span>{relationshipToEnglish(relationship)}</span>
    </div>
  );
}

export const NewBadge = () => {
  return (
    <div className={cx('badge', 'badge-new')}>
      <span>New</span>
    </div>
  );
};
