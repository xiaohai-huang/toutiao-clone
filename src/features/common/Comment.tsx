import React, { useState } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { timeAgo } from "../../utility/utility";
import useReplyList from "../../utility/useReplyList";

interface CommentProps {
  id: string;
  text: string;
  digg_count: number;
  reply_count: number;
  create_time: number;
  user_name: string;
  user_profile_image_url: string;
  hasReplyList?: boolean;
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
  reply_list: {
    backgroundColor: "#f9f9f9",
  },
}));
function Comment(props: CommentProps) {
  const classes = useStyles();
  const time = timeAgo(props.create_time);
  const [count, setCount] = useState(props.digg_count || 0);
  const [showReply, setShowReply] = useState(false);
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
        <Box display="flex" alignItems="center">
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
          {props.hasReplyList && (
            <Button size="small" onClick={() => setShowReply((prev) => !prev)}>
              {showReply ? "收起回复" : <>{props.reply_count}条回复</>}
            </Button>
          )}
        </Box>
        <Box mb={0.5} />
        {showReply && <ReplyList comment_id={props.id} />}

        <Box mb={1.5} />
        <Divider />
      </Box>
    </Box>
  );
}
function ReplyList({ comment_id }: { comment_id: string }) {
  const { replyList, loading } = useReplyList(comment_id);
  const classes = useStyles();
  return (
    <div className={classes.reply_list}>
      {loading && <CircularProgress size="1.2rem" />}
      {replyList.map((reply) => {
        return (
          <Box key={reply.id} mb={1.3}>
            <Comment {...reply} />
          </Box>
        );
      })}
    </div>
  );
}
export default Comment;
