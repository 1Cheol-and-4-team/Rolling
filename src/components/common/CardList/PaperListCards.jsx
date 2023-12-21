import { CardList } from '../CardList';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@/components/common/Button';
import styles from './PaperListCards.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function PaperListCards({ data }) {
  const [scroll, setScroll] = useState(0);
  const [currentCardIndex, setcurrentCardIndex] = useState(4);
  const dataCount = data.length;

  const handleClick = () => {
    setScroll(scroll - 29.5);
    if (currentCardIndex <= dataCount - 1) {
      setcurrentCardIndex(currentCardIndex + 1);
    }
  };
  const handleClickReverse = () => {
    setScroll(scroll + 29.5);
    if (currentCardIndex > 0) {
      setcurrentCardIndex(currentCardIndex - 1);
    }
  };
  return (
    <>
      <div className={cx('cardList')}>
        <ul className={cx('cardList-wrap')}>
          {scroll !== 0 && dataCount > 4 && (
            <IconButton
              onClick={handleClickReverse}
              variant='outlined'
              style='arrow'
              icon='ic-arrow'
              iconSize='16'
              iconColor='gray900'
            />
          )}
          <div
            className={cx('cardList-card')}
            style={{ '--scroll': `${scroll}rem` }}
          >
            {data.map((item) => (
              <Link to={`/post/${item.id}`} key={item.id}>
                <CardList data={item} />
              </Link>
            ))}
          </div>
          {currentCardIndex < dataCount && dataCount > 4 && (
            <IconButton
              onClick={handleClick}
              variant='outlined'
              style='arrowRight'
              icon='ic-arrow-right'
              iconSize='16'
              iconColor='gray900'
            />
          )}
        </ul>
      </div>
    </>
  );
}

export default PaperListCards;
