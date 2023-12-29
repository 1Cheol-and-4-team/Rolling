import classNames from 'classnames/bind';
import styles from '@/components/common/Button/Button.module.scss';

const cx = classNames.bind(styles);

export const MixButton = ({
  variant,
  size,
  startIcon = null,
  endIcon = null,
  iconSize,
  iconColor,
  text,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const mixButtonProps = { type, disabled, ...props };
  const buttonClassName = cx('mix-btn', `btn-${variant}`, `btn--size-${size}`);
  const iconCalssName = cx(
    { [startIcon]: startIcon, [endIcon]: endIcon },
    `ic--size-${iconSize}`,
    `ic--color-${iconColor}`
  );
  return (
    <button className={buttonClassName} {...mixButtonProps}>
      <div>
        {startIcon && <i className={iconCalssName}></i>}
        <span className={cx({ 'mg-left': startIcon }, { 'mg-right': endIcon })}>
          {text}
        </span>
        {endIcon && <i className={iconCalssName}></i>}
      </div>
    </button>
  );
};
