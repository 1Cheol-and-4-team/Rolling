import classNames from 'classnames/bind';
import styles from '@/components/common/Button/Button.module.scss';

const cx = classNames.bind(styles);

export const Button = ({
  variant,
  size,
  children,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const buttonProps = { type, disabled, ...props };
  const className = cx(`btn-${variant}`, `btn--size-${size}`);

  return (
    <button className={className} {...buttonProps}>
      <span>{children}</span>
    </button>
  );
};
