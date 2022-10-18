import React from 'react';

function Input(props) {
  const args = props.props;

  return (
    <div>
      <label htmlFor={args.inputId}>{args.labelContent}</label>
      <input
        type={args.inputType}
        id={args.inputId}
        value={args.inputValue}
        onChange={args.onChange}
        onBlur={args.onBlur}
      />
    </div>
  );
}

export default Input;
