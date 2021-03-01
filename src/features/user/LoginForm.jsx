import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { Divider } from "@material-ui/core";
import jwt from "jsonwebtoken";

import authApi from "../../Api/authApi";
import { useDispatch } from "react-redux";
import { userUpdated } from "../../app/appSlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  // if (token) {
  //   return <Redirect to="/" />;
  // }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    authApi
      .login(username, password)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.error) {
          console.log(res.message);
          return;
        }
        const user = jwt.verify(res.token, "a secret key");
        // save user info to redux once logged in
        dispatch(userUpdated(user));
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
        <Typography align="center">假用户名登录</Typography>
        <Box mb={1} />
        <Divider />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          label="用户名"
          name="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="密码"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          size="large"
          disableElevation
          disabled={loading}
        >
          登录
        </Button>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Link variant="body2" component={RouterLink} to="/register">
              注意！本网站不是真正的
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" component={RouterLink} to="/register">
              没有账号，立即注册
            </Link>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
