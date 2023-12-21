import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';
import { INITIAL_MESSAGE_TYPE } from '@/stores';
// lib
import classNames from 'classnames/bind';
import styles from '@/pages/Detail/Detail.module.scss';
// component
import { EmptyCard } from '@/components/common/Empty';
import { Card } from '@/components/common/Card';
import { relationshipToKorean } from '@/utils';
import { IMPORT_IMAGES } from '@/stores';

const cx = classNames.bind(styles);
const { EMPTY_CARD } = IMPORT_IMAGES;

export const GridLayout = ({
  id,
  tabName,
  sortOption,
  backgroundUrl,
  backgroundColor,
  getMessagesApi,
}) => {
  const {
    data: { results },
  } = useAsync(
    () =>
      api.get(`${ENDPOINT.RECIPIENTS}${id}/messages/`, {
        params: { limit: 100 },
      }),
    INITIAL_MESSAGE_TYPE
  );

  const isRollingPaperEmpty = results.every((item) => item.id === null);
  const koreanTagName = relationshipToKorean(tabName);

  const filterData = (extractTagName) => {
    return extractTagName === 1
      ? results
      : results.filter((item) => item.relationship === extractTagName);
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
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
