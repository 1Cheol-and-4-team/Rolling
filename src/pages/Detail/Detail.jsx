import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';

import classNames from 'classnames/bind';
import styles from '@/pages/Detail/Detail.module.scss';

import { GridLayout } from '@/pages/Detail/GridLayout';
import { Header } from '@/components/common/Header';
import { Banner, Count, Emoji, MemberList } from '@/components/common/SideBar';
import { Button, IconButton, MixButton } from '@/components/common/Button';
import { Dropdown } from '@/components/common/Dropdown';

import { INITIAL_RECIPIENTS_TYPE } from '@/stores';

const cx = classNames.bind(styles);
const id = 615;

export const Detail = () => {
  const getApi = async () => api.get(`${ENDPOINT.RECIPIENTS}${id}/`);
  const { data } = useAsync(getApi, INITIAL_RECIPIENTS_TYPE);

  // const memberCount = new Set(data.recentMessages.map((item) => item.sender))
  //   .size;

  return (
    <div className={cx('detail')}>
      <Header />
      <main className={cx('content-wrapper')}>
        <aside className={cx('sidebar')}>
          <div className={cx('sidebar-content')}>
            <div className={cx('sidebar-header')}>
              <h2 className={cx('sidebar-title')}>Ashley Kim</h2>
              <Count
              // messageCount={results.messageCount}
              // memberCount={memberCount}
              // reactionCount={results.reactionCount}
              />
            </div>
            <Emoji />
            <MemberList />
          </div>
          <Banner />
        </aside>
        <div className={cx('content')}>
          <div className={cx('container')}>
            <div className={cx('content-header')}>
              <div className={cx('content-header-title')}>
                <h3>Rolling Paper</h3>
                <MixButton
                  variant='outlined'
                  size={40}
                  startIcon='ic-plus'
                  iconSize={12}
                  iconColor='white'
                  text='Add'
                />
              </div>
              <div className={cx('content-header-options')}>
                <Dropdown />
                <IconButton
                  variant='outlined'
                  style='square'
                  icon='ic-share'
                  iconSize='24'
                  iconColor='white'
                />
              </div>
            </div>
            <GridLayout />
          </div>
        </div>
      </main>
    </div>
  );
};
