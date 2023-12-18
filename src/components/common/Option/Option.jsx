import React, { useState } from 'react';
// import { imgChips } from '@/stores';
import styles from './Option.module.scss';
import classNames from 'classnames/bind';
import { BACKGROUND_IMGURL } from '@/stores';
const cx = classNames.bind(styles);

export function Option({ onClick }) {
  const [selectedImg, setSelectedImg] = useState(BACKGROUND_IMGURL[0]);

  const handleImgClick = (img) => {
    setSelectedImg(img);
  };

  return (
    <ul className={cx('img-option')}>
      {BACKGROUND_IMGURL.map((item) => {
        return (
          <li
            key={item.id}
            name='backgroundImageURL'
            value={item.imgUrl}
            onClick={(e) => onClick(e)}
          >
            <button
              style={{ backgroundImage: `url(${item.imgUrl})` }}
              className={cx('img-option-chip', `img-option-chip-${item.name}`)}
              onClick={() => handleImgClick(item)}
              aria-label='이미지 옵션 버튼'
            >
              {selectedImg === item && (
                <span>
                  <i className={cx('ic-check')}></i>
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
//background이미지를 배열로 받아와서 map함수로 펼쳐줘야해서 style속성을 사용했습니다. 혹시 문제시 알려주세요!(이 방법이 맞는지는 모르겠어요.)
