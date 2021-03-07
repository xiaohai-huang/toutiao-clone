import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Tex from "@matejmazur/react-katex";
import math from "remark-math";
import "katex/dist/katex.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import CodeTextArea from "../utility/CodeTextArea";
import ArticleGenreBox from "../features/feed/ArticleGenreBox";
import ImageUploadButton from "../features/feed/ImageUploadButton";
import newsApi from "../Api/newsApi";
import { categoryDeleted } from "../features/feed/feedSlice";
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
// does not support "微头条"
const genreTypes = ["普通文章"];
const genreCH2ENG = { 普通文章: "article", 微头条: "ugc" };
const genreENG2CH = { article: "普通文章", ugc: "微头条" };
function NewsEditPage() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState(genreTypes[0]); // "普通文章"
  const [imageSrc, setImageSrc] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { news_id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  if (!user) {
    history.push("/login");
  }
  // fetch news content and populate it to the form
  useEffect(() => {
    newsApi.getNewsById(news_id).then((news) => {
      const {
        title: n_title,
        content: n_content,
        article_genre: n_article_genre,
        image_url,
      } = news;
      setTitle(n_title);
      setGenre(genreENG2CH[n_article_genre]);
      setImageSrc(image_url);
      setContent(n_content);
    });
  }, [news_id]);

  const handleOnSubmit = () => {
    // has images or videos ==> single_mode=true
    setSubmitting(true);
    newsApi
      .editNews(
        {
          title,
          article_genre: genreCH2ENG[genre],
          single_mode: Boolean(imageSrc),
          content,
          image_url: imageSrc,
        },
        news_id,
        user.token
      )
      .then((res) => res.json())
      .then((js) => {
        const { item_id } = js;
        setSubmitting(false);
        dispatch(categoryDeleted("xiaohai"));
        history.push(`/news/${item_id}`);
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
      });
  };
  // article_genre
  return (
    <Box mt={1}>
      <Container maxWidth="lg">
        <Typography variant="h3" color="secondary">
          编辑你的头条
        </Typography>
        <Box mt={2} />
        {/* artile base info */}
        <Grid container spacing={2} item xs={12} sm={6} alignItems="flex-end">
          <Grid item xs={6}>
            <TextField
              required
              id="title"
              label="标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <ArticleGenreBox
              value={genre}
              setValue={setGenre}
              options={genreTypes}
              label="新闻类型"
              variant="standard"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <ImageUploadButton label="封面图片" setImageSrc={setImageSrc} />
            {imageSrc && (
              <Box display="flex" alignItems="flex-end">
                <img src={imageSrc} alt="" width="200px" height="200px" />
                <IconButton onClick={() => setImageSrc("")}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
        </Grid>

        <Box mt={2} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CodeTextArea
              id="standard-basic"
              label="内容"
              multiline
              spellCheck={false}
              fullWidth
              variant="outlined"
              value={content}
              onChange={setContent}
            />
            <Box mt={2} />

            <Box display="flex" alignItems="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOnSubmit}
                disabled={!content || !title || !genre || submitting}
              >
                保存
              </Button>
              {submitting && (
                <Box ml={1} width="100%">
                  <LinearProgress color="secondary" />
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReactMarkdown
              source={content}
              escapeHtml={false}
              plugins={[gfm, math]}
              renderers={renderers}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NewsEditPage;
