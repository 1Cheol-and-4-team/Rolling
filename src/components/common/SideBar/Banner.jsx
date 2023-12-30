import classNames from 'classnames/bind';
import sytles from '@/components/common/SideBar/Banner.module.scss';

import { IMPORT_IMAGES } from '@/stores';

const {
  INVITE_BANNER: { LOGO_SYMBOL, CLAP },
} = IMPORT_IMAGES;

const cx = classNames.bind(sytles);

export function Banner() {
  return (
    <div className={cx('sidebar-banner')}>
      <div className={cx('sidebar-banner-text')}>
        <p>
          <img src={LOGO_SYMBOL.URL} alt={LOGO_SYMBOL.ALT} />
          <span>invite</span>
        </p>
        <h1>Members</h1>
      </div>

      <img className={cx('handImg')} src={CLAP.URL} alt={CLAP.ALT} />
    </div>
  );
}
