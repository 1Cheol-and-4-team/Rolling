import classNames from 'classnames/bind';
import styles from '@/components/common/Tab/Tab.module.scss';
import { Button } from '@/components/common/Button';
import { POST_TAB_LIST } from '@/stores';

const cx = classNames.bind(styles);

export const Tab = ({ isActiveTab, handleActiveTab }) => {
  return (
    <ul className={cx('tab-list')}>
      {POST_TAB_LIST.map((item) => (
        <li key={item.id} className={cx('tab-list-item')}>
          <Button
            variant={isActiveTab === item.id ? 'secondary' : 'tab-off'}
            size={40}
            onClick={() => handleActiveTab(item.id)}
          >
            {item.option}
          </Button>
        </li>
      ))}
    </ul>
  );
};
