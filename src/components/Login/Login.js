import React, { useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passReducer = (state, action) => {
  if (action.type === "USER_PASS") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASS_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isvalid: false };
};

const nameReducer = (state, action) => {
  if (action.type === "USER_NAME") {
    return { value: action.val, isValid: action.val.trim().length > 3 };
  }
  if (action.type === "NAME_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 3 };
  }
  return { value: "", isValid: false };
};
const dobReducer = (state, action) => {
  if (action.type === "USER_DOB") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "DATE_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  let [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passState, dispatchPassword] = useReducer(passReducer, {
    value: "",
    isValid: null,
  });

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [dobState, DispatchDob] = useReducer(dobReducer, {
    value: "",
    isValid: null,
  });
  const [gender, genderHandler] = useState("");
  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") && passState.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_PASS", val: event.target.value });

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passState.value.trim().length > 6);
    dispatchPassword({ type: "PASS_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // localStorage.setItem({
    //   Name:nameState.value,
    //   Email :emailState.value,
    //   Password: passState.value,
    //   DOB:dobState.value,
    //   Gender: gender,
    // });
    props.onLogin(
      emailState.value,
      passState.value,
      nameState.value,
      dobState.value,
     gender
    );
  };

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_NAME", val: event.target.value });
    setFormIsValid(nameState.isValid && event.target.value.trim().length > 3);
  };
  const validateNameHandler = () => {
    dispatchName({ type: "NAME_BLUR" });
  };

  const dobChangeHandler = (event) => {
    DispatchDob({ type: "USER_DOB", val: event.target.value });
    setFormIsValid(dobState.isValid);
  };
  const validateDobHandler = () => {
    DispatchDob({ type: "DATE_BLUR" });
  };
  const genderChangeHandler = (event) => {
    genderHandler(event.target.value);
  };
  if (gender) formIsValid = true;
  else formIsValid = false;

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            nameState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={nameState.value}
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
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
            passState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            dobState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="dateofbirth">DOB</label>
          <input
            type="date"
            id="date"
            max="2021-10-01"
            value={dobState.value}
            onChange={dobChangeHandler}
            onBlur={validateDobHandler}
          />
        </div>
        <div
          className={`${classes.control} ${classes.main} ${
            gender.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="gender">Gender</label>
          <select
            type="DROPDOWN"
            id="gender"
            name="gender"
            value={gender}
            onChange={genderChangeHandler}
            // onBlur={validateEmailHandler}
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
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
