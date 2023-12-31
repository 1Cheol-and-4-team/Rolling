import classNames from 'classnames/bind';
import styles from './HomeCard.module.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '@/components/common/Skeleton/skeleton.css';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

export function HomeCard({ content, style }) {
  const { point, title1, title2, explain, image } = content;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(loadingTimer);
  }, []);

  return isLoading ? (
    <div>
      <Skeleton
        className={cx('home-card')}
        style={{
          width: '116rem',
          height: '32.4rem',
          borderRadius: '1.6rem',
        }}
      />
    </div>
  ) : (
    <div className={cx('home-card')} style={style}>
      <div className={cx('home-card-wrap')}>
        <div className={cx('home-card-point')}>
          <p className={cx('home-card-text')}>{point}</p>
        </div>
        <h1 className={cx('home-card-title')}>
          {title1}
          <br className={cx('home-card-title')} />
          {title2}
        </h1>
        <p className={cx('home-card-des')}>{explain}</p>
      </div>
      <img src={image} />
    </div>
  );
}
