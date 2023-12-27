const KEY = '4deef89457def8aaefff3d4e06c5dbcd';

export const shareKakaoLink = (url, image) => {
  if (window.Kakao) {
    const kakao = window.Kakao;

    if (!kakao.isInitialized()) {
      kakao.init(KEY);
    }

    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `롤링 페이퍼 `,
        description: `지금 바로 편지를 보내보세요`,
        imageUrl: image,
        link: {
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            webUrl: url,
          },
        },
      ],
    });
  }
};
