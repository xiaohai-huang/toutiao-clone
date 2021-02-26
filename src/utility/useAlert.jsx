import React from "react";
import { IconButton, Box, Typography, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  root: (props) => {
    let bg = props.bg ? props.bg : "rgba(96,163,245,.85)";
    return {
      background: bg,
      color: "#fff",
      height: "2rem",
      borderRadius: "2px",
    };
  },
  text: {
    cursor: "pointer",
  },
}));

function useAlert(text, setOpen, bg) {
  const classes = useStyles(bg);
  return () => (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box />
      <Typography className={classes.text} variant="body2" onClick={() => {}}>
        {text}
      </Typography>
      <IconButton
        component="span"
        color="inherit"
        onClick={() => setOpen((prev) => !prev)}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default useAlert;
