import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { timeAgo } from "../../utility/utility";

const useStyles = makeStyles((theme) => ({
  link: {
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  footer: {
    color: "#777",

    "& > *": {
      marginRight: "4.3px",
      fontSize: "0.89rem",
    },
    [theme.breakpoints.down("xs")]: {
      "& > *": {
        // color: "#999",
        fontSize: "0.64rem",
      },
    },
  },
  smallAvatar: {
    width: "18px",
    height: "18px",
  },
}));

function CardFooter({ name, avatar_url, comments_count, publish_time }) {
  const classes = useStyles();
  const device = useSelector((state) => state.app.device);

  return (
    <Box className={classes.footer} display="flex" alignItems="center">
      {device === "PC" ? (
        <Avatar
          className={clsx(classes.smallAvatar, classes.link)}
          alt={name}
          src={avatar_url}
        />
      ) : undefined}
      <Typography className={classes.link} variant="subtitle2">
        {name}
      </Typography>
      <Typography className={classes.link} variant="subtitle2">
        ⋅ {comments_count ? comments_count : 0}评论
      </Typography>
      {device === "PC" ? (
        <Typography variant="subtitle2"> ⋅ {timeAgo(publish_time)}</Typography>
      ) : undefined}
    </Box>
  );
}

export default CardFooter;
