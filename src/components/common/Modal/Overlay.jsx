import classNames from 'classnames/bind';
import styles from '@/components/common/Modal/Modal.module.scss';

const cx = classNames.bind(styles);

export const Overlay = ({ children }) => {
  return <div className={cx('overlay')}>{children}</div>;
};
