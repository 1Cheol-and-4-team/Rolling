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

const cx = classNames.bind(styles);

export function CreatePage() {
  const [values, setValues] = useState(INITIAL_POST_RECIPIENTS_TYPE);
  const [valid, setValid] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    const name = e.currentTarget.getAttribute('name');
    const selectedValue = value || e.currentTarget.getAttribute('value');
    setValues((prevValues) => ({ ...prevValues, [name]: selectedValue }));
    console.log(name, selectedValue);
  };
  const handleButtonClick = () => {
    if (!valid) {
      setError('error');
    } else {
      setError('');
    }
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
    console.log(values);
    console.log('llllll');

    try {
      const response = await api.post(ENDPOINT.RECIPIENTS, values);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={cx('header')}>
        <Header></Header>
      </div>
      <div className={cx('section')}>
        <div className={cx('to-input')}>
          <span className={cx('To')}>To.</span>
          <Input
            state={error}
            name='name'
            onChange={handleInputChange}
            onBlur={handleValueChange}
            placeholder='받는 사람 이름을 입력해 주세요'
          />
        </div>

        <div className={cx('information')}>
          <h1>배경화면을 선택해 주세요.</h1>
          <p>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
        </div>

        <div className={cx('tab')}>
          <Tab isActiveTab={isActiveTab} handleActiveTab={handleActiveTab} />
          {isActiveTab === 1 ? (
            <ColorOption onClick={handleInputChange} />
          ) : (
            <Option onClick={handleInputChange} />
          )}
        </div>

        <div className={cx('button')}>
          <form onSubmit={handleSubmitClick}>
            <Button
              variant='primary'
              type='submit'
              size={56}
              onClick={handleButtonClick}
            >
              생성하기
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
