import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const actionTypes = {
  email: {
    userInput: 'USER_INPUT',
    userBlur: 'USER_BLUR',
  },
  password: {
    userInput: 'USER_INPUT',
    userBlur: 'USER_BLUR',
  },
};

/**
 * @param {any} value
 * @param {boolean} isValid
 */
const Email = function (value, isValid) {
  this.value = value;
  this.isValid = isValid;
};

const initalEmailState = new Email('', null);

const emailReducer = (prevState, action) => {
  if (action.type === actionTypes.email.userInput) {
    return new Email(action.val, action.val.includes('@'));
  } else if (action.type === actionTypes.email.userBlur) {
    return new Email(prevState.value, prevState.value.includes('@'));
  }
  return new Email('', false);
};

/**
 * @param {any} value
 * @param {boolean} isValid
 */
const Password = function (/*any*/ value, /*boolean*/ isValid) {
  this.value = value;
  this.isValid = isValid;
};

const initialPasswordState = new Password('', null);

/**
 * @param {Password} prevState
 */
const passwordReducer = (prevState, action) => {
  if (action.type === actionTypes.password.userInput) {
    return new Password(action.val, action.val.trim().length > 6);
  } else if (action.type === actionTypes.password.userBlur) {
    return new Password(prevState.value, prevState.value.trim().length > 6);
  }
  return new Password('', false);
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initalEmailState
  );

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialPasswordState
  );

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timerId = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({
      type: actionTypes.email.userInput,
      val: event.target.value,
    }); // this object is the action

    // setFormIsValid(event.target.value.includes('@')
    // && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPassword({
      type: actionTypes.password.userInput,
      val: event.target.value,
    });

    // setFormIsValid(emailState.isValid
    //   && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: actionTypes.email.userBlur });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.isValid);
    dispatchPassword({ type: actionTypes.password.userBlur });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
