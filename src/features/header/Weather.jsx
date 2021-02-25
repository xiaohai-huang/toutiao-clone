import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
  weatherHeader: {
    marginLeft: "0.8rem",
  },
  weatherDetails: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "0px",
  },
  weatherIcon: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Weather() {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography className={classes.weatherHeader} variant="subtitle2">
        北京 西南风2级 <span>良 72</span>
      </Typography>
      <List className={classes.weatherDetails}>
        <ListItem>
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            alignItems="center"
            justifyContent="center"
          >
            <ListItemText secondary="今天" />
            <ListItemAvatar className={classes.weatherIcon}>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" />
          </Box>
        </ListItem>
        <ListItem>
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            alignItems="center"
            justifyContent="center"
          >
            <ListItemText secondary="今天" />
            <ListItemAvatar className={classes.weatherIcon}>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" />
          </Box>
        </ListItem>
        <ListItem>
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            alignItems="center"
            justifyContent="center"
          >
            <ListItemText secondary="今天" />
            <ListItemAvatar className={classes.weatherIcon}>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" />
          </Box>
        </ListItem>
      </List>
    </Paper>
  );
}

// export default Weather;
