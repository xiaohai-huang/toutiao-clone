import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import newsApi from "../Api/newsApi";
import ChatIcon from "@material-ui/icons/Chat";
import CreateIcon from "@material-ui/icons/Create";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Tex from "@matejmazur/react-katex";
import math from "remark-math";
import "katex/dist/katex.min.css";

import { formatDate } from "../utility/utility";
import { useDispatch, useSelector } from "react-redux";
import AuthorInfoPanel from "../features/feed/AuthorInfoPanel";
import { categoryDeleted } from "../features/feed/feedSlice";
import MobileHotCard from "../features/company/MobileHotCard";
import HotCard from "../features/company/HotCard";
import useComments from "../utility/useComments.tsx";
import Comment from "../features/common/Comment.tsx";

const renderers = {
  code: ({ language, value }) => {
    if (!value || !language) {
      return <span></span>;
    }
    return (
      <SyntaxHighlighter
        style={atomDark}
        language={language}
        children={value}
      />
    );
  },
  inlineMath: ({ value }) => <Tex math={value} />,
  math: ({ value }) => <Tex block math={value} />,
};

const useStyles = makeStyles((theme) => ({
  buttons: {
    position: "sticky",
    top: "1rem",
  },
  leftTools: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  container: {
    marginTop: "1rem",
  },
  mainContent: {
    [theme.breakpoints.only("md")]: {
      paddingLeft: "2.3rem !important",
    },
    fontSize: "1rem",
  },
  title: {
    fontSize: "2.15rem",
    fontWeight: 700,
    marginBottom: "1rem",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.55rem",
      lineHeight: "2.25rem",
    },
  },
  avatar: {
    width: "2.85rem",
    height: "2.85rem",
  },
  authorName: {
    fontWeight: 500,
  },
  date: {
    color: "#222",
  },
  subscribeButton: {
    border: "0.1px solid #999",
  },
  content: {
    fontSize: "1.15rem",
    lineHeight: "1.67",
  },
  commentButton: {
    fontWeight: 700,
    fontSize: "1.25rem",
    fontFamily: "Georgia",
  },
  authorPanel: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

function NewsDetailsPage({ news, news_id }) {
  const classes = useStyles();
  // const { news_id } = useParams();
  // const { news, isVideo } = useNews(news_id);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.app.user);
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const { comments } = useComments(news_id);

  const handleDelete = async () => {
    await newsApi
      .deleteNews(news_id, user.token)
      .then((res) => console.log(res));
    // should be pushed to the category that the deleted news belong to
    dispatch(categoryDeleted("xiaohai"));
    history.push("/xiaohai");
  };

  const handleEdit = () => {
    history.push(`/news/edit/${news_id}`);
  };

  const { title, content, publish_time, media_user, comment_count } = news;

  const author_name = media_user?.screen_name;
  const avatar_url = media_user?.avatar_url;

  // const hasVideo = isVideo;
  // const videoUrl = "http://techslides.com/demos/sample-videos/small.mp4";

  // parse content
  let html = content;
  html = html
    ?.replace("<html><body>", "")
    .replace("</body></html>", "")
    .replaceAll("<img", ' <img style="width: 100%;" ');
  return (
    <Container maxWidth="xl">
      <Grid container className={classes.container} spacing={3}>
        {/* left tools */}
        <Grid item md={1} className={classes.leftTools}>
          <LeftTools comment_count={comment_count} />
        </Grid>

        {/* Main Content */}
        <Grid item lg={7} md={7} sm={8} xs={12} className={classes.mainContent}>
          <Box>
            <Typography variant="h1" className={classes.title}>
              {title}
            </Typography>
            {/* Author */}

            <Box mt={1} />

            <Author
              author_name={author_name}
              avatar_url={avatar_url}
              publish_time={publish_time}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />

            {/* Main Text */}
            <ReactMarkdown
              source={html}
              escapeHtml={false}
              plugins={[gfm, math]}
              renderers={renderers}
            />
            {/* Comments */}

            <Typography variant="h4">评论</Typography>
            <Box mb={2} />
            {comments?.map((comment) => (
              <Box mb={3}>
                <Comment key={comment.id} {...comment} />
              </Box>
            ))}
            {/* <Button onClick={handleCommentsUpdate}>More Comments</Button> */}
            {/* Headlines */}
            <Box mt={4} />
            {xs && <MobileHotCard />}
            <Box mb={8} />
          </Box>
        </Grid>

        {/* Author Info */}
        <Grid item lg={4} md={4} sm={4} className={classes.authorPanel}>
          <AuthorInfoPanel
            news_id={news_id}
            author_name={author_name}
            avatar_url={avatar_url}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <Box mt={2.5} />
          <HotCard />
          {/* <Box style={{ background: "lightblue" }}>author work lists</Box>
              <img alt={author_name} src={avatar_url} /> */}
        </Grid>
      </Grid>
    </Container>
  );
}

const tools = [
  { label: "转发", icon: <ChatIcon color="error" /> },
  { label: "微博", icon: <FacebookIcon color="primary" /> },
  { label: "Qzone", icon: <InstagramIcon color="action" /> },
  { label: "微信", icon: <TwitterIcon color="secondary" /> },
];
function LeftTools({ comment_count }) {
  const classes = useStyles();
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [commentCount, setCommentCount] = useState(comment_count);
  return (
    <>
      {!(xs || sm) && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          className={classes.buttons}
        >
          <Button
            variant="text"
            color="secondary"
            className={classes.commentButton}
            startIcon={<CreateIcon />}
            onClick={() =>
              setCommentCount((prev) => (prev !== undefined ? prev + 1 : 0))
            }
          >
            {commentCount}
          </Button>
          <Divider />
          {tools.map((tool) => (
            <Box key={tool.label} display="flex" flexDirection="column">
              <Button
                variant="text"
                color="inherit"
                size="large"
                className={classes.socialButton}
                startIcon={tool.icon}
              >
                <Typography noWrap>{tool.label}</Typography>
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
}
function Author({
  author_name,
  avatar_url,
  publish_time,
  handleDelete,
  handleEdit,
}) {
  const classes = useStyles();
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const username = useSelector((state) => state.app.user?.username);
  const pc = (
    <Box display="flex" alignItems="center">
      <Typography variant="subtitle2">{author_name}</Typography>
      <Box mr={1} />
      <Typography variant="subtitle2">{formatDate(publish_time)}</Typography>
    </Box>
  );
  const mobile = (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Box display="flex" alignItems="center">
        <Avatar className={classes.avatar} alt={author_name} src={avatar_url} />
        <Box p={0.5} />
        <Box>
          <Typography className={classes.authorName} variant="subtitle2">
            {author_name}
          </Typography>
          <Typography className={classes.date} variant="subtitle2">
            {formatDate(publish_time, "PPP")}
          </Typography>
        </Box>
      </Box>
      {!author_name || username !== author_name ? (
        <Button className={classes.subscribeButton}>关注</Button>
      ) : (
        <Box display="flex">
          <Button color="primary" variant="contained" onClick={handleEdit}>
            编辑
          </Button>
          <Box m={0.2} />
          <Button color="secondary" variant="contained" onClick={handleDelete}>
            删除
          </Button>
        </Box>
      )}
    </Box>
  );
  return xs ? mobile : pc;
}
export default NewsDetailsPage;

// // old ajax
// ajax("https://a.com/getList",{
//   onSuccess: (data)=>{},
//   onError: (err)=>{}
// })
// // after promisefy
// let newAjax = promisefy(ajax)
// let data = await newAjax("https://a.com/getList")
