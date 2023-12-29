import classNames from 'classnames/bind';
import styles from './Count.module.scss';

const cx = classNames.bind(styles);

export function Count({ recipientData, messageData }) {
  const { reactionCount } = recipientData;

  const initialCountInfo = () => {
    const memberCount = new Set(messageData.map((item) => item.sender)).size;
    return { memberCount };
  };
  const { memberCount } = initialCountInfo();

  const isEmpty = (array, key) => {
    if (key === 'sender') {
      return array.every((item) => item[key] === '');
    }
    return array.every((item) => item[key] === null);
  };

  return (
    <div className={cx('count')}>
      <div className={cx('count-element')}>
        {isEmpty(messageData, 'id') ? (
          <h1>0</h1>
        ) : (
          <h1>{messageData.length}</h1>
        )}
        <span>Papers</span>
      </div>
      <div className={cx('count-element')}>
        {isEmpty(messageData, 'sender') ? <h1>0</h1> : <h1>{memberCount}</h1>}
        <span>Members</span>
      </div>
      <div className={cx('count-element')}>
        {reactionCount === undefined ? <h1>0</h1> : <h1>{reactionCount}</h1>}
        <span>Reactions</span>
      </div>
    </div>
  );
}
