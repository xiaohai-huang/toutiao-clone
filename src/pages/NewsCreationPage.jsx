import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Tex from "@matejmazur/react-katex";
import math from "remark-math";
import "katex/dist/katex.min.css";

import CodeTextArea from "../utility/CodeTextArea";
import ArticleGenreBox from "../features/feed/ArticleGenreBox";
import ImageUploadButton from "../features/feed/ImageUploadButton";
const renderers = {
  code: ({ language, value }) => {
    console.log(language, value);
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

const genreTypes = ["普通文章", "微头条"];
function NewsCreationPage() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState(genreTypes[0]);
  const [imageSrc, setImageSrc] = useState("");
  const [content, setContent] = useState("");
  // article_genre
  return (
    <Box mt={1}>
      <Container maxWidth="lg">
        <Typography variant="h3" color="secondary">
          创建今日头条
        </Typography>
        <Box mt={2} />
        {/* artile base info */}
        <Grid container spacing={2} item xs={12} sm={6} alignItems="flex-end">
          <Grid item xs={6}>
            <TextField
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
            <ImageUploadButton imageSrc={imageSrc} setImageSrc={setImageSrc} />
          </Grid>
        </Grid>

        <Box mt={2} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CodeTextArea
              id="standard-basic"
              label="Markdown"
              multiline
              spellCheck={false}
              fullWidth
              variant="outlined"
              value={content}
              onChange={setContent}
            />
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
        <Box mt={2} />
        <Button variant="contained" color="secondary">
          创建
        </Button>
      </Container>
    </Box>
  );
}

export default NewsCreationPage;
