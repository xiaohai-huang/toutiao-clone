import React from "react";
import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { userLogout } from "../../app/appSlice";

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
          <Typography className={classes.text} variant="caption">
            你好，{user.username}
          </Typography>
          <Box mt={2} />
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
