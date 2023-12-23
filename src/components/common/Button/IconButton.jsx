import classNames from 'classnames/bind';
import styles from '@/components/common/Button/Button.module.scss';

const cx = classNames.bind(styles);

export const IconButton = ({
  variant,
  style,
  icon,
  iconSize,
  iconColor,
  active,
  type = 'button',
  isDelete = false,
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
      className={cx(
        { [`btn-${variant}`]: variant },
        `ic-btn-${style}`,
        {
          'btn-active': active,
        },
        { 'ic-btn-delete': isDelete }
      )}
      {...buttonProps}
    >
      <i className={className}></i>
    </button>
  );
};

export const EditButton = ({ src, url, active = false }) => {
  return (
    <button className={cx('btn-edit', { 'btn-edit-active': active })}>
      <img src={src} alt={url} />
    </button>
  );
};
