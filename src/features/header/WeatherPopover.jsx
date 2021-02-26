import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import WbCloudyOutlinedIcon from "@material-ui/icons/WbCloudyOutlined";
import WeatherBadge from "./WeatherBadge";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "3px",
    width: "100%",
    zIndex: theme.zIndex.snackbar,
  },
  weatherHeader: {
    marginLeft: "0.8rem",
    "& > *": {
      marginRight: "3px",
    },
  },
  weatherDetails: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "0px",
  },
  weatherIcon: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(1),
  },
}));

export default function WeatherPopover() {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={0}>
      <Box className={classes.weatherHeader} display="flex" alignItems="center">
        <Typography variant="subtitle2">北京 西南风2级</Typography>
        <WeatherBadge level="良" levelDigit="72" />
      </Box>

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
                <WbSunnyOutlinedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primaryTypographyProps={{
                variant: "body2",
                display: "block",
                noWrap: true,
              }}
              primary={<>13℃ / 16℃</>}
            />
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
                <WbSunnyOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                variant: "body2",
                display: "block",
                noWrap: true,
              }}
              primary={<>-3℃ / 12℃</>}
            />
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
            <ListItemText secondary="后天" />
            <ListItemAvatar className={classes.weatherIcon}>
              <Avatar>
                <WbCloudyOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                variant: "body2",
                display: "block",
                noWrap: true,
              }}
              primary={<>0℃ / 13℃</>}
            />
          </Box>
        </ListItem>
      </List>
    </Paper>
  );
}

// export default Weather;
