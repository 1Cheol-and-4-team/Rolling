import { useState, useRef, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from '@/components/Profile/Profile.module.scss';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '@/components/common/Skeleton/skeleton.css';

import { PROFILE_EMOJI, IMPORT_IMAGES, IMGBB_URL } from '@/stores';
import { getRandomColor } from '@/utils';

const cx = classNames.bind(styles);

export function Profile({
  values,
  setValues,
  isError,
  setIsError,
  profileRef,
}) {
  const profileInputRef = useRef(null);
  const uploadCount = useRef(0);

  const [randomColor, setRandomColor] = useState('#24262B');
  const [currentProfile, setCurrentProfile] = useState(0);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(loadingTimer);
  }, []);

  const handleProfileChange = (e, profileId) => {
    e.preventDefault();
    setCurrentProfile(profileId);
    const selectedValue = e.currentTarget.getAttribute('value');

    const pickColor = getRandomColor();
    setRandomColor(pickColor);

    setValues((prevValues) => ({
      ...prevValues,
      profileImageURL: `${selectedValue}?color=${pickColor}`,
    }));
    setIsError((prevValues) => ({
      ...prevValues,
      profileImageURL: !selectedValue ? true : false,
    }));
  };

  //업로드한 이미지 파일의 url 생성 후 현재 이미지로 선택
  const handleUploadProfileChange = async (e) => {
    setIsProfileLoading(true);
    setCurrentProfile(0);
    setRandomColor('#24262B');

    const file = e.target.files[0];

    if (!file) {
      setIsProfileLoading(false);
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

        setIsProfileLoading(false);
        setValues((prevValues) => ({
          ...prevValues,
          profileImageURL: imageUrl,
        }));
        PROFILE_EMOJI.unshift({
          id: `upload-${uploadCount.current++}`,
          name: `upload-${uploadCount.current}`,
          imgUrl: imageUrl,
        });
        setCurrentProfile(PROFILE_EMOJI[0].id);
      } else {
        setIsProfileLoading(false);
        throw new Error('이미지를 업로드하는 데 실패했습니다.');
      }
    } catch (e) {
      console.error('[API ERROR] NOT FOUND FETCH DATA', e);
    } finally {
      setIsProfileLoading(false);
    }

    setIsError((prevValues) => ({
      ...prevValues,
      profileImageURL: !(file || values.profileImageURL) ? true : false,
    }));
  };

  return (
    <fieldset
      className={cx('add-paper-profile', {
        'add-paper-profile-error': isError.profileImageURL,
      })}
    >
      <label>프로필 이미지</label>
      <div className={cx('add-paper-profile-img')}>
        <div
          className={cx('add-paper-profile-img-wrapper')}
          style={{ '--color': randomColor }}
        >
          {!values.profileImageURL ? (
            isLoading ? (
              <Skeleton
                width={'9rem'}
                height={'9rem'}
                className={cx('add-paper-profile-img-wrapper')}
              />
            ) : (
              <img
                src={IMPORT_IMAGES.PROFILE.URL}
                alt={IMPORT_IMAGES.PROFILE.ALT}
              />
            )
          ) : (
            <img src={values.profileImageURL} alt='선택한 프로필 이미지' />
          )}
        </div>
        <div className={cx('add-paper-profile-img-select')}>
          <p>프로필 이미지를 선택해주세요!</p>
          <ul>
            <li>
              <div
                className={cx('add-paper-profile-img-select-wrapper')}
                onClick={() => {
                  profileInputRef.current.click();
                }}
              >
                {isProfileLoading ? (
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
                onChange={handleUploadProfileChange}
                ref={profileInputRef}
              />
            </li>
            {PROFILE_EMOJI.map((item) => (
              <li key={item.id}>
                <button
                  ref={profileRef}
                  value={item.imgUrl}
                  onClick={(e) => handleProfileChange(e, item.id)}
                >
                  {isLoading ? (
                    <Skeleton width={'100%'} height={'100%'} />
                  ) : (
                    <img src={item.imgUrl} alt={item.alt} />
                  )}
                </button>
                <div
                  className={cx('gradient-box', {
                    selected: currentProfile === item.id,
                  })}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </fieldset>
  );
}
