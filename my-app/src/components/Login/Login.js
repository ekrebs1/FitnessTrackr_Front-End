//post error message on login
import {
  Button,
  TextField,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  async function handleLogin(username, password) {
    try {
      await axios
        .post(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/users/login`, {
          username,
          password,
        })
        .then(({ data: { token } }) => {
          if (token) {
            localStorage.setItem("token", token);
            setAuth(true);
            // window.location.href = "/home";
          }
        });
    } catch (error) {
      setError("Error logging in, please try again");
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    btn: {
      fontSize: 20,
      backgroundColor: "#E2725A",
      "&:hover": {
        backgroundColor: "#94ACBF",
      },
    },
    title: {
      marginTop: 20,

      color: "#79AEB2",
      fontSize: 40,
    },
    subTitle: {
      color: "#79AEB2",
      fontSize: 30,
    },
    textField: {
      color: "#F9DDD2",
      backgroundColor: "#F9DDD2",
    },
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "30vh",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Typography
          className={classes.title}
          variant='h6'
          color='secondary'
          component='h2'
          align='center'
          gutterBottom>
          Hello There- Welcome to Fitness Trackr!
        </Typography>
        <Typography
          className={classes.subTitle}
          variant='h1'
          color='secondary'
          component='h2'
          align='center'
          gutterBottom>
          Please log in to your account.
        </Typography>
        {error}
        <form
          noValidate
          autoComplete='off'
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin(username, password);
          }}
          className={classes.form}>
          <TextField
            className={classes.textField}
            required
            id='outlined-required'
            label='Username'
            variant='outlined'
            color='#F9DDD2'
            defaultValue='Required'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            required
            className={classes.textField}
            id='outlined-required'
            type='password'
            label='Password'
            variant='outlined'
            //color='secondary'
            defaultValue='Password'
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button
            className={classes.btn}
            type='submit'
            color='secondary'
            variant='contained'
            endIcon={<KeyboardArrowRightIcon />}>
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
