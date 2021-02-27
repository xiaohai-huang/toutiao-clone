import React from "react";
import { Box, Paper, makeStyles, Typography } from "@material-ui/core";

import clsx from "clsx";
import CardFooter from "./CardFooter";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      background: theme.palette.background.default,
      "&:first-child": {
        paddingTop: theme.spacing(1),
      },
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
  const history = useHistory();
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
        ml={0}
      >
        <Box mb={0.5} onClick={() => history.push(`/news/${item_id}`)}>
          <Typography
            className={clsx(classes.title, classes.link)}
            variant="h6"
            display="inline"
          >
            {title}
          </Typography>
        </Box>
        {/* Card Footer */}
        <CardFooter
          name={name}
          avatar_url={avatar_url}
          comments_count={comments_count}
          publish_time={publish_time}
        />
      </Box>
    </Paper>
  );
}

export default SimpleContentCard;
