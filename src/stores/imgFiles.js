import logo from '@/assets/images/icons/logo-dark.svg';
import empty from '@/assets/images/icons/ic-emoji-empty.svg';
import emptyCard from '@/assets/images/icons/ic-empty-paper.svg';
import editIcon from '@/assets/images/icons/edit.svg';
import banner01 from '@/assets/images/point1-img.svg';
import banner02 from '@/assets/images/point2-img.svg';
import checkIcon from '@/assets/images/icons/ic-check.svg';
import deleteIcon from '@/assets/images/icons/ic-delete.svg';
import symbolPurple from '@/assets/images/icons/logo-symbol.svg';
import symbolWhite from '@/assets/images/icons/logo-symbol-white.svg';
import search from '@/assets/images/icons/ic-search.svg';
import more from '@/assets/images/icons/ic-arrow-reaction.svg';
import clap from '@/assets/images/img-hand.png';
import goBackIcon from '@/assets/images/goto-mobile.svg';

export const IMPORT_IMAGES = {
  ROLLING_LOGO: {
    URL: logo,
    ALT: '롤링 로고 이미지',
  },
  GO_BACK: {
    URL: goBackIcon,
    ALT: '모바일 뒤로가기 아이콘',
  },
  EMPTY: {
    URL: empty,
    ALT: '컨텐츠 없음',
  },
  EMPTY_CARD: {
    URL: emptyCard,
    ALT: '롤링 페이퍼 없음',
  },
  EDIT: {
    URL: editIcon,
    ALT: '수정하기 버튼',
  },
  LANDING_CONTENT: {
    banner01: {
      url: banner01,
      alt: '랜딩페이지 배너 이미지 1',
    },
    banner02: {
      url: banner02,
      alt: '랜딩페이지 배너 이미지 2',
    },
  },
  CONFRIM_MODAL: {
    CHECK: {
      URL: checkIcon,
    },
    DELETE: {
      URL: deleteIcon,
    },
  },
  INVITE_BANNER: {
    LOGO_SYMBOL: {
      URL: symbolPurple,
      ALT: '로고 심볼 아이콘',
    },
    CLAP: {
      URL: clap,
      ALT: '하이파이브 이미지',
    },
  },
  CARD_LIST: {
    LOGO_SYMBOL: {
      URL: symbolWhite,
      ALT: '로고 심볼 아이콘',
    },
    SEARCH: {
      URL: search,
      ALT: '검색 아이콘',
    },
    MORE: {
      URL: more,
      ALT: '리액션 추가하러 가기 아이콘',
    },
  },
};

export const BACKGROUND_IMGURL = [
  {
    id: 1,
    name: 'kirby',
    imgUrl: 'https://i.ibb.co/JpsL4hp/kirby.jpg',
  },
  {
    id: 2,
    name: 'kitty',
    imgUrl: 'https://i.ibb.co/3pJ5pD6/kitty.jpg',
  },
  {
    id: 3,
    name: 'quokka',
    imgUrl: 'https://i.ibb.co/GdLKjSF/quokka.jpg',
  },
  {
    id: 4,
    name: 'shinjang',
    imgUrl: 'https://i.ibb.co/NCrmsXr/shinjangoo.jpg',
  },
];

export const PROFILE_EMOJI = [
  {
    id: 1,
    alt: '프로필 이미지 희수',
    imgUrl: 'https://i.ibb.co/9Z9v71p/3.png',
  },
  {
    id: 2,
    alt: '프로필 이미지 진욱',
    imgUrl: 'https://i.ibb.co/cY3Jn0k/Kakao-Talk-20231215-144354549.png',
  },
  {
    id: 3,
    alt: '프로필 이미지 소은',
    imgUrl: 'https://i.ibb.co/4gcxT2d/Kakao-Talk-20231215-142223529.png',
  },
  {
    id: 4,
    alt: '프로필 이미지 하은',
    imgUrl: 'https://i.ibb.co/R4M053d/Kakao-Talk-20231221-201105119.png',
  },
  {
    id: 5,
    alt: '프로필 이미지 멘토님',
    imgUrl: 'https://i.ibb.co/4ZMv1LF/9.png',
  },
  {
    id: 6,
    alt: '프로필 이미지 강아지',
    imgUrl: 'https://i.ibb.co/jGv9Pdb/7.png',
  },
  {
    id: 7,
    alt: '프로필 이미지 소',
    imgUrl: 'https://i.ibb.co/RDz8Trb/5.png',
  },
  {
    id: 8,
    alt: '프로필 이미지 쥐',
    imgUrl: 'https://i.ibb.co/QMQRyyK/4.png',
  },
  {
    id: 9,
    alt: '프로필 이미지 로봇',
    imgUrl: 'https://i.ibb.co/Nsh0w4H/6.png',
  },
];
