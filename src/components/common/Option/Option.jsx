import { useState, useRef } from 'react';

import styles from '@/components/common/Option/Option.module.scss';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import { BACKGROUND_IMGURL, IMGBB_URL } from '@/stores';

const cx = classNames.bind(styles);

export function Option({ onClick, setValues }) {
  const [selectedImg, setSelectedImg] = useState('');
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);
  const [backgroundList, setBackgroundList] = useState(BACKGROUND_IMGURL);

  const backgroundInputRef = useRef(null);

  const handleImgClick = (backgroundId) => {
    setSelectedImg(backgroundId);
  };

  const handleUploadBackgourndChange = async (e) => {
    setIsBackgroundLoading(true);

    const file = e.target.files[0];
    const fileId = uuidv4();

    if (!file) {
      setIsBackgroundLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(IMGBB_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.data.url;

        setIsBackgroundLoading(false);
        setValues((prevValues) => ({
          ...prevValues,
          backgroundImageURL: imageUrl,
        }));
        setBackgroundList([
          {
            id: fileId,
            alt: 'uploaded background',
            imgUrl: imageUrl,
          },
          ...backgroundList,
        ]);
        setSelectedImg(fileId);
      } else {
        setIsBackgroundLoading(false);
        throw new Error('이미지를 업로드하는 데 실패했습니다.');
      }
    } catch (e) {
      console.error('[API ERROR] NOT FOUND FETCH DATA', e);
    } finally {
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
          ) : (
            <span>
              <i className={cx('ic-plus')}></i>
            </span>
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
      {backgroundList.map((item) => {
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
              onClick={() => handleImgClick(item.id)}
              aria-label='이미지 옵션 버튼'
            >
              {selectedImg === item.id && (
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
