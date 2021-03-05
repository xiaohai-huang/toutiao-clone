import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { Avatar, Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import authApi from "../../Api/authApi";
import ImageUploadButton from "../feed/ImageUploadButton";

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

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Must match the password above";
    }

    return errors;
  };

  const handleOnSubmit = (values, { setFieldError, setSubmitting }) => {
    setSubmitting(true);
    authApi
      .register(values.username, values.password, imageSrc)
      .then((res) => res.json())
      .then((res) => {
        setSubmitting(false);
        res.success
          ? history.push("/login")
          : setFieldError("username", res.message);
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
      });
  };
  const [imageSrc, setImageSrc] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
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
        <Box display="flex" alignItems="center">
          <ImageUploadButton
            label="头像"
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
          />
          {imageSrc && (
            <>
              <Avatar src={imageSrc} />
              {/* <img src={imageSrc} alt="" width="200px" height="200px" /> */}
              <IconButton onClick={() => setImageSrc("")}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disableElevation
          className={classes.submit}
          disabled={formik.isSubmitting}
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
