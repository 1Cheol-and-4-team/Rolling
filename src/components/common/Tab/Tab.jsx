import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '@/components/common/Tab/Tab.module.scss';
import { Button } from '@/components/common/Button';
import { TAB } from '@/stores';

const cx = classNames.bind(styles);

export const Tab = ({ isActiveTab, handleActiveTab }) => {
  // const [isActiveTab, setIsActiveTab] = useState(1);

  // const handleActiveTab = (targetId) => {
  //   setIsActiveTab(targetId);
  // };

  return (
    <ul className={cx('tab-list')}>
      {TAB.map((item) => (
        <li key={item.id} className={cx('tab-list-item')}>
          <Button
            variant={isActiveTab === item.id ? 'secondary' : 'tab-off'}
            size={40}
            onClick={() => handleActiveTab(item.id)}
          >
            {item.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};
