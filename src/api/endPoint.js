export const BASE_URL = 'https://rolling-api.vercel.app';
export const TEAM_NUM = '2-4';

export const ENDPOINT = {
  RECIPIENTS: {
    // 새로운 대상객체 생성
    //  리스트에서 조회 시 사용
    GET: `/${TEAM_NUM}/recipients/`,
    POST: `/${TEAM_NUM}/recipients/`,
  },
  RECIPIENTS_REACTIONS: {
    //  이모지 데이터.
    GET: (path) => `/${TEAM_NUM}/recipients/${path}/reactions/`,
    POST: (path) => `/${TEAM_NUM}/recipients/${path}/reactions/`,
  },
};
