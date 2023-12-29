import { useState, useEffect } from 'react';
import { Badge } from '@/components/common/Badge';
import styles from './Member.module.scss';
import classNames from 'classnames/bind';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '@/components/common/Skeleton/skeleton.css';
const cx = classNames.bind(styles);

export function Member({ image, member, relationship }) {
  const hexCodeRegex = /[?&]color=([^&]+)/;
  const match = image?.match(hexCodeRegex);
  const randomColor = match ? match[1] : '#24262B';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className={cx('member')}>
      {isLoading ? (
        <Skeleton className={cx('member-profile-img')} />
      ) : (
        <div className={cx('member-profile')}>
          <div
            className={cx('member-profile-img')}
            style={{ '--color': randomColor }}
          >
            <img src={image} alt='글쓴이 프로필 사진' />
          </div>
          <h1 className={cx('member-profile-name')}>
            <span>{member}</span>
          </h1>
        </div>
      )}

      <Badge relationship={relationship} type='sidebar' />
    </div>
  );
}
