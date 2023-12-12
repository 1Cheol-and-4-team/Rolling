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
