import shareKakao2 from '@/assets/images/icons/ic-share-kakao-active.svg';
import sharelink2 from '@/assets/images/icons/ic-share-link-active.svg';

export const COLOR_CHIPS = [
  { id: 1, option: 'green' },
  { id: 2, option: 'purple' },
  { id: 3, option: 'blue' },
  { id: 4, option: 'beige' },
];

export const SORT_LIST = [
  { id: 1, option: 'Latest' },
  { id: 2, option: 'Earliest' },
];

export const SENDER_TAB_LIST = [
  { id: 1, option: 'All' },
  { id: 2, option: 'Colleague' },
  { id: 3, option: 'Family' },
  { id: 4, option: 'Friend' },
  { id: 5, option: 'Soulmate' },
];

export const POST_TAB_LIST = [
  { id: 1, option: '컬러' },
  { id: 2, option: '이미지' },
];

export const RELATIONSHIP_LIST = [
  { id: 1, option: '동료' },
  { id: 2, option: '가족' },
  { id: 3, option: '친구' },
  { id: 4, option: '지인' },
];

export const SHARE_LIST = [
  {
    id: 1,
    option: 'kakao',
    url: shareKakao2,
    alt: '카카오톡 공유 아이콘',
  },
  {
    id: 2,
    option: 'link',
    url: sharelink2,
    alt: '링크 복사 아이콘',
  },
];
