import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// api
import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';
import { INITIAL_RECIPIENTS_TYPE } from '@/stores';
// lib
import classNames from 'classnames/bind';
import styles from '@/pages/Edit/Edit.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// component
import { Header } from '@/components/common/Header';
import { Banner, Count, Emoji, MemberList } from '@/components/common/SideBar';
import { GridLayout } from '@/pages/Edit/GridLayout';
import { IconButton, Button } from '@/components/common/Button';
import { Dropdown } from '@/components/common/Dropdown';

import { SORT_LIST, SENDER_TAB_LIST } from '@/stores';

const cx = classNames.bind(styles);

export const Edit = () => {
  const { id } = useParams();
  let url = window.location.href;

  const { data } = useAsync(
    () => api.get(`${ENDPOINT.RECIPIENTS}${id}/`),
    INITIAL_RECIPIENTS_TYPE
  );

  const [isActive, setIsActive] = useState(1);
  const [tabName, setTagName] = useState('All');
  const [sortOption, setSortOption] = useState('Latest');

  const handleActiveTabClick = (tabId, tabName) => {
    setIsActive(tabId);
    setTagName(tabName);
  };

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('URL이 복사되었습니다.');
    } catch (e) {
      console.error('[LINK COPY ERROR]', e);
    }
  };

  return (
    <div className={cx('edit')}>
      <Header />
      <ToastContainer
        position='top-center'
        limit={1}
        closeButton={false}
        autoClose={5000}
        pauseOnHover={false}
        theme='dark'
      />
      <main className={cx('content-wrapper')}>
        <aside className={cx('sidebar')}>
          <div className={cx('sidebar-content')}>
            <div className={cx('sidebar-header')}>
              <h2 className={cx('sidebar-title')}>{data.name}</h2>
              <Count id={id} reactionCount={data.reactionCount} />
            </div>
            <Emoji id={id} />
            <MemberList id={id} />
          </div>
          <Banner />
        </aside>

        <div className={cx('content')}>
          <div className={cx('container')}>
            <div className={cx('content-header')}>
              <div className={cx('content-header-title')}>
                <h3>Rolling Paper</h3>
                <Link to={`/post/${id}/message`}>
                  <Button variant='delete' size={40} text='Delete' />
                </Link>
              </div>
              <div className={cx('content-header-filter')}>
                <ul className={cx('tab-list')}>
                  {SENDER_TAB_LIST.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleActiveTabClick(item.id, item.option)}
                      className={cx(
                        'tab-list-item',
                        isActive === item.id && 'tab-active'
                      )}
                    >
                      <button>{item.option}</button>
                    </li>
                  ))}
                </ul>
                <div className={cx('content-header-options')}>
                  <Dropdown
                    sortList={SORT_LIST}
                    setSortOption={setSortOption}
                    size='sm'
                  />
                  <IconButton
                    variant='outlined'
                    style='square'
                    icon='ic-share'
                    iconSize='24'
                    iconColor='white'
                    onClick={() => handleCopyClipBoard(url)}
                  />
                </div>
              </div>
            </div>
            <GridLayout id={id} tabName={tabName} sortOption={sortOption} />
          </div>
        </div>
      </main>
    </div>
  );
};
