// lib
import classNames from 'classnames/bind';
import styles from '@/components/common/Empty/Empty.module.scss';

const cx = classNames.bind(styles);

export const EmptyCard = ({ importImg, message }) => {
  return (
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
