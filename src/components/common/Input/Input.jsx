import classNames from 'classnames/bind';
import styles from '@/components/common/Input/Input.module.scss';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

export const Input = forwardRef(function Input(
  { state, type = 'text', placeholder, errorMessage, ...props },
  ref
) {
  return (
    <>
      <input
        ref={ref}
        type={type}
        className={cx('input-base', state && `input-state-${state}`)}
        placeholder={placeholder}
        {...props}
      />
      <p
        className={cx(
          'error-message',
          state === 'error' || `error-message-hidden`
        )}
      >
        {state === 'error' ? errorMessage : ''}
      </p>
    </>
  );
});
