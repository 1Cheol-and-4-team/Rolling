import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// api
import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';
import { INITIAL_RECIPIENTS_TYPE, INITIAL_MESSAGE_TYPE } from '@/stores';
// lib
import classNames from 'classnames/bind';
import styles from '@/pages/Edit/Edit.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import editIcon from '@/assets/images/icons/edit.svg';

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
  const navigate = useNavigate();
  let url = window.location.href;
  const [isActive, setIsActive] = useState(1);
  const [tabName, setTagName] = useState('All');
  const [sortOption, setSortOption] = useState('Latest');

  // 현재 대시보드의 대상의 정보 (backgroundColor/backgroundImageURL/reactionCount)
  const { data, execute: getRecipientApi } = useAsync(
    () => api.get(`${ENDPOINT.RECIPIENTS}${id}/`),
    INITIAL_RECIPIENTS_TYPE
  );

  // 대시보드에 올린 총 메시지 (message.length/sender)
  const {
    data: { results },
    execute: getMessagesApi,
  } = useAsync(
    () =>
      api.get(`${ENDPOINT.RECIPIENTS}${id}/messages/`, {
        params: { limit: 100 },
      }),
    INITIAL_MESSAGE_TYPE
  );

  const backgroundUrl = data?.backgroundImageURL;
  const backgroundColor = data?.backgroundColor;

  const handleActiveTabClick = (tabId, tabName) => {
    setIsActive(tabId);
    setTagName(tabName);
  };

  const handleRemovePage = async () => {
    try {
      const res = await api.delete(`${ENDPOINT.RECIPIENTS}${id}/`);

      if (!res.status) return console.error('[SERVER ERROR]', res);

      await getMessagesApi();
      navigate(`/list/`, { replace: true });
    } catch (e) {
      console.error('[API ERROR]', e);
    }
  };

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('URL이 복사되었습니다.');
    } catch (e) {
      console.error('[LINK COPY ERROR]', e);
    }
  };

  const handleValueChange = (e) => {
    const { value } = e.currentTarget;
    const selectedValue = value || e.currentTarget.getAttribute('value');
    setSortOption(selectedValue);
  };

  return (
    <div className={cx('edit')}>
      <Helmet>
        <title> {`롤링 페이퍼 편집하기 | Rolling`}</title>
      </Helmet>

      <Header isEdit={true} />
      <ToastContainer
        position='top-center'
        limit={1}
        closeButton={false}
        autoClose={5000}
        pauseOnHover={false}
        theme='dark'
      />
      <main className={cx('content-wrapper')}>
        <ul>
          <li className={cx('md-hidden')}>
            <aside className={cx('sidebar')}>
              <div className={cx('sidebar-content')}>
                <div className={cx('sidebar-header')}>
                  <div className={cx('sidebar-nav')}>
                    <h2 className={cx('sidebar-title')}>{data.name}</h2>
                    <Link to={`/post/${id}/`}>
                      <Button variant='primary' size={42}>
                        <img src={editIcon} alt='편집하기 버튼' />
                      </Button>
                    </Link>
                  </div>
                  <Count id={id} countData={data} messageData={results} />
                </div>
                <Emoji
                  id={id}
                  getEmojiApi={getRecipientApi}
                  getReactionCount={data.reactionCount}
                  isDesktopHide={false}
                />
                <MemberList messageData={results} />
              </div>
              <Banner />
            </aside>
          </li>
          <li className={cx('md-only')}>
            <aside className={cx('sidebar')}>
              <div className={cx('sidebar-content')}>
                <h2 className={cx('sidebar-title')}>{data.name}</h2>
                <div className={cx('sidebar-info')}>
                  <Emoji
                    id={id}
                    getEmojiApi={getRecipientApi}
                    getReactionCount={data.reactionCount}
                    isDesktopHide={true}
                  />
                </div>
              </div>
            </aside>
          </li>
        </ul>
        <ul>
          <li className={cx('sm-hidden')}>
            <div className={cx('content')}>
              <div className={cx('container')}>
                <div className={cx('content-header')}>
                  <div className={cx('content-header-title')}>
                    <h3>Rolling Paper</h3>
                    <Button
                      variant='outlined'
                      size={40}
                      isDelete={true}
                      onClick={handleRemovePage}
                    >
                      Delete
                    </Button>
                  </div>
                  <div className={cx('content-header-filter')}>
                    <ul className={cx('tab-list')}>
                      {SENDER_TAB_LIST.map((item) => (
                        <li
                          key={item.id}
                          onClick={() =>
                            handleActiveTabClick(item.id, item.option)
                          }
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
                        size='sm'
                        onClick={handleValueChange}
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
                <GridLayout
                  id={id}
                  tabName={tabName}
                  sortOption={sortOption}
                  backgroundUrl={backgroundUrl}
                  backgroundColor={backgroundColor}
                  getMessagesApi={getMessagesApi}
                  messageData={results}
                />
              </div>
            </div>
          </li>
          <li className={cx('sm-only')}>
            <div className={cx('content')}>
              <div className={cx('container')}>
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
                <main className={cx('content-main')}>
                  <div className={cx('content-main-inner')}>
                    <div className={cx('content-header')}>
                      <div className={cx('content-header-title')}>
                        <h3>Rolling Paper</h3>
                        <div className={cx('content-header-option')}>
                          <Button
                            variant='outlined'
                            size={40}
                            isDelete={true}
                            onClick={handleRemovePage}
                          >
                            Delete
                          </Button>

                          <div className={cx('content-header-options')}>
                            <Dropdown
                              sortList={SORT_LIST}
                              size='sm'
                              onClick={handleValueChange}
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
                    </div>
                    <GridLayout
                      id={id}
                      tabName={tabName}
                      sortOption={sortOption}
                      backgroundUrl={backgroundUrl}
                      backgroundColor={backgroundColor}
                      getMessagesApi={getMessagesApi}
                      messageData={results}
                    />
                  </div>
                </main>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
};
