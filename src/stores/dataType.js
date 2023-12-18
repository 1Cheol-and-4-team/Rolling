export const INITIAL_RECIPIENTS_TYPE = {
  id: null,
  name: '',
  backgroundColor: '',
  backgroundImageURL: null,
  createdAt: '',
  messageCount: null,
  recentMessages: [],
  reactionCount: null,
  topReactions: [],
};

export const INITIAL_MESSAGE_TYPE = {
  count: null,
  next: null,
  previous: null,
  results: [
    {
      id: null,
      recipientId: null,
      sender: '',
      profileImageURL: null,
      relationship: '',
      content: '',
      font: '',
      createdAt: '',
    },
  ],
};

export const INITIAL_EMOJI_TYPE = {
  count: null,
  next: null,
  previous: null,
  results: [
    {
      id: null,
      emoji: '',
      count: null,
    },
  ],
};
