import PropTypes from 'prop-types';
import styles from './ProfileImg.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

ProfileImg.propTypes = {
  messageCount: PropTypes.number,
  recentMessages: PropTypes.array,
};
export function ProfileImg({ messageCount, recentMessages }) {
  const count = messageCount - 3;

  return (
    <div className={cx('wrap')}>
      {recentMessages[0] && <img src={recentMessages[0].profileImageURL} />}
      {recentMessages[1] && (
        <img className={cx('img1')} src={recentMessages[1].profileImageURL} />
      )}
      {recentMessages[2] && (
        <img className={cx('img2')} src={recentMessages[2].profileImageURL} />
      )}
      {count > 0 && <span>+{count < 1000 ? count : '999'}</span>}
    </div>
  );
}
