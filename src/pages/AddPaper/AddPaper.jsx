import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './AddPaper.module.scss';
import classNames from 'classnames/bind';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './AddPaperQuill.scss';

import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';

import { Header } from '@/Components/common/Header';
import { Input } from '@/components/common/Input';
import { Dropdown } from '@/components/common/Dropdown';
import { Button } from '@/components/common/Button';
import { PROFILE_EMOJI, RELATIONSHIP_LIST } from '@/stores';
import { getRandomColor } from '@/utils';

import {
  INITIAL_POST_MESSAGE_TYPE,
  INITIAL_POST_MESSAGE_ERROR,
} from '../../stores/dataType';

const cx = classNames.bind(styles);

const Font = Quill.import('formats/font');
Font.whitelist = ['Nanum Pen Script', ...Font.whitelist];
Quill.register(Font, true);

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ font: ['Nanum Pen Script'] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, false] }],
    ['clean'],
  ],
};

export function AddPaper() {
  const { id } = useParams();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_POST_MESSAGE_TYPE);
  const [error, setError] = useState(INITIAL_POST_MESSAGE_ERROR);
  const [randomColor, setRandomColor] = useState('#000000');

  const postApi = () =>
    api.post(`${ENDPOINT.RECIPIENTS}${id}/messages/`, values);
  const { execute } = useAsync(postApi, INITIAL_POST_MESSAGE_TYPE);

  const handleValueChange = (e) => {
    e.preventDefault();

    const { value } = e.currentTarget;
    const name = e.currentTarget.getAttribute('name');
    const selectedValue = value || e.currentTarget.getAttribute('value');

    setValues((prevValues) => ({ ...prevValues, [name]: selectedValue }));
  };

  const handleQuillChange = (content) => {
    setValues((prevValues) => ({
      ...prevValues,
      content: content,
    }));
    8;
  };

  const handleValueValid = () => {
    setError((prevValues) => ({
      ...prevValues,
      sender: !values.sender ? 'error' : '',
      profileImageURL: !values.profileImageURL ? 'error' : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleValueValid();

    if (Object.values(values).some((value) => value === '')) {
      inputRef.current.focus();
      return;
    } else {
      execute();
      navigate(`/post/${id}/`, { replace: true });
    }
  };

  useEffect(() => {
    if (Object.values(error).some((err) => err === 'error')) {
      handleValueValid();
    }
  }, [values]);

  const handleRandomColor = () => {
    setRandomColor(getRandomColor());
  };

  return (
    <>
      <Header />
      <form className={cx('add-paper')}>
        <fieldset className={cx('add-paper-sender')}>
          <label>From.</label>
          <Input
            ref={inputRef}
            placeholder='이름을 입력해 주세요.'
            name='sender'
            state={error.sender}
            onChange={handleValueChange}
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
              <div className={cx('add-paper-profile-default')}>
                <img
                  src='https://i.ibb.co/T0R4zhW/default-emoji.png'
                  alt='기본 프로필 이미지'
                />
              </div>
            ) : (
              <div
                className={cx('add-paper-profile-img-wrapper')}
                style={{ '--color': randomColor }}
              >
                <img src={values.profileImageURL} alt='선택한 프로필 이미지' />
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
        <fieldset>
          <label>상대와의 관계</label>
          <Dropdown
            sortList={RELATIONSHIP_LIST}
            size='lg'
            onClick={handleValueChange}
          />
        </fieldset>
        <fieldset>
          <label>내용을 입력해 주세요</label>
          <ReactQuill
            className={cx('add-paper-quill')}
            theme='snow'
            value={values.content}
            onChange={handleQuillChange}
            modules={{ toolbar: modules.toolbar }}
            style={{ width: '72rem', height: '26rem' }}
          />
        </fieldset>
        <div className={cx('add-paper-button')}>
          <Button
            variant='primary'
            size={56}
            type='submit'
            onClick={handleSubmit}
          >
            생성하기
          </Button>
        </div>
      </form>
    </>
  );
}
