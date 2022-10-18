import classes from '../Login/Login.module.css';

function InputField(props) {
  return (
    <div
      className={`${classes.control} ${
        props.isPasswordStateValid === false ? classes.invalid : ''
      }`}
    >
      {props.children}
    </div>
  );
}

export default InputField;
