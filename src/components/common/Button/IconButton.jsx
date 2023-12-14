import classNames from 'classnames/bind';
import styles from '@/components/common/Button/Button.module.scss';

const cx = classNames.bind(styles);

export const IconButton = ({
  variant,
  style,
  icon,
  iconSize,
  iconColor,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const buttonProps = { type, disabled, ...props };
  const className = cx(
    `${icon}`,
    `ic--size-${iconSize}`,
    `ic--color-${iconColor}`
  );
  return (
    <button
      className={cx(variant && `btn-${variant}`, `ic-btn-${style}`)}
      {...buttonProps}
    >
      <i className={className}></i>
    </button>
  );
};
