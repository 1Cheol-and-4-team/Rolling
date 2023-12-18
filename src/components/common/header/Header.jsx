import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button } from '@/components/common/Button';
import { ROLLING_LOGO } from '@/components/common/Header/constant';
import styles from '@/components/common/Header/Header.module.scss';

const cx = classNames.bind(styles);

export const Header = ({ isLanding }) => {
  return (
    <header className={cx('main-header')}>
      <div className={cx('header-container')}>
        <h1 className={cx('logo')}>
          <Link to={'/'}>
            <img src={ROLLING_LOGO.logo} alt={ROLLING_LOGO.alt} />
          </Link>
        </h1>
        {isLanding && (
          <Button variant='primary' size={42}>
            Create paper
          </Button>
        )}
      </div>
    </header>
  );
};

Header.defaultProps = {
  isLanding: false,
};
