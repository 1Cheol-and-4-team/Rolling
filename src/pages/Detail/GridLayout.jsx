import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '@/pages/Detail/Detail.module.scss';

import { EmptyCard } from '@/components/common/Empty';
import { Card } from '@/components/common/Card';

import { relationshipToKorean } from '@/utils';
import { IMPORT_IMAGES } from '@/stores';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '@/components/common/Skeleton/skeleton.css';

const cx = classNames.bind(styles);
const { EMPTY_CARD } = IMPORT_IMAGES;

export const GridLayout = ({
  isEdit,
  tabName,
  sortOption,
  backgroundUrl,
  backgroundColor,
  getMessagesApi,
  messageData,
}) => {
  const isRollingPaperEmpty = messageData.every((item) => item.id === null);
  const koreanTagName = relationshipToKorean(tabName);

  const filterData = (extractTagName) => {
    return extractTagName === 1
      ? messageData
      : messageData.filter((item) => item.relationship === extractTagName);
  };

  const filterResult = filterData(koreanTagName);

  const sortData = (sortOption) => {
    return sortOption === 'Latest'
      ? filterResult.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      : filterResult.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
  }, 5000);

  return (
    <>
      {isRollingPaperEmpty ? (
        <ul className={cx('grid-layout')}>
          <EmptyCard
            importImg={EMPTY_CARD}
            message={'Rolling paper not found'}
          />
        </ul>
      ) : (
        <ul className={cx('grid-layout')}>
          {sortData(sortOption).map((item) => (
            <li key={item.id}>
              {isEdit ? (
                <Card
                  id={item.id}
                  relationship={item.relationship}
                  sender={item.sender}
                  profileImageURL={item.profileImageURL}
                  backgroundUrl={backgroundUrl}
                  backgroundColor={backgroundColor}
                  content={item.content}
                  createdAt={item.createdAt}
                  isDelete={true}
                  getMessageApi={getMessagesApi}
                />
              ) : (
                <Card
                  id={item.id}
                  relationship={item.relationship}
                  sender={item.sender}
                  profileImageURL={item.profileImageURL}
                  backgroundUrl={backgroundUrl}
                  backgroundColor={backgroundColor}
                  content={item.content}
                  createdAt={item.createdAt}
                  getMessageApi={getMessagesApi}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
