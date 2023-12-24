import React, { useState, useRef } from 'react';
import styles from './Option.module.scss';
import classNames from 'classnames/bind';
import { BACKGROUND_IMGURL } from '@/stores';
const cx = classNames.bind(styles);

export function Option({ onClick, setValues }) {
  const [selectedImg, setSelectedImg] = useState('');
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);
  const [uploadImg, setUploadImg] = useState('');
  const backgroundInputRef = useRef(null);

  const handleImgClick = (img) => {
    setSelectedImg(img);
  };

  const handleUploadBackgourndChange = async (e) => {
    setIsBackgroundLoading(true);

    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await fetch(
          'https://api.imgbb.com/1/upload?key=9b44d68d4291f77e1ddd2b63d2ce5b03',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.data.url;

          setIsBackgroundLoading(false);
          setUploadImg(imageUrl);
          setValues((prevValues) => ({
            ...prevValues,
            backgroundImageURL: imageUrl,
          }));
          setSelectedImg('');
        } else {
          setIsBackgroundLoading(false);
          throw new Error('이미지를 업로드하는 데 실패했습니다.');
        }
      } catch (e) {
        console.error('[API ERROR] NOT FOUND FETCH DATA', e);
      } finally {
        setIsBackgroundLoading(false);
      }
    } else {
      setIsBackgroundLoading(false);
    }
  };

  return (
    <ul className={cx('img-option')}>
      <li className={cx('img-option-chip', 'img-option-upload')}>
        <div
          className={cx('img-option-upload-wrapper')}
          onClick={() => {
            backgroundInputRef.current.click();
          }}
        >
          {isBackgroundLoading ? (
            <div className={cx('loadingio-spinner')}>
              <div className={cx('ldio')}>
                <div></div>
              </div>
            </div>
          ) : !uploadImg ? (
            <span>
              <i className={cx('ic-plus')}></i>
            </span>
          ) : (
            <button
              className={cx('img-option-chip')}
              style={{ backgroundImage: `url(${uploadImg})` }}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {!selectedImg && (
                <div className={cx('img-option-chip-select')}>
                  <span>
                    <i className={cx('ic-check')}></i>
                  </span>
                </div>
              )}
            </button>
          )}
        </div>
        <input
          type='file'
          accept='.jpg, .png, .jpeg,'
          name='profile_img'
          onChange={handleUploadBackgourndChange}
          ref={backgroundInputRef}
        />
      </li>
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
                <div className={cx('img-option-chip-select')}>
                  <span>
                    <i className={cx('ic-check')}></i>
                  </span>
                </div>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
