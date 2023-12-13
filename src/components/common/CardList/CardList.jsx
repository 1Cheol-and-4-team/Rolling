import propTypes from 'prop-types';
import { response } from '@/stores';
import { BadgeEmoji } from '@/components/common/Badge';
import styles from './CardList.module.scss';
import classNames from 'classnames/bind';
import { ProfileImg } from './ProfileImg';

const cx = classNames.bind(styles);

CardList.propTypes = {
  response: propTypes.object,
};

export function CardList() {
  // response 데이터는 prop으로 받아와야 함
  const { results } = response;
  const { name, backgroundColor, messageCount, recentMessages, topReactions } =
    results[1];

  return (
    <div className={cx('card-list', `card-list-${backgroundColor}`)}>
      <article>
        <div className={cx('card-list-title')}>To. {name}</div>
        <ProfileImg
          messageCount={messageCount}
          recentMessages={recentMessages}
        />
        <div className={cx('card-list-count')}>
          <span>{messageCount < 1000 ? messageCount : '999+'}</span>
          명이 작성했어요!
        </div>
      </article>
      <div className={cx('card-list-reaction')}>
        {topReactions.slice(0, 3).map((reaction) => (
          <BadgeEmoji key={reaction.id} num={reaction.count}>
            {reaction.emoji}
          </BadgeEmoji>
        ))}
      </div>
    </div>
  );
}

export default CardList;
