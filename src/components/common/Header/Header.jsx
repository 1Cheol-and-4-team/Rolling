import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { ROLLING_LOGO } from '@/components/common/Header/constant';
import classNames from 'classnames/bind';
import styles from '@/components/common/Header/Header.module.scss';
import editIcon from '@/assets/images/icons/edit.svg';

const cx = classNames.bind(styles);

export const Header = ({ isLanding, isDetail, isEdit, id }) => {
  return (
    <header className={cx('main-header')}>
      <div className={cx('header-container')}>
        <h1 className={cx('logo')}>
          <Link to={'/'}>
            <img src={ROLLING_LOGO.logo} alt={ROLLING_LOGO.alt} />
          </Link>
        </h1>
        {isLanding && (
          <>
            <Link to={'/post'}>
              <Button variant='primary' size={42}>
                롤링 페이퍼 만들기
              </Button>
            </Link>
          </>
        )}
        {isDetail && (
          <div className={cx('header-edit')}>
            <Link to={`/post/${id}/edit`}>
              <Button variant='outlined' size={42}>
                <img src={editIcon} alt='편집하기 버튼' />
              </Button>
            </Link>
          </div>
        )}
        {isEdit && (
          <div className={cx('header-edit')}>
            <Link to={`/post/${id}/`}>
              <Button variant='primary' size={42}>
                <img src={editIcon} alt='편집하기 버튼' />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

Header.defaultProps = {
  isLanding: false,
};
