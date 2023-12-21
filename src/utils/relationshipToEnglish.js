export const relationshipToEnglish = (relationship) => {
  if (relationship === '지인') return 'Friend';
  if (relationship === '동료') return 'Colleague';
  if (relationship === '가족') return 'Family';
  if (relationship === '친구') return 'Soulmate';
};

export const relationshipToKorean = (relationship) => {
  if (relationship == 'All') return 1;
  if (relationship == 'Friend') return '지인';
  if (relationship == 'Colleague') return '동료';
  if (relationship == 'Family') return '가족';
  if (relationship == 'Soulmate') return '친구';
};
