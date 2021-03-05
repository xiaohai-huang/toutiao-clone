import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

export default function ImageUploadButton({ imageSrc, setImageSrc }) {
  const classes = useStyles();
  function encodeImageFileAsURL(element) {
    const file = element.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setImageSrc(reader.result);
      console.log("RESULT", reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => encodeImageFileAsURL(e.target)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          封面图片
        </Button>
      </label>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={(e) => encodeImageFileAsURL(e.target)}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      {imageSrc && (
        <Box display="flex" alignItems="flex-end">
          <img src={imageSrc} alt="" width="200px" height="200px" />
          <IconButton onClick={() => setImageSrc("")}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </div>
  );
}
