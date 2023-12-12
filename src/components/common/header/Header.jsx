import classNames from 'classnames/bind';
import { Button } from '@/components/common/Button';
import { ROLLING_LOGO } from '@/components/common/Header/constant';
import styles from '@/components/common/Header/Header.module.scss';

const cx = classNames.bind(styles);

export const Header = ({ isLanding }) => {
  return (
    <header>
      <div className={cx('header-container')}>
        <h1 className={cx('logo')}>
          <a href='#none'>
            <img src={ROLLING_LOGO.logo} alt={ROLLING_LOGO.alt} />
          </a>
        </h1>
        {isLanding && (
          <Button variant='primary' size={42}>
            롤링 페이퍼 만들기
          </Button>
        )}
      </div>
    </header>
  );
};

Header.defaultProps = {
  isLanding: false,
};
