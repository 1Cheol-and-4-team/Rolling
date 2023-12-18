import classNames from 'classnames/bind';
import sytles from './Banner.module.scss';
import symbol from '@/assets/images/icons/logo-symbol.svg';
import handImg from '@/assets/images/img-hand.png';

const cx = classNames.bind(sytles);

export function Banner() {
  return (
    <div className={cx('sidebar-banner')}>
      <div className={cx('sidebar-banner-text')}>
        <p>
          <img src={symbol} />
          <span>invite</span>
        </p>
        <h1>Members</h1>
      </div>

      <img className={cx('handImg')} src={handImg} />
    </div>
  );
}
