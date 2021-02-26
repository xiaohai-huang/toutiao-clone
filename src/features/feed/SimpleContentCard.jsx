import React from "react";
import {
  Avatar,
  Box,
  Paper,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { timeAgo } from "../../utility/utility";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      background: theme.palette.background.default,
      "&:first-child": {
        paddingTop: theme.spacing(1),
      },
    },
  },
  smallAvatar: {
    width: "18px",
    height: "18px",
  },
  container: {
    "& > *": {
      margin: "0.1rem",
    },
  },
  title: {
    marginBottom: "6px",
    [theme.breakpoints.down("sm")]: {
      color: "#222",
    },
  },
  link: {
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  footer: {
    color: theme.palette.grey[600],

    "& > *": {
      marginRight: "7px",
      fontSize: "0.83rem",
    },
    marginBottom: "-1px",
    [theme.breakpoints.down("xs")]: {
      "& > *": {
        color: "#999",
        fontSize: "0.75rem",
      },
    },
  },
}));
function SimpleContentCard({
  title,
  behot_time,
  source,
  comments_count,
  media_avatar_url,
  item_id,
}) {
  const classes = useStyles();
  const publish_time = behot_time;
  const avatar_url = media_avatar_url;
  const name = source;
  return (
    <Paper elevation={0} className={classes.root}>
      <Box
        className={classes.container}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        m={1}
      >
        <Typography className={clsx(classes.title, classes.link)} variant="h6">
          {title}
        </Typography>
        {/* Card Footer */}
        <Box className={classes.footer} display="flex" alignItems="center">
          <Avatar
            className={clsx(classes.smallAvatar, classes.link)}
            alt={name}
            src={avatar_url}
          />
          <Typography className={classes.link} variant="subtitle2">
            {name}
          </Typography>
          <Typography className={classes.link} variant="subtitle2">
            {" "}
            ⋅ {comments_count}评论
          </Typography>
          <Typography variant="subtitle2">
            {" "}
            ⋅ {timeAgo(publish_time)}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </Paper>
  );
}

export default SimpleContentCard;
