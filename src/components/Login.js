import React, { useEffect, useReducer, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button, Stack } from "react-bootstrap";
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  return state;
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 5,
      cpIsValid:
        action.cpVal.length > 0
          ? action.cpVal === state.value
            ? true
            : false
          : null,
    };
  }
  if (action.type === "CONFIRM_PASSWORD") {
    return {
      value: state.value,
      isValid: state.isValid,
      cpIsValid: action.val.length > 0 && action.val === state.value,
    };
  }
};
const Login = () => {
  const [login, setLogin] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
    cpIsValid: null,
  });
  const confirmPassword = useRef();
  const emailHandler = (e) => {
    dispatchEmail({ type: "USER_INPUT", val: e.target.value });
  };

  const passwordHandler = (e) => {
    let cp = "";
    if (!login) {
      cp = confirmPassword.current.value;
    }
    dispatchPassword({
      type: "USER_INPUT",
      val: e.target.value,
      cpVal: cp,
    });
  };
  const confirmPasswordHandler = (e) => {
    dispatchPassword({ type: "CONFIRM_PASSWORD", val: e.target.value });
  };

  const { isValid: passwordIsValid } = passwordState;
  const { isValid: emailIsValid } = emailState;
  const { cpIsValid: confirmPasswordIsValid } = passwordState;

  useEffect(() => {
    const id = setTimeout(() => {
      setFormIsValid(
        emailIsValid && passwordIsValid && login ? true : confirmPasswordIsValid
      );
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid, login]);
  const formHandler = async () => {
    const email = emailState.value;
    const password = passwordState.value;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbfM-Y6Bv3aSPRNlB9S7qZFxVHuvF--l8";
    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbfM-Y6Bv3aSPRNlB9S7qZFxVHuvF--l8";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error.message);
      }
      console.log(data.idToken,data.email)
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("email", data.email);
    } 
    catch (error) {
      console.log(error);
    }
  };
  const loginHandler = () => {
    setLogin((prev) => !prev);
  };
  return (
    <Card style={{ width: "18rem" }} className="mx-auto mt-5">
      <Card.Body>
        <Card.Title className="  mb-3">
          {!login ? "Sign Up" : "Login"}
        </Card.Title>
        <Card.Text>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              isInvalid={
                emailIsValid === true || emailIsValid === null ? false : true
              }
              onChange={emailHandler}
            />
          </FloatingLabel>
          <FloatingLabel label="Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              isInvalid={
                passwordIsValid === true || passwordIsValid === null
                  ? false
                  : true
              }
              onChange={passwordHandler}
            />
          </FloatingLabel>
          {!login && (
            <FloatingLabel label="Confirm Password">
              <Form.Control
                type="password"
                placeholder="Password"
                isInvalid={
                  confirmPasswordIsValid === true ||
                  confirmPasswordIsValid === null
                    ? false
                    : true
                }
                onChange={confirmPasswordHandler}
                ref={confirmPassword}
              />
            </FloatingLabel>
          )}
        </Card.Text>
        <Stack>
          <Button
            className="mx-auto mb-3"
            onClick={formHandler}
            disabled={!formIsValid}
          >
            {!login ? "Sign Up" : "Login"}
          </Button>
          <Button onClick={loginHandler} variant="outline-primary">
            {!login ? "Have an account?Login" : "Dont have an account?Sign up"}
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default Login;
