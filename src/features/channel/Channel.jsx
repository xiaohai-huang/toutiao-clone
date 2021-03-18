import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {
  Box,
  Button,
  Hidden,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import useCategories from "../../utility/useCategories";
import { useDispatch, useSelector } from "react-redux";
import { categoryUpdated } from "../feed/feedSlice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "sticky",
  },
  [theme.breakpoints.down("xs")]: {
    root: {
      background: "rgb(244, 245, 246)",
      position: "static",
      flexDirection: "row",
      flexWrap: "nowrap",
      overflow: "hidden",
      "overflow-x": "scroll",
      justifyContent: "flex-start",
    },
    activeButton: {
      color: "rgb(248, 89, 89)",
    },
  },
  textRoot: {
    textAlign: "center",
    justifyContent: "center",
  },
  logo: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      marginBottom: "0.5rem",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  listItem: {
    textAlign: "center",
    justifyContent: "center",
  },
  listItemDense: {
    paddingTop: "2px",
    paddingBottom: "2px",
  },

  gutters: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  noGutters: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  [theme.breakpoints.up("sm")]: {
    activeButton: {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
    },
    button: {
      "&:hover": {
        background: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText,
      },
      [theme.breakpoints.up("sm")]: {
        maxWidth: "130px",
      },
    },
  },
}));
const NavButton = ({ label, active, onClick }) => {
  const classes = useStyles();
  if (active) {
    return (
      <Button
        className={clsx(classes.activeButton, classes.button)}
        color="secondary"
        fullWidth
        disableElevation
        onClick={onClick}
      >
        <Typography noWrap>{label}</Typography>
      </Button>
    );
  }
  return (
    <Button
      className={classes.button}
      variant="text"
      fullWidth
      disableElevation
      onClick={onClick}
    >
      <Typography noWrap>{label}</Typography>
    </Button>
  );
};
// const categories = "推荐，西瓜视频，热点，直播，图片，科技，娱乐，游戏，体育，懂车帝，财经，数码，更多".split(
//   "，"
// );
// const categories = {
//   __all__: "推荐",
//   news_hot: "热点",
//   news_society: "社会",
//   news_entertainment: "娱乐",
//   news_tech: "科技",
//   news_military: "军事",
//   news_sports: "体育",
//   news_car: "汽车",
//   news_finance: "财经",
//   news_world: "国际",
//   news_fashion: "时尚",
//   news_travel: "旅游",
//   news_discovery: "探索",
//   news_baby: "育儿",
//   news_regimen: "养生",
//   news_story: "故事",
//   news_essay: "美文",
//   news_game: "游戏",
//   news_history: "历史",
//   news_food: "美食",
//   software: "软件",
//   internet: "互联网",
//   smart_home: "智能家居",
// };
export default function Channel() {
  const history = useHistory();
  const classes = useStyles();
  const categories = useCategories();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const currentCategoryCode = useSelector((state) => state.feed.category);
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  // fix memory leak
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  const handleClick = (category) => {
    return () => {
      if (isMounted) {
        dispatch(categoryUpdated(category));
        history.push("/" + category);
      }
    };
  };

  return (
    <List className={classes.root} disablePadding>
      {/* Logo */}
      <ListItem
        className={classes.logo}
        classes={{ root: classes.textRoot, gutters: classes.gutters }}
      >
        {/* PC logo */}
        <Hidden xsDown>
          <Box onClick={() => history.push("/")}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAAA2CAMAAACSsKctAAAANlBMVEVHcEzuQEDwRETyRUX3TEzvQkLuQEDuQUHuQUHvQEDuQUHuQEDvQkLuQEDuQUHwQUHxQkLtQEDKaksGAAAAEXRSTlMAxiweDlyo49Nri/F5+bhLOapXaIgAAATMSURBVGje7ZrpsqQqDIAb2VEE3/9lx263AAmu3XVv1cn8mFOtIh+JIQuvFyFSzdK8/jsSrbg7BG+HSdjPZi3iJPTchR7a7iYam7mGNvwKTM5vlOQd6n3Z37IhN6zSNhW1TsJqMt/TwQk6G3gxmt0DC5/LfpxS9U38wOJ9RJN38uG4KGBR0wRNxrcHtn4dlPjpv4pCYzqEEffBfAG2XDC9sxyCUbbfH3wVDdbkS2P4FzQGRR4As8NdsEYXy01Y4xMa28C6KljT3gUDXNtYOn5fY3UwNtwEA9+XA397+zONxR03fQ1MerjG0Is4QYK5riLzEMDdC4+CuQoY99sKoW9R20z5zsKwN0gAczDFUohdPzSKRpw4j9Yp0+Jg2GgCrHBf3sAVuIytC8u4RjIwYmGOh8AMvTutfLtgydR8ZjzCgeV32M7eFlyZj2T8GY3lfHwNmChTGmcP5tECNNFBf4m4AqEGhGt8rYEj2i+AwUhwFCocgOs+ok383MFfMecdoGYUHFwkW76Jz5kiHlmQ4TtPY48+iNAnfqgX1a+vtNMueXyjvqox5WTkJFgthq3t0i2ydhY+4MsbYhKMtEu6dxFseqw1Gd+s2raasylPRgCluoJJgnnU3SYaHbS8Y4rJBv3h42AFdN1gGzwWZtgcMHD3Xk5BfYOz67qlsWKDnq3G1DP74DTCZVwQVbA1X57WpWWqk40od4svgInKBrtUPJSpfGPGyYYC6zma/OjJm0RzBcwcBONltAzKIVYxfyBObJlbFAHAtKSyOla4x+c1FiuhAxvOiDcpWBKo4GDbp3sLDA2CJR07EGCaUZYJwUys5OGgBhdYCRYFIWQQHKzrjU/AXCUdQ8C0e0+Y295XwbSsFhiS4qLUC9hePsZ2QqqVT4I3NvtgvrfbXQLxkwsYUoWsgI37uX4GbOXj231+J332DPHsXKb+cknCkC2gkZ1iLQE2RtRPgiVJq6mAadVtUKL5CAea69v9qGxxs/KTMLFrVaozYLLi7UcwrVxWY3XYtjfu32q07cOF/Ob7YKpWLm0Emewj+7m43Ud5EGzdAvjJKnz/jTbCg2B2OBIpXgBzZl9a/xFdhBChwYWXYIEYe1GYzn6fHlPIE3rJDhBBTPxIPHYng5bDObEXQqrEK34PTP+B/c/A/kzxD+wUWLB1AXVJd8cUm3Jkv1W/SpmGlsiVOUw32GxPbMVbZtA9WwneGjo+Xun/34s8hEGLqQ+AgUaVff0cDHCpJ7stSZvKTVW//vNPoXVuNV3rVQ7WVR+juRjRfLqtMeuzkWOtG2SxdtrnuehrSc9utyBpwjwB5sp23eqdI33Og5Wm6IZan3eXKz/wcc8UYdl87ZOsrUtDZmzz6xIwoU9nB2CHKw5FLGBWVkQXzrTsu4Fvw1K+JGRWmjoPiTjto6eqysMeF08NFA0chRVu8jNRyzpogXpF6rF9LuSw2MVzHtnphMxRNLgj6IasdpCBNef8B+CKj53zyI5tWOqdATsP0VP7GPoYJd1QDQuuagw2f30xj9URaFF6MM8pMPSxfa7w4FmqxtTb4YgjCOVPReQRanvgKa5TGuvQ7j9+rq5QD6aNMqRa/LffKb9JvQoR6Al9XCQyrCZCIL5eX5Z4+QEscJfekj/2D7KhSDEKe9jHAAAAAElFTkSuQmCC"
              alt="今日头条"
              style={{ width: "108px", height: "27px" }}
            />
          </Box>
        </Hidden>
      </ListItem>
      {/* Nav Buttons */}
      {Object.keys(categories).map((categoryCode) => {
        return (
          <ListItem
            key={categoryCode}
            dense
            className={classes.listItem}
            classes={{
              dense: classes.listItemDense,
              gutters: !xs ? classes.gutters : classes.noGutters,
            }}
          >
            <NavButton
              active={categoryCode === currentCategoryCode}
              label={categories[categoryCode]}
              onClick={handleClick(categoryCode)}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
