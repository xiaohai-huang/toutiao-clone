import {
  AppBar,
  Box,
  Breadcrumbs,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

import SearchBar from "../company/SearchBar";
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
}));

function MyAppBar({ children }) {
  return (
    <>
      <FakeAppBar />
      <Container maxWidth="lg">
        <DetailsPageAppBar />
      </Container>
      {children}
    </>
  );
}
const categoryToChinese = {
  __all__: "推荐",
  xigua: "西瓜视频",
  news_hot: "热点",
  xiaohai: "找工作",
  news_entertainment: "娱乐",
  news_tech: "科技",
  news_military: "军事",
  news_history: "历史",
  news_food: "美食",
  software: "软件",
  internet: "互联网",
  news_sports: "体育",
  news_car: "汽车",
};
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
      <Toolbar variant="dense" className={classes.toolBar} disableGutters>
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
                {categoryToChinese[category]}
              </Typography>
              <Typography color="textPrimary">正文</Typography>
            </Breadcrumbs>
          </Box>
          <Box minWidth="275px">
            <SearchBar />
          </Box>
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
export default MyAppBar;
