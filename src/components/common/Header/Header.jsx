import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from '@/components/common/Header/Header.module.scss';

import { Button, LinkButton, EditButton } from '@/components/common/Button';
import { IMPORT_IMAGES, ROUTER_PATH } from '@/stores';

const cx = classNames.bind(styles);
const { ROLLING_LOGO, EDIT } = IMPORT_IMAGES;
const { LANDING_PATH, POST_PATH } = ROUTER_PATH;

export const Header = ({
  id,
  isLanding = false,
  isDetail = false,
  isEdit = false,
}) => {
  return (
    <header className={cx('main-header')}>
      <div className={cx('header-container')}>
        <h1 className={cx('logo')}>
          <LinkButton path={LANDING_PATH}>
            <img src={ROLLING_LOGO.URL} alt={ROLLING_LOGO.ALT} />
          </LinkButton>
        </h1>
        {isLanding && (
          <>
            <Link to={POST_PATH}>
              <Button variant='primary' size={40}>
                Get Started
              </Button>
            </Link>
          </>
        )}
        {isDetail && (
          <div className={cx('header-edit')}>
            <LinkButton path={`/post/${id}/edit`}>
              <EditButton src={EDIT.URL} alt={EDIT.ALT} />
            </LinkButton>
          </div>
        )}
        {isEdit && (
          <div className={cx('header-edit')}>
            <LinkButton path={`/post/${id}`}>
              <EditButton src={EDIT.URL} alt={EDIT.ALT} active={true} />
            </LinkButton>
          </div>
        )}
      </div>
    </header>
  );
};

Header.defaultProps = {
  isLanding: false,
  isDetail: false,
  isEdit: false,
};
