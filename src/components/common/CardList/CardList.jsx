import propTypes from 'prop-types';
import { BadgeEmoji } from '@/components/common/Badge';
import styles from './CardList.module.scss';
import classNames from 'classnames/bind';
import { ProfileImg } from './ProfileImg';

const cx = classNames.bind(styles);

CardList.propTypes = {
  response: propTypes.object,
};

export function CardList(data) {
  const {
    name,
    backgroundColor,
    backgroundImageURL,
    messageCount,
    recentMessages,
    topReactions,
  } = data.data;

  return (
    <li
      style={{
        backgroundImage: backgroundImageURL ? `url(${backgroundImageURL})` : '',
      }}
      className={cx('card-list', `card-list-${backgroundColor}`)}
    >
      <article>
        <div
          style={{
            color: backgroundImageURL ? '#ffffff' : '',
          }}
          className={cx('card-list-title')}
        >
          To. {name}
        </div>
        <ProfileImg
          messageCount={messageCount}
          recentMessages={recentMessages}
        />
        <div
          style={{
            color: backgroundImageURL ? '#ffffff' : '',
          }}
          className={cx('card-list-count')}
        >
          <span>{messageCount < 1000 ? messageCount : '999+'}</span>
          명이 작성했어요!
        </div>
      </article>
      <ul className={cx('card-list-reaction')}>
        {topReactions &&
          topReactions.map((reaction) => (
            <li key={reaction.id}>
              <BadgeEmoji emoji={reaction.emoji} count={reaction.count} />
            </li>
          ))}
      </ul>
    </li>
  );
}
