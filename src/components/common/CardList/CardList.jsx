import { BadgeEmoji } from '@/components/common/Badge';

import classNames from 'classnames/bind';
import styles from './CardList.module.scss';

const cx = classNames.bind(styles);

export function CardList(data) {
  const results = data.data;
  const {
    name,
    backgroundColor,
    backgroundImageURL,
    messageCount,
    topReactions,
  } = results;

  const isEmptyReaction = topReactions?.length === 0;

  return (
    <li
      style={{
        backgroundImage: backgroundImageURL
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImageURL})`
          : '',
      }}
      className={cx('card-list', {
        [`card-list-${backgroundColor}`]: backgroundColor,
      })}
    >
      <div className={cx('card-list-content')}>
        <h1
          style={{
            color: backgroundImageURL ? '#ffffff' : '#191A1E',
          }}
          className={cx('card-list-content-name')}
        >
          {name}
        </h1>
        <p
          style={{
            color: backgroundImageURL ? '#ffffff' : '#191A1E',
          }}
          className={cx('card-list-content-count')}
        >
          <span>{messageCount < 1000 ? messageCount : '999+'}</span>개의
          메시지가 작성됐어요!
        </p>

        {isEmptyReaction ? (
          <div className={cx('card-list-content-empty')}>
            <p>No Reactions</p>
          </div>
        ) : (
          <ul className={cx('card-list-content-reaction')}>
            {topReactions &&
              topReactions.map((reaction) => (
                <li key={reaction.id}>
                  <BadgeEmoji emoji={reaction.emoji} count={reaction.count} />
                </li>
              ))}
          </ul>
        )}
      </div>
    </li>
  );
}
