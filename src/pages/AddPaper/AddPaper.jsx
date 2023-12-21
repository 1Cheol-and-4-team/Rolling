import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import styles from './AddPaper.module.scss';
import classNames from 'classnames/bind';
import ReactQuill from 'react-quill';
import { QuillToolbar, modules } from '@/components/QuillToolbar';
import 'react-quill/dist/quill.snow.css';

import { api, ENDPOINT } from '@/api';
import { useMutateAsync } from '@/hooks';

import { Header } from '@/Components/common/Header';
import { Input } from '@/components/common/Input';
import { Dropdown } from '@/components/common/Dropdown';
import { Button } from '@/components/common/Button';
import { PROFILE_EMOJI, RELATIONSHIP_LIST } from '@/stores';
import { getRandomColor } from '@/utils';
import defaultProfile from '@/assets/images/default-profile.svg';

import {
  INITIAL_POST_MESSAGE_TYPE,
  INITIAL_POST_MESSAGE_ERROR,
} from '../../stores/dataType';

const cx = classNames.bind(styles);

export function AddPaper() {
  const { id } = useParams();
  const inputRef = useRef(null);
  const profileRef = useRef(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_POST_MESSAGE_TYPE);
  const [error, setError] = useState(INITIAL_POST_MESSAGE_ERROR);
  const [randomColor, setRandomColor] = useState('#000000');

  const postApi = () =>
    api.post(`${ENDPOINT.RECIPIENTS}${id}/messages/`, values);
  const { execute } = useMutateAsync(postApi, INITIAL_POST_MESSAGE_TYPE);

  const handleValueChange = (e) => {
    e.preventDefault();

    const { value } = e.currentTarget;
    const name = e.currentTarget.getAttribute('name');
    const selectedValue = value || e.currentTarget.getAttribute('value');

    setValues((prevValues) => ({ ...prevValues, [name]: selectedValue }));
    setError((prevValues) => ({
      ...prevValues,
      [name]: !selectedValue ? 'error' : '',
    }));
  };

  const handleQuillChange = (content) => {
    setValues((prevValues) => ({
      ...prevValues,
      content: content,
    }));
    setError((prevValues) => ({
      ...prevValues,
      content: !content ? 'error' : '',
    }));
  };

  const handleValueValid = (name) => {
    if (name === 'submit') {
      setError((prevValues) => ({
        ...prevValues,
        sender: !values.sender ? 'error' : '',
        profileImageURL: !values.profileImageURL ? 'error' : '',
        content: !values.content ? 'error' : '',
      }));
    } else {
      setError((prevValues) => ({
        ...prevValues,
        [name]: !values[name] ? 'error' : '',
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
      await execute();
      navigate(`/post/${id}/`, { replace: true });
    }
  };

  const handleRandomColor = () => {
    setRandomColor(getRandomColor());
  };

  return (
    <>
      <Helmet>
        <title>메세지 작성하기 | Rolling </title>
      </Helmet>
      <div className={cx('header')}>
        <Header />
      </div>
      <form className={cx('add-paper')}>
        <div className={cx('add-paper-wrapper')}>
          <fieldset className={cx('add-paper-sender')}>
            <div
              className={cx(
                'add-paper-sender-title',
                `add-paper-sender-title-${error.sender}`
              )}
            >
              <label>From.</label>
              <p>입력하지 않으면 전달할 수 없어요!</p>
            </div>
            <Input
              ref={inputRef}
              placeholder='이름을 입력해 주세요.'
              name='sender'
              state={error.sender}
              onChange={handleValueChange}
              onBlur={() => handleValueValid('sender')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
          </fieldset>
          <fieldset className={cx('add-paper-profile')}>
            <label>프로필 이미지</label>
            <div className={cx('add-paper-profile-img')}>
              {!values.profileImageURL ? (
                <div
                  className={cx(
                    'add-paper-profile-default',
                    `${error.profileImageURL}`
                  )}
                >
                  <img src={defaultProfile} alt='기본 프로필 이미지' />
                </div>
              ) : (
                <div
                  className={cx('add-paper-profile-img-wrapper')}
                  style={{ '--color': randomColor }}
                >
                  <img
                    src={values.profileImageURL}
                    alt='선택한 프로필 이미지'
                  />
                </div>
              )}
              <div className={cx('add-paper-profile-img-select')}>
                <p className={cx(`${error.profileImageURL}`)}>
                  프로필 이미지를 선택해주세요!
                </p>
                <ul>
                  {PROFILE_EMOJI.map((item) => (
                    <li key={item.id} onClick={handleRandomColor}>
                      <button
                        ref={profileRef}
                        name='profileImageURL'
                        value={item.imgUrl}
                        onClick={handleValueChange}
                      >
                        <img src={item.imgUrl} alt={item.alt} />
                      </button>
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
            className={cx(
              'add-paper-quill',
              `add-paper-quill-${error.content}`
            )}
          >
            <div
              className={cx(
                'add-paper-quill-title',
                `add-paper-quill-title-${error.content}`
              )}
            >
              <label>마음을 전달해 주세요</label>
              <p>내용을 입력해 주세요!</p>
            </div>
            <div className={cx('add-paper-quill-content')}>
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
