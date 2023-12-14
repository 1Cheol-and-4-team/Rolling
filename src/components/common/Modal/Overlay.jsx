import styles from './Modal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const Overlay = ({ children }) => {
  return <div className={cx('overlay')}>{children}</div>;
};
