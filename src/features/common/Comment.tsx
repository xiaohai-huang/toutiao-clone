import React, { useState } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Avatar, Box, Button, Divider, makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { timeAgo } from "../../utility/utility";

interface CommentProps {
  id: string;
  text: string;
  digg_count: number;
  reply_count: number;
  create_time: number;
  user_name: string;
  user_profile_image_url: string;
}
const useStyles = makeStyles((theme) => ({
  user_name: {
    fontWeight: 500,
    color: "#666",
  },
  create_time: {
    color: "#999",
    fontSize: "0.8rem",
    lineHeight: "22px",
  },
  like_button: {
    justifyContent: "flex-start",
  },
}));
function Comment(props: CommentProps) {
  const classes = useStyles();
  const time = timeAgo(props.create_time);
  const [count, setCount] = useState(props.digg_count || 0);
  return (
    <Box display="flex">
      <Avatar src={props.user_profile_image_url} alt={props.user_name} />
      {/* Comment Details */}
      <Box ml={1.5} width="100%">
        {/* User Name */}
        <Box display="flex" alignItems="center" mb={1}>
          <Typography className={classes.user_name} variant="body2">
            {props.user_name}
          </Typography>
          <Box ml={2} />
          <Typography className={classes.create_time} variant="subtitle2">
            {time}
          </Typography>
        </Box>
        <Typography variant="body1">{props.text}</Typography>
        <Box mb={1} />
        {/* Action Area */}
        <Box display="flex">
          <Button
            classes={{ label: classes.like_button }}
            size="small"
            variant="text"
            startIcon={<ThumbUpIcon />}
            onClick={() => setCount((prev) => prev + 1)}
          >
            {count}
          </Button>
          <Box ml={1.5} />
          <Button size="small">回复</Button>
          <Button size="small">{props.reply_count}条回复</Button>
        </Box>

        <Box mb={1.5} />
        <Divider />
      </Box>
    </Box>
  );
}

export default Comment;
