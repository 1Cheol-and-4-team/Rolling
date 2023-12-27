import { useEffect, useMemo, useState } from 'react';

import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';
import classNames from 'classnames/bind';
import styles from './PaperList.module.scss';
import { Helmet } from 'react-helmet';

import { Header } from '@/components/common/Header';
import { Button, LinkButton } from '@/components/common/Button';
import PaperListCards from '../../components/common/CardList/PaperListCards';
import Search from '@/components/common/CardList/Search';

import { INITIAL_RECIPIENTS_TYPE, ROUTER_PATH, IMPORT_IMAGES } from '@/stores';

const cx = classNames.bind(styles);
const { EMPTY_CARD } = IMPORT_IMAGES;

export function PaperList() {
  const [isKeyword, setKeyword] = useState('');

  const {
    data: { results },
    execute,
  } = useAsync(
    () => api.get(ENDPOINT.RECIPIENTS, { params: { limit: 100 } }),
    INITIAL_RECIPIENTS_TYPE,
    false
  );

  useEffect(() => {
    execute();
  }, []);

  const { data: popular, execute: likeCads } = useAsync(
    () => api.get(ENDPOINT.RECIPIENTS, { params: { sort: 'like' } }),
    INITIAL_RECIPIENTS_TYPE,
    false
  );
  useEffect(() => {
    likeCads();
  }, []);

  const popularCardData = popular.results;
  const latestCardData = results.slice(0, 8);

  const searchCards = useMemo(
    () =>
      isKeyword &&
      results.filter(({ name }) =>
        name.toLowerCase().includes(isKeyword.toLowerCase())
      ),
    [isKeyword]
  );

  return (
    <div className={cx('paper-list')}>
      <Helmet>
        <title>롤링 보드 | Rolling</title>
      </Helmet>

      <Header isLanding={false} />

      <main className={cx('paper-list-content')}>
        <div className={cx('paper-list-container')}>
          <div className={cx('paper-list-header')}>
            <h1 className={cx('paper-list-header-title')}>ROLLING BOARD</h1>
            <Search setKeyword={setKeyword} />
          </div>
          <section className={cx('list-wrapper')}>
            {isKeyword ? (
              <>
                {searchCards.length > 0 ? (
                  <section className={cx('list-content')}>
                    <h2 className={cx('list-content-title')}>
                      <span className={cx('list-content-title-white')}>
                        FOUND
                      </span>{' '}
                      ROLLING
                    </h2>
                    <PaperListCards data={searchCards} />
                  </section>
                ) : (
                  <section className={cx('list-content')}>
                    <h2 className={cx('list-content-title')}>
                      <span className={cx('list-content-title-white')}>
                        FOUND
                      </span>{' '}
                      ROLLING
                    </h2>
                    <div className={cx('list-content-notFound')}>
                      <img src={EMPTY_CARD.URL} alt={EMPTY_CARD.ALT} />
                      <p>No maches found</p>
                    </div>
                  </section>
                )}
              </>
            ) : (
              <>
                {results.length > 0 ? (
                  <section className={cx('list-content')}>
                    <h2 className={cx('list-content-title')}>
                      <span className={cx('list-content-title-purple')}>
                        POPULAR
                      </span>{' '}
                      ROLLING
                    </h2>
                    <PaperListCards data={popularCardData} />

                    <h2 className={cx('list-content-title')}>
                      <span className={cx('list-content-title-orange')}>
                        LATEST
                      </span>{' '}
                      ROLLING
                    </h2>
                    <PaperListCards data={latestCardData} />
                  </section>
                ) : (
                  <section className={cx('list-content')}>
                    <h2 className={cx('list-content-title')}>
                      <span className={cx('list-content-title-purple')}>
                        POPULAR
                      </span>{' '}
                      ROLLING
                    </h2>
                    <div
                      style={{ height: '26rem' }}
                      className={cx('list-content-notFound')}
                    >
                      <img src={EMPTY_CARD.URL} alt={EMPTY_CARD.ALT} />
                      <p>Rolling paper not found</p>
                    </div>

                    <h2 className={cx('list-content-title')}>
                      <span className={cx('list-content-title-orange')}>
                        LATEST
                      </span>{' '}
                      ROLLING
                    </h2>
                    <div
                      style={{ height: '26rem' }}
                      className={cx('list-content-notFound')}
                    >
                      <img src={EMPTY_CARD.URL} alt={EMPTY_CARD.ALT} />
                      <p>Rolling paper not found</p>
                    </div>
                  </section>
                )}
              </>
            )}
          </section>
          <div className={cx('paper-list-footer')}>
            <LinkButton path={ROUTER_PATH.POST_PATH}>
              <Button variant='primary' size={100}>
                나도 만들어보기
              </Button>
            </LinkButton>
          </div>
        </div>
      </main>
    </div>
  );
}
