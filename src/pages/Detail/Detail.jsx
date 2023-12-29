import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';

import classNames from 'classnames/bind';
import styles from '@/pages/Detail/Detail.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from '@/components/common/Header';
import { Banner, Count, Emoji, MemberList } from '@/components/common/SideBar';
import { GridLayout } from '@/pages/Detail/GridLayout';

import { Dropdown } from '@/components/common/Dropdown';
import { Share } from '@/components/Share';
import { Overlay, MyModal } from '@/components/common/Modal';
import {
  Button,
  MixButton,
  LinkButton,
  EditButton,
} from '@/components/common/Button';

import {
  INITIAL_RECIPIENTS_TYPE,
  INITIAL_MESSAGE_TYPE,
  SORT_LIST,
  SENDER_TAB_LIST,
  IMPORT_IMAGES,
} from '@/stores';

const cx = classNames.bind(styles);
const { EDIT, CONFRIM_MODAL } = IMPORT_IMAGES;

export const Detail = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  let url = window.location.href;

  const [tabName, setTagName] = useState('All');
  const [sortOption, setSortOption] = useState('Latest');
  const [isActive, setIsActive] = useState(1);
  const [isModal, setIsModal] = useState(false);

  // Get Recipients Info (backgroundColor/backgroundImageURL/reactionCount)
  const { data: recipientData, execute: getRecipientApi } = useAsync(
    () => api.get(`${ENDPOINT.RECIPIENTS}${id}/`),
    INITIAL_RECIPIENTS_TYPE
  );

  // Get Messages Info (message.length/sender)
  const {
    data: { results: messageData },
    execute: getMessagesApi,
  } = useAsync(
    () =>
      api.get(`${ENDPOINT.RECIPIENTS}${id}/messages/`, {
        params: { limit: 100 },
      }),
    INITIAL_MESSAGE_TYPE
  );

  const backgroundUrl = recipientData?.backgroundImageURL;
  const backgroundColor = recipientData?.backgroundColor;

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

  const handleValueChange = (e) => {
    const { value } = e.currentTarget;
    const selectedValue = value || e.currentTarget.getAttribute('value');
    setSortOption(selectedValue);
  };

  const handleModalOpen = () => {
    setIsModal(true);
  };

  const handleModalClose = () => {
    setIsModal(false);
  };

  const userName = recipientData.name;

  return (
    <div className={cx('detail')}>
      <Helmet>
        {isEdit ? (
          <title> {`롤링 페이퍼 편집하기 | Rolling`}</title>
        ) : (
          <title> {`${userName}님 롤링 페이퍼 | Rolling`}</title>
        )}
      </Helmet>

      {isEdit ? (
        <Header isEdit={true} id={id} />
      ) : (
        <Header isDetail={true} id={id} />
      )}

      <main className={cx('content-wrapper')}>
        <ul>
          <li className={cx('md-hidden')}>
            <aside className={cx('sidebar')}>
              <div className={cx('sidebar-content')}>
                <div className={cx('sidebar-header')}>
                  <div className={cx('sidebar-nav')}>
                    <h2 className={cx('sidebar-title')}>
                      {recipientData.name}
                    </h2>
                    {isEdit ? (
                      <LinkButton path={`/post/${id}`}>
                        <EditButton
                          src={EDIT.URL}
                          alt={EDIT.ALT}
                          active={true}
                        />
                      </LinkButton>
                    ) : (
                      <LinkButton path={`/post/${id}/edit`}>
                        <EditButton src={EDIT.URL} alt={EDIT.ALT} />
                      </LinkButton>
                    )}
                  </div>
                  <Count
                    id={id}
                    recipientData={recipientData}
                    messageData={messageData}
                  />
                </div>
                <Emoji
                  id={id}
                  getRecipientApi={getRecipientApi}
                  getReactionCount={recipientData.reactionCount}
                  isDesktopHide={false}
                />
                <MemberList messageData={messageData} />
              </div>
              <Banner />
            </aside>
          </li>
          <li className={cx('md-only')}>
            <aside className={cx('sidebar')}>
              <div className={cx('sidebar-content')}>
                <h2 className={cx('sidebar-title')}>{recipientData.name}</h2>
                <div className={cx('sidebar-info')}>
                  <Emoji
                    id={id}
                    getRecipientApi={getRecipientApi}
                    getReactionCount={recipientData.reactionCount}
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
                    {isEdit ? (
                      <Button
                        variant='outlined'
                        size={40}
                        isDelete={true}
                        onClick={handleModalOpen}
                      >
                        Delete
                      </Button>
                    ) : (
                      <LinkButton path={`/post/${id}/message`}>
                        <MixButton
                          variant='outlined'
                          size={40}
                          startIcon='ic-plus'
                          iconSize={12}
                          iconColor='white'
                          text='Add'
                        />
                      </LinkButton>
                    )}
                  </div>
                  <div className={cx('content-header-filter')}>
                    <ul className={cx('tab-list')}>
                      {SENDER_TAB_LIST.map((item) => (
                        <li
                          key={item.id}
                          onClick={() =>
                            handleActiveTabClick(item.id, item.option)
                          }
                          className={cx('tab-list-item', {
                            'tab-active': isActive === item.id,
                          })}
                        >
                          <button>{item.option}</button>
                        </li>
                      ))}
                    </ul>
                    <div className={cx('content-header-options')}>
                      {isEdit ? (
                        <Dropdown
                          sortList={SORT_LIST}
                          size='sm'
                          onClick={handleValueChange}
                        />
                      ) : (
                        <>
                          <Dropdown
                            sortList={SORT_LIST}
                            size='sm'
                            onClick={handleValueChange}
                          />
                          <Share url={url} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <GridLayout
                  isEdit={isEdit}
                  id={id}
                  tabName={tabName}
                  sortOption={sortOption}
                  backgroundUrl={backgroundUrl}
                  backgroundColor={backgroundColor}
                  getMessagesApi={getMessagesApi}
                  messageData={messageData}
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
                      className={cx('tab-list-item', {
                        'tab-active': isActive === item.id,
                      })}
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
                          {isEdit ? (
                            <Button
                              variant='outlined'
                              size={40}
                              isDelete={true}
                              onClick={handleModalOpen}
                            >
                              Delete
                            </Button>
                          ) : (
                            <LinkButton path={`/post/${id}/message`}>
                              <MixButton
                                variant='outlined'
                                size={40}
                                startIcon='ic-plus'
                                iconSize={12}
                                iconColor='white'
                                text='Add'
                              />
                            </LinkButton>
                          )}
                          <div className={cx('content-header-options')}>
                            {isEdit ? (
                              <Dropdown
                                sortList={SORT_LIST}
                                size='sm'
                                onClick={handleValueChange}
                              />
                            ) : (
                              <>
                                <Dropdown
                                  sortList={SORT_LIST}
                                  size='sm'
                                  onClick={handleValueChange}
                                />
                                <Share url={url} />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <GridLayout
                      isEdit={isEdit}
                      id={id}
                      tabName={tabName}
                      sortOption={sortOption}
                      backgroundUrl={backgroundUrl}
                      backgroundColor={backgroundColor}
                      getMessagesApi={getMessagesApi}
                      messageData={messageData}
                    />
                  </div>
                </main>
              </div>
            </div>
          </li>
        </ul>

        {isModal && (
          <Overlay>
            <MyModal
              title='페이지를 삭제하시겠습니까?'
              desc='삭제한 페이지는 복구할 수 없습니다.'
              iconUrl={CONFRIM_MODAL.DELETE.URL}
              iconAlt={CONFRIM_MODAL.DELETE.ALT}
              handleModalClose={handleModalClose}
            >
              <div className={cx('dialog-confirm')}>
                <div className={cx('dialog-confirm-footer')}>
                  <Button
                    variant='secondary'
                    size={40}
                    onClick={handleModalClose}
                  >
                    취소
                  </Button>
                  <Button
                    variant='delete-fill'
                    size={40}
                    onClick={handleRemovePage}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            </MyModal>
          </Overlay>
        )}
      </main>
    </div>
  );
};
