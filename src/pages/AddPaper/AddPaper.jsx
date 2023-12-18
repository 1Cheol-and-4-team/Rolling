import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { api, ENDPOINT } from '@/api';
import { useAsync } from '@/hooks/useAsync';
import { Header } from '@/Components/common/Header';
import { Input } from '@/components/common/Input';
import { Dropdown } from '@/components/common/Dropdown';
import { PROFILE_EMOJI, SENDER_LIST } from '@/stores';
import { Button } from '@/components/common/Button';
import styles from './AddPaper.module.scss';
import classNames from 'classnames/bind';
import ReactQuill, { contextType } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  INITIAL_POST_MESSAGE_TYPE,
  INITIAL_POST_MESSAGE_ERROR,
} from '../../stores/dataType';

const cx = classNames.bind(styles);

export function AddPaper() {
  const { id } = useParams();
  const [values, setValues] = useState(INITIAL_POST_MESSAGE_TYPE);
  const [error, setError] = useState(INITIAL_POST_MESSAGE_ERROR);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const postApi = () =>
    api.post(`${ENDPOINT.RECIPIENTS}${values.recipientId}/messages/`, values);
  const { isLoading, isError, execute } = useAsync(
    postApi,
    INITIAL_POST_MESSAGE_TYPE
  );

  const handleValueChange = (e) => {
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
      relationship: !values.relationship ? 'error' : '',
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

  return (
    <>
      <Header />
      <div className={cx('add-paper')}>
        <div className={cx('add-paper-sender')}>
          <h1>From.</h1>
          <Input
            ref={inputRef}
            placeholder='이름을 입력해 주세요.'
            name='sender'
            state={error.sender}
            onChange={handleValueChange}
          />
        </div>
        <div className={cx('add-paper-profile')}>
          <h1>프로필 이미지</h1>
          <div className={cx('add-paper-profile-img')}>
            {!values.profileImageURL ? (
              <img
                src='https://i.ibb.co/T0R4zhW/default-emoji.png'
                alt='기본 프로필 이미지'
              />
            ) : (
              <img src={values.profileImageURL} alt='선택한 프로필 이미지' />
            )}
            <div className={cx('add-paper-profile-img-select')}>
              <h2 className={cx(`${error.profileImageURL}`)}>
                프로필 이미지를 선택해주세요!
              </h2>
              <ul>
                {PROFILE_EMOJI.map((item) => (
                  <li key={item.id}>
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
        </div>
        <div>
          <h1>상대와의 관계</h1>
          <Dropdown
            sortList={SENDER_LIST}
            size='lg'
            state={error.relationship}
            onClick={handleValueChange}
          />
        </div>
        <div>
          <h1>내용을 입력해 주세요</h1>
          <ReactQuill
            theme='snow'
            value={values.content}
            onChange={handleQuillChange}
            style={{ width: '72rem', height: '26rem' }}
          />
        </div>
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
      </div>
    </>
  );
}
