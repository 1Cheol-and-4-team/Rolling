function Input(state, type = 'text', ...props) {
  return (
    <>
      <input
        type={type}
        className={`input-base input-state-${state}`}
        {...props}
      />
      <p className='message message-hidden'> Error Message</p>
    </>
  );
}
