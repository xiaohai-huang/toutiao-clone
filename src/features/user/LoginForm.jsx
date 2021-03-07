import React from "react";
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
import { useFormik } from "formik";

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
  const history = useHistory();
  const dispatch = useDispatch();

  // if (token) {
  //   return <Redirect to="/" />;
  // }
  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.length < 2) {
      errors.username = "Must be 2 characters or greater";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Must be 6 characters or greater";
    }

    return errors;
  };
  const handleOnSubmit = (values, { setSubmitting, setFieldError }) => {
    // e.preventDefault();
    setSubmitting(true);
    authApi
      .login(values.username, values.password)
      .then((res) => res.json())
      .then((res) => {
        setSubmitting(false);

        if (res.error) {
          setFieldError("password", res.message);
          console.log(res.message);
          return;
        }
        const user = jwt.verify(res.token, "a secret key");
        user.avatar_url = res.avatar_url;
        user.token = res.token;
        // save user info to redux once logged in
        dispatch(userUpdated(user));
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setFieldError("password", "Unable to connect to server.");
        setSubmitting(false);
      });
  };
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validate,
    onSubmit: handleOnSubmit,
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
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
          value={formik.values.username}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.username && formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
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
          value={formik.values.password}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          size="large"
          disableElevation
          disabled={formik.isSubmitting}
        >
          登录
        </Button>
        <Grid container direction="row" justify="space-between" spacing={1}>
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
