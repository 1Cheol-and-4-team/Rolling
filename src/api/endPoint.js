export const BASE_URL = 'https://rolling-api.vercel.app';
export const TEAM_NUM = '1-5';

export const ENDPOINT = {
  BACKGROUND_IMGS: {
    // 배경 이미지
    GET: '/background-images/',
  },
  PROFILE_IMGS: {
    // 프로필 이미지
    GET: '/profile-images/',
  },
  MESSAGES: {
    // id의 메세지 객체 삭제
    DELETE: (path) => `/${TEAM_NUM}/messages/${path}/`,
  },
  RECIPIENTS: {
    //  리스트에서 조회
    GET: `/${TEAM_NUM}/recipients/`,
    POST: `/${TEAM_NUM}/recipients/`,
  },
  RECIPIENTS_ID: {
    // 아이디 객체 편지
    GET: (path) => `/${TEAM_NUM}/recipients/${path}/`,
    DELETE: (path) => `/${TEAM_NUM}/recipients/${path}/`,
  },
  RECIPIENTS_MESSAGES: {
    // 대상에게 남기는 메세지
    GET: (path) => `/${TEAM_NUM}/recipients/${path}/messages/`,
    POST: (path) => `/${TEAM_NUM}/recipients/${path}/messages/`,
  },
  RECIPIENTS_REACTIONS: {
    //  이모지 데이터.
    GET: (path) => `/${TEAM_NUM}/recipients/${path}/reactions/`,
    POST: (path) => `/${TEAM_NUM}/recipients/${path}/reactions/`,
  },
};
