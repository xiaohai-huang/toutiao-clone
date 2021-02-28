import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import newsApi from "../Api/newsApi";
import ChatIcon from "@material-ui/icons/Chat";
import CreateIcon from "@material-ui/icons/Create";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import parse from "html-react-parser";

import SearchBar from "../features/company/SearchBar";
import { formatDate } from "../utility/utility";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  fakeAppBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    // top: "47px",
    top: "46px",
    zIndex: 0,
  },
  appBar: {
    borderLeft: "none",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  toolBar: {
    height: "58px",
  },
  indexBread: {
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.grey[400],
    },
  },
  logo: {
    width: "108px",
    height: "27px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  container: {
    marginTop: "1rem",
    // border: "1px solid red",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
  },
  content: {
    fontSize: "1rem",
    lineHeight: "28px",
  },
  commentButton: {
    fontWeight: 700,
    fontSize: "1.25rem",
    fontFamily: "Georgia",
  },
}));
function DetailsPageAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const category = useSelector((state) => state.feed.category);
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar variant="dense" className={classes.toolBar}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box className={classes.leftNav} display="flex" alignItems="center">
            <img
              onClick={() => history.push("/")}
              alt="logo"
              className={classes.logo}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAAA2CAMAAACSsKctAAAANlBMVEVHcEzuQEDwRETyRUX3TEzvQkLuQEDuQUHuQUHvQEDuQUHuQEDvQkLuQEDuQUHwQUHxQkLtQEDKaksGAAAAEXRSTlMAxiweDlyo49Nri/F5+bhLOapXaIgAAATMSURBVGje7ZrpsqQqDIAb2VEE3/9lx263AAmu3XVv1cn8mFOtIh+JIQuvFyFSzdK8/jsSrbg7BG+HSdjPZi3iJPTchR7a7iYam7mGNvwKTM5vlOQd6n3Z37IhN6zSNhW1TsJqMt/TwQk6G3gxmt0DC5/LfpxS9U38wOJ9RJN38uG4KGBR0wRNxrcHtn4dlPjpv4pCYzqEEffBfAG2XDC9sxyCUbbfH3wVDdbkS2P4FzQGRR4As8NdsEYXy01Y4xMa28C6KljT3gUDXNtYOn5fY3UwNtwEA9+XA397+zONxR03fQ1MerjG0Is4QYK5riLzEMDdC4+CuQoY99sKoW9R20z5zsKwN0gAczDFUohdPzSKRpw4j9Yp0+Jg2GgCrHBf3sAVuIytC8u4RjIwYmGOh8AMvTutfLtgydR8ZjzCgeV32M7eFlyZj2T8GY3lfHwNmChTGmcP5tECNNFBf4m4AqEGhGt8rYEj2i+AwUhwFCocgOs+ok383MFfMecdoGYUHFwkW76Jz5kiHlmQ4TtPY48+iNAnfqgX1a+vtNMueXyjvqox5WTkJFgthq3t0i2ydhY+4MsbYhKMtEu6dxFseqw1Gd+s2raasylPRgCluoJJgnnU3SYaHbS8Y4rJBv3h42AFdN1gGzwWZtgcMHD3Xk5BfYOz67qlsWKDnq3G1DP74DTCZVwQVbA1X57WpWWqk40od4svgInKBrtUPJSpfGPGyYYC6zma/OjJm0RzBcwcBONltAzKIVYxfyBObJlbFAHAtKSyOla4x+c1FiuhAxvOiDcpWBKo4GDbp3sLDA2CJR07EGCaUZYJwUys5OGgBhdYCRYFIWQQHKzrjU/AXCUdQ8C0e0+Y295XwbSsFhiS4qLUC9hePsZ2QqqVT4I3NvtgvrfbXQLxkwsYUoWsgI37uX4GbOXj231+J332DPHsXKb+cknCkC2gkZ1iLQE2RtRPgiVJq6mAadVtUKL5CAea69v9qGxxs/KTMLFrVaozYLLi7UcwrVxWY3XYtjfu32q07cOF/Ob7YKpWLm0Emewj+7m43Ud5EGzdAvjJKnz/jTbCg2B2OBIpXgBzZl9a/xFdhBChwYWXYIEYe1GYzn6fHlPIE3rJDhBBTPxIPHYng5bDObEXQqrEK34PTP+B/c/A/kzxD+wUWLB1AXVJd8cUm3Jkv1W/SpmGlsiVOUw32GxPbMVbZtA9WwneGjo+Xun/34s8hEGLqQ+AgUaVff0cDHCpJ7stSZvKTVW//vNPoXVuNV3rVQ7WVR+juRjRfLqtMeuzkWOtG2SxdtrnuehrSc9utyBpwjwB5sp23eqdI33Og5Wm6IZan3eXKz/wcc8UYdl87ZOsrUtDZmzz6xIwoU9nB2CHKw5FLGBWVkQXzrTsu4Fvw1K+JGRWmjoPiTjto6eqysMeF08NFA0chRVu8jNRyzpogXpF6rF9LuSw2MVzHtnphMxRNLgj6IasdpCBNef8B+CKj53zyI5tWOqdATsP0VP7GPoYJd1QDQuuagw2f30xj9URaFF6MM8pMPSxfa7w4FmqxtTb4YgjCOVPReQRanvgKa5TGuvQ7j9+rq5QD6aNMqRa/LffKb9JvQoR6Al9XCQyrCZCIL5eX5Z4+QEscJfekj/2D7KhSDEKe9jHAAAAAElFTkSuQmCC"
            />
            <Box ml={2} />
            <Breadcrumbs aria-label="breadcrumb">
              <Typography
                color="inherit"
                className={classes.indexBread}
                onClick={() => history.push("/" + category)}
              >
                首页
              </Typography>
              <Typography color="textPrimary">正文</Typography>
            </Breadcrumbs>
          </Box>

          <SearchBar />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function FakeAppBar() {
  const classes = useStyles();

  return (
    <AppBar
      position="absolute"
      color="inherit"
      elevation={1}
      className={classes.fakeAppBar}
    >
      <Toolbar variant="dense"></Toolbar>
    </AppBar>
  );
}

