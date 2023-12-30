import classNames from 'classnames/bind';
import styles from './Badge.module.scss';
import { relationshipToEnglish } from '@/utils';

const cx = classNames.bind(styles);

export function Badge({ relationship, type }) {
  return (
    <div
      className={cx('badge', `badge-${relationshipToEnglish(relationship)}`, {
        [`badge-type-${type}`]: type,
      })}
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
