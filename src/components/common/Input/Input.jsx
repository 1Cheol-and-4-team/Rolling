function Input(status, type = 'text', ...props) {
  return (
    <>
      <input
        type={type}
        className={`input-base input-status-${status}`}
        {...props}
      />
      <p className='message message-hidden'> Error Message</p>
    </>
  );
}