function NewsDetailsPage() {
  const { news_id } = useParams();
  const classes = useStyles();
  const [news, setNews] = useState({});
  const [comments, setComments] = useState([]);
  const [offset, setOffset] = useState(0);
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  // initial fetch
  useEffect(() => {
    newsApi.getNewsById(news_id).then((n) => setNews(n));
    newsApi.getCommentsById(news_id, offset).then((json) => {
      const newComments = json.data;
      if (comments === newComments) {
      }
      setComments((prev) => [...prev, ...newComments]);
      setOffset(Number(json.offset));
    });
    // eslint-disable-next-line
  }, [news_id]);
  // fetch extra comments
  // if the user press the more comments button
  const handleCommentsUpdate = () => {
    newsApi.getCommentsById(news_id, offset).then((json) => {
      const newComments = json.data;
      setComments((prev) => [...prev, ...newComments]);
      setOffset(Number(json.offset));
    });
  };
  const { title, content, publish_time, media_user, comment_count } = news;
  const author_name = media_user?.screen_name;

  const avatar_url = media_user?.avatar_url;
  const tools = [
    { label: "转发", icon: <ChatIcon /> },
    { label: "微博", icon: <FacebookIcon /> },
    { label: "Qzone", icon: <InstagramIcon /> },
    { label: "微信", icon: <TwitterIcon /> },
  ];
  // parse content
  let html = content;
  html = html
    ?.replace("<html><body>", "")
    .replace("</body></html>", "")
    .replaceAll("<img", ' <img style="width: 100%;" ');
  return (
    <>
      <FakeAppBar />
      <Container maxWidth="lg">
        <DetailsPageAppBar />
        <Grid container className={classes.container} spacing={2}>
          {/* left tools */}
          {!xs && (
            <Grid item lg={1} sm={2}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Button
                  variant="text"
                  color="secondary"
                  className={classes.commentButton}
                  startIcon={<CreateIcon />}
                >
                  {comment_count}
                </Button>
                <Divider />
                {tools.map((tool) => (
                  <Box key={tool.label} display="flex" flexDirection="column">
                    <Button
                      variant="text"
                      color="inherit"
                      className={classes.socialButton}
                      startIcon={tool.icon}
                    >
                      {tool.label}
                    </Button>
                  </Box>
                ))}
              </Box>
            </Grid>
          )}
          {/* Main Content */}
          <Grid item lg sm={10} md={8} xs={12}>
            {content ? (
              // wrapper
              <Box>
                <Typography variant="h1" className={classes.title}>
                  {title}
                </Typography>
                {/* Author */}

                <Box mt={1} />
                <Box display="flex">
                  <Typography variant="subtitle2">{author_name}</Typography>
                  <Box mr={1} />
                  <Typography variant="subtitle2">
                    {formatDate(publish_time)}
                  </Typography>
                </Box>

                {/* Main Text */}
                {content && parse(html)}

                {/* Comments */}
                <Button onClick={handleCommentsUpdate}>More Comments</Button>
              </Box>
            ) : (
              <LinearProgress color="secondary" />
            )}
          </Grid>

          {/* Author Info */}
          {!(sm || xs) && (
            <Grid item lg={3}>
              {/* <AuthoInfoPanel /> */}
              <Box style={{ background: "lightblue" }}>author work lists</Box>
              <img alt={author_name} src={avatar_url} />
            </Grid>
          )}
        </Grid>
        {/* <p>news details for {news_id}</p> */}
      </Container>
    </>
  );
}

export default NewsDetailsPage;
