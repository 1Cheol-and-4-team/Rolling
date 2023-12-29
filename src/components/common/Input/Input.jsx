import { forwardRef } from 'react';

import classNames from 'classnames/bind';
import styles from '@/components/common/Input/Input.module.scss';

const cx = classNames.bind(styles);

export const Input = forwardRef(function Input(
  { state, type = 'text', placeholder, ...props },
  ref
) {
  return (
    <>
      <input
        ref={ref}
        type={type}
        className={cx('input-base', { [`input-state-${state}`]: state })}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
});
