import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

export default function ImageUploadButton({ label, setImageSrc }) {
  const classes = useStyles();
  // https://codepen.io/tuanitpro/pen/wJZJbp?editors=1010
  function encodeImageFileAsURL(element) {
    const file = element.files[0];
    const img = document.createElement("img");
    const reader = new FileReader();
    reader.onloadend = function (e) {
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const newCtx = canvas.getContext("2d");
        newCtx.drawImage(img, 0, 0, width, height);
        const dataurl = canvas.toDataURL();

        setImageSrc(dataurl);
      };
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={(e) => encodeImageFileAsURL(e.target)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          {label}
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
    </div>
  );
}
