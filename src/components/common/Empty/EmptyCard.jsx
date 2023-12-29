// lib
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '@/components/common/Empty/Empty.module.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '@/components/common/Skeleton/skeleton.css';
const cx = classNames.bind(styles);

export const EmptyCard = ({ importImg, message }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(loadingTimer);
  }, []);

  return isLoading ? (
    <Skeleton className={cx('empty-card')} />
  ) : (
    <div className={cx('empty-card')}>
      <div className={cx('empty-card-inner')}>
        <span className={cx('empty-card-icon')}>
          <img src={importImg.URL} alt={importImg.ALT} />
        </span>
        <p className={cx('empty-card-message')}>{message}</p>
      </div>
    </div>
  );
};
