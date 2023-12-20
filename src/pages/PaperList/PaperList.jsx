import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';
import { INITIAL_RECIPIENTS_TYPE } from '@/stores';
import { Header } from '@/components/common/Header';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';
import PaperListCards from '../../components/common/CardList/PaperListCards';
import styles from './PaperList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export function PaperList() {
  const {
    data: { results },
  } = useAsync(() => api.get(ENDPOINT.RECIPIENTS), INITIAL_RECIPIENTS_TYPE);

  const { data } = useAsync(
    () => api.get(ENDPOINT.RECIPIENTS, { params: { limit: 8, sort: 'like' } }),
    INITIAL_RECIPIENTS_TYPE
  );

  const like = data.results;
  return (
    <div className={cx('paper-list')}>
      <Header isLanding={true} />
      <main className={cx('paper-list-content')}>
        <div className={cx('paper-list-container')}>
          <div className={cx('list-wrap')}>
            <div>
              <p className={cx('list-wrap-title')}>인기 롤링 페이퍼 🔥</p>
              <PaperListCards data={like} />
            </div>
            <div>
              <p className={cx('list-wrap-title')}>
                최근에 만든 롤링 페이퍼 ⭐️️
              </p>
              <PaperListCards data={results} />
            </div>
            <Link to={`/post`} className={cx('list-wrap-btn')}>
              <Button variant='primary' size={100}>
                나도 만들어보기
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
