import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { api, ENDPOINT } from '@/api';

import classNames from 'classnames/bind';
import styles from '@/pages/CreatePage/CreatePage.module.scss';

import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import { Tab } from '@/components/common/Tab';
import { ColorOption } from '@/components/common/ColorOption';
import { Option } from '@/components/common/Option';
import { Button } from '@/components/common/Button';

import { INITIAL_POST_RECIPIENTS_TYPE, IMPORT_IMAGES } from '@/stores';

const cx = classNames.bind(styles);
const { GO_BACK } = IMPORT_IMAGES;

export function CreatePage() {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_POST_RECIPIENTS_TYPE);
  const [error, setError] = useState('');

  const isEmptyInputValue = values.name === null || values.name === '';

  const handleInputChange = (e) => {
    e.preventDefault();

    const { value } = e.currentTarget;

    const name = e.currentTarget.getAttribute('name');
    const selectedValue = value || e.currentTarget.getAttribute('value');

    setValues((prevValues) => ({ ...prevValues, [name]: selectedValue }));
    setError(!values.name ? 'error' : '');
  };

  const onClickBack = () => {
    navigate(-1);
  };

  const [isActiveTab, setIsActiveTab] = useState(1);
  const handleActiveTab = (targetId) => {
    setIsActiveTab(targetId);
  };

  const handleValueChange = () => {
    setError(!values.name ? 'error' : '');
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    handleValueChange();

    if (isEmptyInputValue) {
      inputRef.current.focus();
      return;
    } else {
      try {
        const response = await api.post(ENDPOINT.RECIPIENTS, values);
        navigate(`/post/${response.data.id}`, { replace: true });
      } catch (error) {
        if (error.response) {
          console.error('Server response:', error.response.data);
        } else if (error.request) {
          console.error('Request failed:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      }
    }
  };

  return (
    <div className={cx('create-page')}>
      <Helmet>
        <title>메세지 생성하기 페이지 | Rolling</title>
      </Helmet>
      <div className={cx('header')}>
        <Header />
      </div>
      <div className={cx('sm-only')}>
        <button
          className={cx('btn-go-back')}
          onClick={onClickBack}
          aria-label='뒤로가기 버튼'
        >
          <img src={GO_BACK.URL} alt={GO_BACK.ALT} />
        </button>
      </div>
      <main className={cx('form-wrapper')}>
        <div className={cx('container')}>
          <form className={cx('form')}>
            <fieldset className={cx('username-input')}>
              <label className={cx('username-input-label')}>
                To.
                <span className={cx({ [`${error}-message`]: error })}>
                  입력하지 않으면 전달할 수 없어요!
                </span>
              </label>

              <Input
                ref={inputRef}
                state={error}
                name='name'
                onChange={handleInputChange}
                onBlur={handleValueChange}
                placeholder='받는 사람 이름을 입력해 주세요'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />
            </fieldset>

            <fieldset className={cx('background-information')}>
              <h1>배경화면을 선택해 주세요.</h1>
              <p>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
            </fieldset>

            <fieldset className={cx('color-option-tab')}>
              <Tab
                isActiveTab={isActiveTab}
                handleActiveTab={handleActiveTab}
              />

              {isActiveTab === 1 ? (
                <ColorOption
                  onClick={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                />
              ) : (
                <Option onClick={handleInputChange} setValues={setValues} />
              )}
            </fieldset>

            <fieldset className={cx('submit-button')}>
              <Button
                variant='primary'
                type='submit'
                size={56}
                onClick={handleSubmitClick}
              >
                생성하기
              </Button>
            </fieldset>
          </form>
        </div>
      </main>
    </div>
  );
}
