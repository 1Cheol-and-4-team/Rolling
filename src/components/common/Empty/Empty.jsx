import classNames from 'classnames/bind';
import styles from '@/components/common/Empty/Empty.module.scss';

const cx = classNames.bind(styles);

export const Empty = ({ importImg, message }) => {
  return (
    <div className={cx('empty-container')}>
      <span className={cx('empty-container-icon')}>
        <img src={importImg.URL} alt={importImg.ALT} />
      </span>
      <span className={cx('empty-container-message')}>{message}</span>
    </div>
  );
};
