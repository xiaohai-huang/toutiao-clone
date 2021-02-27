import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

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
    "& > *": {
      backgroundColor: "transparent",
    },
  },
}));

export default function WeatherPopover({
  city_name,
  aqi,
  wind_direction,
  wind_level,
  forecast_list,
}) {
  const classes = useStyles();
  // obtain 3 days of weather forecasts
  const forecasts = forecast_list.slice(1, 3 + 1);
  return (
    <Paper className={classes.root} elevation={0}>
      <Box className={classes.weatherHeader} display="flex" alignItems="center">
        <Typography variant="subtitle2">
          {city_name} {wind_direction}
          {wind_level}级
        </Typography>
        <WeatherBadge level="良" levelDigit={aqi} />
      </Box>

      <List className={classes.weatherDetails}>
        {forecasts.map((forecast, i) => {
          const {
            low_temperature,
            high_temperature,
            condition,
            weather_icon_id,
          } = forecast;
          const days = ["今天", "明天", "后天"];
          const iconUrl = `https://sf1-dycdn-tos.pstatp.com/obj/eden-cn/pipieh7nupabozups/toutiao_web_pc/${weather_icon_id}.png`;
          return (
            <ListItem key={days[i]}>
              <Box
                display="flex"
                flexDirection="column"
                textAlign="center"
                alignItems="center"
                justifyContent="center"
              >
                <ListItemText secondary={days[i]} />
                <ListItemAvatar className={classes.weatherIcon}>
                  <Avatar>
                    <img alt={condition} src={iconUrl} />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primaryTypographyProps={{
                    variant: "body2",
                    display: "block",
                    noWrap: true,
                  }}
                  primary={
                    <>
                      {low_temperature}℃ / {high_temperature}℃
                    </>
                  }
                />
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

// export default Weather;
