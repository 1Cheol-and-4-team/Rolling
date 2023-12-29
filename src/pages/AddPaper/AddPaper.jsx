import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { api, ENDPOINT } from '@/api';
import { useMutateAsync } from '@/hooks';
import {
  INITIAL_POST_MESSAGE_TYPE,
  INITIAL_POST_MESSAGE_ERROR,
} from '@/stores';

import { Helmet } from 'react-helmet';
import styles from './AddPaper.module.scss';
import classNames from 'classnames/bind';
import ReactQuill from 'react-quill';
import { QuillToolbar, modules } from '@/components/QuillToolbar';
import 'react-quill/dist/quill.snow.css';

import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import { Dropdown } from '@/components/common/Dropdown';
import { Button, LinkButton } from '@/components/common/Button';

import { PROFILE_EMOJI, RELATIONSHIP_LIST, IMPORT_IMAGES } from '@/stores';
import { getRandomColor } from '@/utils';

const cx = classNames.bind(styles);

export function AddPaper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const profileRef = useRef(null);
  const quillRef = useRef(null);
  const profileInputRef = useRef(null);
  const uploadCount = useRef(0);

  const [values, setValues] = useState(INITIAL_POST_MESSAGE_TYPE);
  const [isError, setIsError] = useState(INITIAL_POST_MESSAGE_ERROR);
  const [randomColor, setRandomColor] = useState('#24262B');
  const [currentProfile, setCurrentProfile] = useState(0);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const postApi = () =>
    api.post(`${ENDPOINT.RECIPIENTS}${id}/messages/`, values);
  const { execute: postMessagesApi } = useMutateAsync(
    postApi,
    INITIAL_POST_MESSAGE_TYPE
  );

  const handleValueChange = (e) => {
    e.preventDefault();

    const { value } = e.currentTarget;
    const name = e.currentTarget.getAttribute('name');
    const selectedValue = value || e.currentTarget.getAttribute('value');

    setValues((prevValues) => ({ ...prevValues, [name]: selectedValue }));
    setIsError((prevValues) => ({
      ...prevValues,
      [name]: !selectedValue ? true : false,
    }));
  };

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

  const handleUploadProfileChange = async (e) => {
    setIsProfileLoading(true);
    setCurrentProfile(0);
    setRandomColor('#24262B');

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
    } else {
      setIsProfileLoading(false);
    }

    setIsError((prevValues) => ({
      ...prevValues,
      profileImageURL: !(file || values.profileImageURL) ? true : false,
    }));
  };

  const handleQuillChange = (content) => {
    setValues((prevValues) => ({
      ...prevValues,
      content: content,
    }));
    setIsError((prevValues) => ({
      ...prevValues,
      content: !content ? true : false,
    }));
  };

  const handleValueValid = (name) => {
    if (name === 'submit') {
      setIsError((prevValues) => ({
        ...prevValues,
        sender: !values.sender ? true : false,
        profileImageURL: !values.profileImageURL ? true : false,
        content: !values.content ? true : false,
      }));
    } else {
      setIsError((prevValues) => ({
        ...prevValues,
        [name]: !values[name] ? true : false,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValueValid('submit');

    if (Object.values(values).some((value) => value === '')) {
      !values.content && quillRef.current.focus();
      !values.profileImageURL && profileRef.current.focus();
      !values.sender && inputRef.current.focus();
      return;
    } else {
      await postMessagesApi();
      navigate(`/post/${id}/`, { replace: true });
    }
  };

  return (
    <>
      <Helmet>
        <title>메세지 작성하기 | Rolling </title>
      </Helmet>
      <div className={cx('header')}>
        <Header />
      </div>
      <div className={cx('ic-arrow-left')}>
        <LinkButton path={-1}>
          <img
            src={IMPORT_IMAGES.MOBILE_BACK.URL}
            alt={IMPORT_IMAGES.MOBILE_BACK.ALT}
          />
        </LinkButton>
      </div>
      <form className={cx('add-paper')}>
        <div className={cx('add-paper-wrapper')}>
          <fieldset
            className={cx('add-paper-sender', {
              'add-paper-sender-error': isError.sender,
            })}
          >
            <div className={cx('add-paper-sender-title')}>
              <label>From.</label>
              <p>입력하지 않으면 전달할 수 없어요!</p>
            </div>
            <Input
              ref={inputRef}
              placeholder='이름을 입력해 주세요.'
              name='sender'
              state={isError.sender && 'error'}
              onChange={handleValueChange}
              onBlur={() => handleValueValid('sender')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
          </fieldset>
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
                  <img
                    src={IMPORT_IMAGES.PROFILE.URL}
                    alt={IMPORT_IMAGES.PROFILE.ALT}
                  />
                ) : (
                  <img
                    src={values.profileImageURL}
                    alt='선택한 프로필 이미지'
                  />
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
                        <img src={item.imgUrl} alt={item.alt} />
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
          <fieldset className={cx('add-paper-relationship')}>
            <label>상대와의 관계</label>
            <Dropdown
              sortList={RELATIONSHIP_LIST}
              size='lg'
              onClick={(e) => {
                handleValueChange(e);
                handleValueValid('profileImageURL');
              }}
            />
          </fieldset>
          <fieldset
            className={cx('add-paper-quill', {
              'add-paper-quill-error': isError.content,
            })}
          >
            <div className={cx('add-paper-quill-title')}>
              <label>마음을 전달해 주세요</label>
              <p>내용을 입력해 주세요!</p>
            </div>
            <div
              className={
                'add-paper-quill-content' +
                (isError.content ? ' add-paper-quill-content-error' : '')
              }
            >
              <QuillToolbar />
              <ReactQuill
                className={cx('add-paper-quill-content')}
                theme='snow'
                ref={quillRef}
                value={values.content}
                onChange={handleQuillChange}
                onBlur={() => handleValueValid('content')}
                modules={{ toolbar: modules.toolbar }}
              />
            </div>
          </fieldset>
          <div className={cx('add-paper-button')}>
            <Button
              variant='primary'
              size={56}
              type='submit'
              name='submit'
              onClick={handleSubmit}
            >
              생성하기
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
