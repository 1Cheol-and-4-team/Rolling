import classNames from 'classnames/bind';
import styles from '@/components/common/Button/Button.module.scss';

const cx = classNames.bind(styles);

export const Button = ({
  variant,
  size,
  children,
  type = 'button',
  isDelete = false,
  disabled = false,
  ...props
}) => {
  const buttonProps = { type, disabled, ...props };
  const className = cx(
    `btn-${variant}`,
    { 'btn-delete': isDelete },
    `btn--size-${size}`
  );

  return (
    <button className={className} {...buttonProps}>
      <span>{children}</span>
    </button>
  );
};
