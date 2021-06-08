//show error on page

import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { registerUser } from "../api";

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const [errorMessage, setErrorMessage] = useState();

  const onFormSubmit = (event) => {
    event.preventDefault();
    registerUser(username, password);
  };

  return (
    <>
      <form noValidate autoComplete='off' onSubmit={onFormSubmit}>
        <TextField
          id='username'
          label='Username'
          onInput={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          id='password'
          type='password'
          label='Password'
          onInput={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button type='submit'>Register</Button>
      </form>
    </>
  );
};

export default Register;
