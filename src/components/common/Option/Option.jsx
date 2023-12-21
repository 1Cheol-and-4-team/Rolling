import React, { useState } from 'react';
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
