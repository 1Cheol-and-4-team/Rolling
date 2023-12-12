export const colorChips = [
  { id: 1, color: 'orange' },
  { id: 2, color: 'purple' },
  { id: 3, color: 'blue' },
  { id: 4, color: 'green' },
];

export const relationshipToEnglish = (relationship) => {
  if (relationship === '지인') return 'acquaintance';
  else if (relationship === '동료') return 'colleague';
  else if (relationship === '가족') return 'family';
  else if (relationship === '친구') return 'friend';
};

export const fontToEnglish = (font) => {
  if (font === 'Noto Sans') return 'NotoSans';
  else if (font === 'Pretendard') return 'Pretendard';
  else if (font === '나눔명조') return 'NanumMyeongjo';
  else if (font === '나눔손글씨 손편지체') return 'NanumPenScript';
};

export const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};
