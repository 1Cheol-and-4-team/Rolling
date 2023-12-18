export const onClickOutside = (e, ref, handleClose) => {
  if (ref.current && !ref.current.contains(e.target)) {
    handleClose();
  }
};
