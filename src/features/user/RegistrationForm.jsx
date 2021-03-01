import React from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { Button } from "@material-ui/core";
import authApi from "../../Api/authApi";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  submit: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
}));

export default function RegistrationForm() {
  const classes = useStyles();
  const history = useHistory();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Must be a valid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Must be 6 characters or greater";
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Must match the password above";
    }

    return errors;
  };

  const handleOnSubmit = (values) => {
    authApi
      .register(values.email, values.password)
      .then((res) => res.json())
      .then((res) =>
        res.success ? history.push("/login") : console.log(res.message)
      );
  };

  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "" },
    validate,
    onSubmit: handleOnSubmit,
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography component="h1" variant="h5">
        注册新账号
      </Typography>
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="邮箱"
          name="email"
          autoFocus
          value={formik.values.email}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="密码"
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="confirmPassword"
          label="确认密码"
          type="password"
          id="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.confirmPassword)}
          helperText={formik.errors.confirmPassword}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disableElevation
          className={classes.submit}
        >
          注册
        </Button>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Link variant="body2" component={RouterLink} to="/login">
              直接登录
            </Link>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
