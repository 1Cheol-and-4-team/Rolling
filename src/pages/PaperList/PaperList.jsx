import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';
import { INITIAL_RECIPIENTS_TYPE } from '@/stores';
import { Header } from '@/components/common/Header';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';
import PaperListCards from '../../components/common/CardList/PaperListCards';
import styles from './PaperList.module.scss';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet';
import { useMemo, useState } from 'react';
import Search from '../../components/common/CardList/Search';
import notFound from '@/assets/images/icons/not-found.svg';

const cx = classNames.bind(styles);

export function PaperList() {
  const [keyword, setKeyword] = useState('');

  const {
    data: { results },
  } = useAsync(() => api.get(ENDPOINT.RECIPIENTS), INITIAL_RECIPIENTS_TYPE);

  const { data } = useAsync(
    () => api.get(ENDPOINT.RECIPIENTS, { params: { sort: 'like' } }),
    INITIAL_RECIPIENTS_TYPE
  );

  const like = data.results;
  const SearchCards = useMemo(
    () =>
      keyword &&
      results.filter(({ name }) =>
        name.toLowerCase().includes(keyword.toLowerCase())
      ),
    [keyword]
  );

  return (
    <div className={cx('paper-list')}>
      <Helmet>
        <title>카드 리스트 | Rolling</title>
      </Helmet>
      <Header isLanding={true} />
      <main className={cx('paper-list-content')}>
        <div className={cx('paper-list-container')}>
          <div>
            <h1 className={cx('paper-list-title')}>
              Find your <span>&nbsp;Rolling Paper</span>
            </h1>
            <Search setKeyword={setKeyword} />
          </div>
          <div className={cx('list-wrap')}>
            {keyword ? (
              <>
                {SearchCards.length > 0 ? (
                  <>
                    <p className={cx('list-wrap-title')}>
                      검색된 롤링 페이퍼🔍
                    </p>
                    <PaperListCards data={SearchCards} />
                  </>
                ) : (
                  <div className={cx('list-wrap-notFound')}>
                    <img src={notFound} />
                    <p>No maches found</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {results.length > 0 ? (
                  <>
                    <p className={cx('list-wrap-title')}>인기 롤링 페이퍼 🔥</p>
                    <PaperListCards data={like} />
                    <p className={cx('list-wrap-title')}>
                      최근에 만든 롤링 페이퍼 ⭐️️
                    </p>
                    <PaperListCards data={results} />
                  </>
                ) : (
                  <>
                    <p className={cx('list-wrap-title')}>인기 롤링 페이퍼 🔥</p>
                    <div
                      style={{ height: '26rem' }}
                      className={cx('list-wrap-notFound')}
                    >
                      <img src={notFound} />
                      <p>No maches found</p>
                    </div>
                    <p className={cx('list-wrap-title')}>
                      최근에 만든 롤링 페이퍼 ⭐️️
                    </p>
                    <div
                      style={{ height: '26rem' }}
                      className={cx('list-wrap-notFound')}
                    >
                      <img src={notFound} />
                      <p>No maches found</p>
                    </div>
                  </>
                )}
              </>
            )}
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
