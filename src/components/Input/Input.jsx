import React from 'react';

function Input(props) {
  const args = props.props;

  return (
    <React.Fragment>
      <label htmlFor={args.inputId}>{args.labelContent}</label>
      <input
        type={args.inputType}
        id={args.inputId}
        value={args.inputValue}
        onChange={args.onChange}
        onBlur={args.onBlur}
      />
    </React.Fragment>
  );
}

export default Input;
