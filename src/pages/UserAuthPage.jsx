import React from "react";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import LoginForm from "../features/user/LoginForm";
import RegistrationForm from "../features/user/RegistrationForm";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.toutiao.com">
        正宗今日头条
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  authContainer: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
      display: "flex",
      alignItems: "center",
    },

    backgroundImage:
      "url(//s3b.pstatp.com/toutiao/resource/ntoutiao_web/static/image/login/login_bg_7584f6a.png)",
  },

  form: {
    width: "90%",
    marginTop: theme.spacing(21.8),
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    padding: "1rem",
  },
}));

export default function UserAuthPage({ type }) {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.app.user);
  if (type === "login" && user) {
    setTimeout(() => {
      history.push("/");
    }, 100);
  }

  return (
    <Box className={classes.authContainer}>
      <Container component="main" maxWidth="xs">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box position="absolute">
            <img
              style={{ objectFit: "cover" }}
              width="100vw"
              height="320px"
              alt="slogn"
              src="//s3a.pstatp.com/toutiao/resource/ntoutiao_web/static/image/login/slogan_c6bab2f.png"
            />
          </Box>
          <Box className={classes.form}>
            {type === "login" ? <LoginForm /> : <RegistrationForm />}
          </Box>
          <Box mt={5} pb={2}>
            <Copyright />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
