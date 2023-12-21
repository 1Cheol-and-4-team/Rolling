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
  const results = data.data;
  const {
    id,
    name,
    backgroundColor,
    backgroundImageURL,
    messageCount,
    recentMessages,
    topReactions,
  } = results;

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
        <ProfileImg id={id} recentMessages={recentMessages} />
        <div
          style={{
            color: backgroundImageURL ? '#ffffff' : '',
          }}
          className={cx('card-list-count')}
        >
          <span>{messageCount < 1000 ? messageCount : '999+'}</span>
          개의 메시지가 작성됐어요!
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
