import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { timeAgo } from "../../utility/utility";

const useStyles = makeStyles((theme) => ({
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
      fontSize: "0.89rem",
    },
    [theme.breakpoints.down("xs")]: {
      "& > *": {
        color: "#999",
        fontSize: "0.75rem",
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
  return (
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
      <Typography variant="subtitle2"> ⋅ {timeAgo(publish_time)}</Typography>
    </Box>
  );
}

export default CardFooter;
