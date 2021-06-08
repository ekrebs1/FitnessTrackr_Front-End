//post error message on login
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { loginUser } from "../api";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const [errorMessage, setErrorMessage] = useState("error");

  const onFormSubmit = (event) => {
    event.preventDefault();
    loginUser(username, password);
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
        <Button type='submit'>Login</Button>
      </form>
    </>
  );
};

export default Login;
