import classNames from 'classnames/bind';
import styles from './HomeCard.module.scss';

const cx = classNames.bind(styles);

export function HomeCard({ content, style }) {
  const { point, title1, title2, explain, image } = content;

  return (
    <div className={cx('home-card')} style={style}>
      <div className={cx('home-card-wrap')}>
        <div className={cx('home-card-point')}>
          <p className={cx('home-card-text')}>{point}</p>
        </div>
        <h1 className={cx('home-card-title')}>
          {title1}
          <br className={cx('home-card-title')} />
          {title2}
        </h1>
        <p className={cx('home-card-des')}>{explain}</p>
      </div>
      <img src={image} />
    </div>
  );
}
