import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { HomeCard } from '@/pages/Home';
import { Header } from '@/components/common/Header';
import { LinkButton, Button } from '@/components/common/Button';

import { ROUTER_PATH, CONTENT_1, CONTENT_2 } from '@/stores';

import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Rolling | 소중한 사람에게 마음을 전달해 보세요</title>
      </Helmet>

      <Header isLanding={true} />
      <div className={cx('home')}>
        <div className={cx('home-container')}>
          <HomeCard content={CONTENT_1} />
          <HomeCard
            content={CONTENT_2}
            style={{
              '--reverse': 'row-reverse',
              paddingBottom: 0,
              '--end': 'flex-end',
              '--padding': `4.8rem`,
              gap: 0,
            }}
          />

          <div className={cx('button-area')}>
            <LinkButton path={ROUTER_PATH.LIST_PATH}>
              <Button variant='primary' size={100}>
                구경해보기
              </Button>
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}
