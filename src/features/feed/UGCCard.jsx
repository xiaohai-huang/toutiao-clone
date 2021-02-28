import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
// import { useHistory } from "react-router-dom";
import { numberToChinese, timeAgo } from "../../utility/utility";

// const author = {
//   ugc_user: {
//     open_url:
//       "/c/user/token/MS4wLjABAAAA4EKNlqVeNTTuEdWn0VytNS8cdODKTsNNwLTxOnigzZtclro2Kylvway5mTyTUKvz/",
//     user_id: 4265754785223431,
//     name: "南海战略态势感知",
//     avatar_url:
//       "https://sf3-ttcdn-tos.pstatp.com/img/pgc-image/491295ab5d004db9b2cda2c210901357~300x300.image",
//     is_following: false,
//     is_self: false,
//     user_verified: 1,
//     user_auth_info: {
//       auth_type: "0",
//       auth_info: "“南海战略态势感知”智库官方账号",
//     },
//   },
// };

const useStyles = makeStyles((theme) => ({
  nameContainer: {
    "& > *": {
      marginRight: "0.33rem",
    },
  },
  name: {
    fontWeight: 400,
  },
  badage: {
    background: "#ff9818",
    color: "#fff",
    "& > *": {
      fontSize: "0.9rem",
      fontWeight: 520,
    },
    borderRadius: "3px",
    padding: "0px 3px",
  },
  subtitle: {
    color: "#777",
  },
  title: {
    fontSize: "0.85rem",
  },
  footer: {
    color: "#777",
    [theme.breakpoints.down("sm")]: {
      // color: "#999",
      fontSize: "0.64rem",
      fontWeight: "300",
    },
  },
  show_count: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  link: {
    color: "#222",
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
}));
function UGCAuthor({
  name,
  avatar_url,
  is_following,
  user_verified,
  user_auth_info,
}) {
  const classes = useStyles();
  // &nbsp;·&nbsp;
  const auth_info = user_auth_info.auth_info
    ? ` ·  ${user_auth_info.auth_info}`
    : undefined;
  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center">
      <Avatar alt={name} src={avatar_url} />
      <Box mr={1} />
      {/* right */}
      <Box>
        {/* name */}
        <Box
          className={classes.nameContainer}
          display="flex"
          alignItems="center"
        >
          <Typography variant="h6" className={classes.name}>
            {name}
          </Typography>
          {/* verified icon */}
          {user_verified === 1 ? (
            <img
              alt="verified"
              src="//p3.pstatp.com/origin/pgc-image/b13dded4c4e948e293e217f95e8565b4"
              width="16px"
              height="16px"
            />
          ) : undefined}
          <Box className={classes.badage}>
            <Typography>微头条</Typography>
          </Box>
        </Box>
        {/* subtitle */}
        <Box className={classes.subtitle}>
          {is_following ? "已关注" : "未关注"}
          {auth_info}
        </Box>
      </Box>
    </Box>
  );
}

function UGCCard({ title, ugc_data, behot_time, comments_count, item_id }) {
  // const history = useHistory();
  const classes = useStyles();
  const { ugc_images, digg_count, show_count } = ugc_data;
  const hasImage = ugc_images.length > 0;
  return (
    <Box display="flex" pt={1} pb={1} alignItems="center">
      {/* Left Image */}
      <Box>
        {hasImage && (
          <img
            alt={title}
            src={ugc_images[0]}
            // style={{ width: "auto", height: "auto" }}
            style={{ objectFit: "cover", width: "154px", height: "100%" }}
          />
        )}
      </Box>
      {hasImage && <Box p={1} />}
      {/* Info */}
      <Box display="flex" flexDirection="column" justifyContent="center">
        {/* author avatar */}
        <UGCAuthor {...ugc_data.ugc_user} />
        <Box mb={0.9} />
        {/* title - link */}
        <Box
          whiteSpace="pre-wrap"
          textOverflow="ellipsis"
          overflow="hidden"
          maxHeight="57px"
        >
          <Typography
            variant="body2"
            className={clsx(classes.title, classes.link)}
            // onClick={() => history.push(`/news/${item_id}`)}
          >
            {title}
          </Typography>
        </Box>
        <Box pb={0.8} />
        {/* Subtitle */}
        <Typography variant="subtitle2" className={classes.footer}>
          {digg_count}赞&nbsp;·&nbsp;{comments_count}评论
          <span className={classes.show_count}>
            &nbsp;·&nbsp;{numberToChinese(show_count)}展现
          </span>
          &nbsp;·&nbsp;{timeAgo(behot_time)}
        </Typography>
      </Box>
    </Box>
  );
}

export default UGCCard;
