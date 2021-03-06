import React from "react";
import {
  Avatar,
  Box,
  Button,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.secondary,
    borderTop: "2px solid #ed4040",
    [theme.breakpoints.only("md")]: {
      paddingLeft: "2.8rem",
      paddingRight: "0.6rem",
    },
  },
  title: {
    fontWeight: 700,
  },
  link: {
    color: theme.palette.grey[600],
    fontSize: "0.9rem",
    padding: "0.46rem",
    paddingLeft: "0px",
    marginRight: "0.2rem",
    fontWeight: 380,
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer",
    },
    [theme.breakpoints.only("md")]: {
      padding: "0.55rem",
      paddingLeft: "0px",
      paddingRight: "0.2rem",
    },
  },
  largeAvatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));
export function AuthoInfoPanel({
  author_name,
  avatar_url,
  news_id,
  handleDelete,
  handleEdit,
}) {
  const classes = useStyles();
  const user = useSelector((state) => state.app.user);
  const username = user?.username;

  const sm = useMediaQuery((theme) => theme.breakpoints.only("sm"));

  // const handleDelete = async () => {
  //   await newsApi
  //     .deleteNews(news_id, user.token)
  //     .then((res) => console.log(res));
  //   // should be pushed to the category that the deleted news belong to
  //   dispatch(categoryDeleted("xiaohai"));
  //   history.push("/xiaohai");
  // };

  // const handleEdit = () => {
  //   history.push(`/news/edit/${news_id}`);
  // };

  return (
    <Box
      className={classes.root}
      p={3}
      pl={3}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Box display="flex" alignItems="center">
        <Avatar
          src={avatar_url}
          alt={author_name}
          className={classes.largeAvatar}
        />
        <Box mr={2} />
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h5">{author_name}</Typography>
          <Box mt={0.3} />
          {!author_name || username !== author_name ? (
            <Button variant="contained" color="primary" size="small">
              关注
            </Button>
          ) : (
            <Box display={!sm ? "flex" : ""}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleEdit}
              >
                编辑
              </Button>
              <Box m={0.5} />
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleDelete}
              >
                删除
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-start" flexWrap="wrap" mt={1}>
        {/* <Body /> */}
      </Box>
    </Box>
  );
}

export default AuthoInfoPanel;
