import { Button } from '@/components/common/Button';
import point1_img from '@/assets/images/point1-img.svg';
import point2_img from '@/assets/images/point2-img.svg';
import HomeCarrd from './HomeCard';
import { Header } from '@/components/common/Header';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const content1 = {
  point: 'Point. 01',
  title1: '누구나 손쉽게, 온라인 ',
  title2: '롤링 페이퍼를 만들 수 있어요',
  explain: '로그인 없이 자유롭게 만들어요.',
  image: point1_img,
};

const content2 = {
  point: 'Point. 02',
  title1: '서로에게 이모지로 감정을 ',
  title2: '표현해보세요',
  explain: '롤링 페이퍼에 이모지를 추가할 수 있어요.',
  image: point2_img,
};

function HomePage() {
  return (
    <>
      <ul className={cx('guideline-list', 'display-block')}>
        <li className={cx('guideline-list-item')}>
          <div>
            <Header isLanding={true} />
          </div>
        </li>
      </ul>
      <div className={cx('home')}>
        <HomeCarrd content={content1} />
        <HomeCarrd content={content2} style={{ '--reverse': 'row-reverse' }} />
        <Link to={'/list'} className={cx('home-button')}>
          <Button variant='primary' size={100}>
            구경해보기
          </Button>
        </Link>
      </div>
    </>
  );
}

export default HomePage;
