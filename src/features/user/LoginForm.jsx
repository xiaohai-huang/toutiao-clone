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

import authApi from "../../Api/authApi";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // if (token) {
  //   return <Redirect to="/" />;
  // }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    authApi
      .login(email, password)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(res.message);
          return;
        }
        localStorage.setItem("token", res.token);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
        <Typography align="center">邮箱登录</Typography>
        <Box mb={1} />
        <Divider />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="邮箱"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
