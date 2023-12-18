import logo from '@/assets/images/icons/logo-symbol.svg';
import sytles from './Banner.module.scss';
import handImg from '@/assets/images/img-hand.png';
import classNames from 'classnames/bind';
const cx = classNames.bind(sytles);
export function Banner() {
  return (
    <div className={cx('sidebar-banner')}>
      <div className={cx('sidebar-banner-text')}>
        <p>
          <img src={logo} />
          <span>invite</span>
        </p>
        <h1>Members</h1>
      </div>

      <img className={cx('handImg')} src={handImg} />
    </div>
  );
}
