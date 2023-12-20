import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/common/Input';
import { Header } from '@/Components/common/Header';
import { Tab } from '@/components/common/Tab';
import { ColorOption } from '@/components/common/ColorOption';
import { Option } from '@/components/common/Option';
import { Button } from '@/components/common/Button';
import { useState } from 'react';
import { ENDPOINT } from '../../api/endPoint';
import classNames from 'classnames/bind';
import styles from './CreatePage.module.scss';
import { api } from '@/api';
import { INITIAL_POST_RECIPIENTS_TYPE } from '../../stores/dataType';
import { useRef } from 'react';
const cx = classNames.bind(styles);

export function CreatePage() {
  const [values, setValues] = useState(INITIAL_POST_RECIPIENTS_TYPE);
  const [valid, setValid] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();

    const { value } = e.currentTarget;
    const name = e.currentTarget.getAttribute('name');
    const selectedValue = value || e.currentTarget.getAttribute('value');
    setValues((prevValues) => ({ ...prevValues, [name]: selectedValue }));
    setError(!values.name ? 'error' : '');
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

    if (Object.values(values).some((value) => value === '')) {
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
    <form>
      <div className={cx('header')}>
        <Header></Header>
      </div>

      <div className={cx('section')}>
        <fieldset className={cx('to-input')}>
          <span className={cx('To')}>To.</span>

          <Input
            ref={inputRef}
            state={error}
            name='name'
            onChange={handleInputChange}
            onBlur={handleValueChange}
            placeholder='받는 사람 이름을 입력해 주세요'
            errorMessage='값을 입력해 주세요.'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          />
        </fieldset>

        <fieldset className={cx('information')}>
          <h1>배경화면을 선택해 주세요.</h1>
          <p>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
        </fieldset>

        <fieldset className={cx('tab')}>
          <Tab isActiveTab={isActiveTab} handleActiveTab={handleActiveTab} />
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
            <Option onClick={handleInputChange} />
          )}
        </fieldset>

        <fieldset className={cx('button')}>
          <Button
            variant='primary'
            type='submit'
            size={56}
            onClick={handleSubmitClick}
          >
            생성하기
          </Button>
        </fieldset>
      </div>
    </form>
  );
}
