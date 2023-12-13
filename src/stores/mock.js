export const response = {
  count: 5,
  next: 'https://rolling-api.vercel.app/2-4/recipients/?limit=3&offset=4&sort=like',
  previous: 'https://rolling-api.vercel.app/2-4/recipients/?limit=3&sort=like',
  results: [
    {
      id: 14,
      name: '이윤수',
      backgroundColor: 'purple',
      backgroundImageURL: null,
      createdAt: '2023-11-01T08:01:30.234149Z',
      messageCount: 0,
      recentMessages: [],
      reactionCount: 0,
      topReactions: [],
    },
    {
      id: 11,
      name: '손동욱',
      backgroundColor: 'purple',
      backgroundImageURL: null,
      createdAt: '2023-10-31T09:58:37.631384Z',
      messageCount: 6,
      recentMessages: [
        {
          id: 28,
          recipientId: 11,
          sender: 'test user2',
          profileImageURL:
            'https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8',
          relationship: '지인',
          content: '테스트 목적의 메세지3',
          font: '나눔명조',
          createdAt: '2023-10-31T09:58:47.272896Z',
        },
        {
          id: 27,
          recipientId: 11,
          sender: 'test user2',
          profileImageURL:
            'https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8',
          relationship: '지인',
          content: '테스트 목적의 메세지3',
          font: '나눔명조',
          createdAt: '2023-10-31T09:58:46.889479Z',
        },
        {
          id: 2,
          recipientId: 11,
          sender: 'test user2',
          profileImageURL:
            'https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8',
          relationship: '지인',
          content: '테스트 목적의 메세지3',
          font: '나눔명조',
          createdAt: '2023-10-31T09:58:46.889479Z',
        },
      ],
      reactionCount: 23,
      topReactions: [
        {
          id: 24,
          emoji: '😀',
          count: 15,
        },
        {
          id: 23,
          emoji: '🥹',
          count: 8,
        },
      ],
    },
  ],
};
