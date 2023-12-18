import classNames from 'classnames/bind';
import styles from '@/components/common/Input/Input.module.scss';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

export const Input = forwardRef(function Input(
  { state, type = 'text', ...props },
  ref
) {
  return (
    <>
      <input
        ref={ref}
        type={type}
        className={cx('input-base', state && `input-state-${state}`)}
        {...props}
      />
    </>
  );
});
