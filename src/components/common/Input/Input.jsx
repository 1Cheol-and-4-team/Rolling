import classNames from 'classnames/bind';
import styles from '@/components/common/Input/Input.module.scss';

const cx = classNames.bind(styles);

export function Input({ state, type = 'text', ...props }) {
  return (
    <>
      <input
        type={type}
        className={cx('input-base', state && `input-state-${state}`)}
        {...props}
      />
      <p
        className={cx(
          'error-message',
          state === 'error' || `error-message-hidden`
        )}
      >
        값을 입력해 주세요.
      </p>
    </>
  );
}
