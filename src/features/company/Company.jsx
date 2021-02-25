import React from "react";
import { Container, makeStyles } from "@material-ui/core";

import LoginCard from "./LoginCard";
import SearchBar from "./SearchBar";
import LinksPanel from "./LinksPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: "1rem",
    },
  },
}));
const more = [
  { name: "关于头条" },
  { name: "加入头条" },
  { name: "媒体报道" },
  { name: "媒体合作" },
  { name: "产品合作" },
  { name: "合作说明" },
  { name: "广告投放" },
  { name: "联系我们" },
  { name: "用户协议" },
  { name: "隐私政策" },
  { name: "侵权投诉" },
  { name: "廉洁举报" },
  { name: "企业认证" },
  { name: "肺炎求助" },
  { name: "辟谣专区" },
];

const friendsLinks = [
  { name: "光明网" },
  { name: "央广网" },
  { name: "国际在线" },
  { name: "中国西藏网" },
  { name: "参考消息" },
  { name: "环球网" },
  { name: "中青在线" },
  { name: "中青网" },
  { name: "中工网" },
  { name: "海外网" },
  { name: "中国网" },
  { name: "未来网" },
  { name: "千龙网" },
  { name: "新京报" },
  { name: "北青网" },
  { name: "法制晚报" },
  { name: "北京晨报" },
  { name: "北京商报" },
  { name: "北京娱乐信报" },
  { name: "奥一网" },
  { name: "金羊网" },
  { name: "华商网" },
  { name: "新民网" },
  { name: "红网" },
  { name: "中国江苏网" },
  { name: "中国江西网" },
  { name: "齐鲁网" },
  { name: "南海网" },
  { name: "安徽网" },
  { name: "河北新闻网" },
  { name: "闽南网" },
  { name: "海峡网" },
  { name: "华声在线" },
  { name: "中国蓝TV" },
  { name: "北国网" },
  { name: "龙虎网" },
  { name: "东莞时间网" },
  { name: "懂车帝" },
  { name: "汽车之家" },
  { name: "Onlylady女人志" },
  { name: "中国搜索" },
  { name: "每日经济新闻" },
  { name: "网上车市" },
  { name: "网通社汽车" },
  { name: "北方网" },
  { name: "湖南省旅发委官网" },
  { name: "乐居网" },
  { name: "人民论坛网" },
  { name: "中国财富网" },
];

function Company() {
  const classes = useStyles();
  return (
    <Container className={classes.root} fixed>
      <SearchBar />
      <LoginCard />
      <LinksPanel title="更多" links={more} />
      <LinksPanel title="友情链接" links={friendsLinks} />
    </Container>
  );
}

export default Company;
