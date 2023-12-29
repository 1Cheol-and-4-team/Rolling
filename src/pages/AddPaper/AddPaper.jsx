import { useState, useRef, useEffect } from 'react';
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
import { Profile } from '@/components/Profile/Profile';
import { Dropdown } from '@/components/common/Dropdown';
import { Button, LinkButton } from '@/components/common/Button';

import { RELATIONSHIP_LIST, IMPORT_IMAGES } from '@/stores';

const cx = classNames.bind(styles);

export function AddPaper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const profileRef = useRef(null);
  const quillRef = useRef(null);

  const [values, setValues] = useState(INITIAL_POST_MESSAGE_TYPE);
  const [isError, setIsError] = useState(INITIAL_POST_MESSAGE_ERROR);

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
          <Profile
            values={values}
            setValues={setValues}
            isError={isError}
            setIsError={setIsError}
            profileRef={profileRef}
          />
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
