import React from "react";
import {
  Avatar,
  Box,
  Button,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { useDispatch } from "react-redux";

import { userLogout } from "../../app/appSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.secondary,
  },
  paper: {
    background: theme.palette.background.default,
  },
  text: {
    color: theme.palette.grey[600],
  },
}));

function UserCard({ user }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Box className={classes.root} p={2.5} pb={2}>
      <Paper className={classes.paper} elevation={1}>
        <Box
          p={2}
          pl={3}
          pr={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
          alignContent="center"
          textAlign="center"
        >
          <Avatar src={user.avatar_url} alt={user.username} />
          <Box mb={1} />
          <Typography className={classes.text} variant="caption">
            你好，{user.username}
          </Typography>
          <Box mt={2} />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            disableElevation
            onClick={() => history.push("/news/create")}
            startIcon={<CreateIcon />}
          >
            创建新头条
          </Button>
          <Box marginTop={1} />
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            disableElevation
            onClick={() => dispatch(userLogout())}
          >
            注销
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default UserCard;
