// lib
import classNames from 'classnames/bind';
import styles from '@/pages/NotFound/NotFound.module.scss';

import { Button } from '@/components/common/Button';
import notFound from '@/assets/images/notFound-404.svg';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export const NotFound = () => {
  return (
    <div className={cx('not-found')}>
      <div className={cx('not-found-content')}>
        <img src={notFound} alt='404' />
        <h1 className={cx('not-found-title')}>PAGE NOT FOUND</h1>
        <Link to={'/'}>
          <Button variant='primary' size={40}>
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
