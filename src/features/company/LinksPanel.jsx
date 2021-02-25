import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.secondary,
    borderTop: "2px solid #ed4040",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "2.8rem",
    },
  },
  title: {
    fontWeight: 700,
  },
  link: {
    color: theme.palette.grey[600],
    fontSize: "0.9rem",
    padding: "0.46rem",
    paddingLeft: "0px",
    marginRight: "0.2rem",
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0.55rem",
      paddingLeft: "0px",
    },
  },
}));
function LinksPanel({ title, links }) {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      p={3}
      pl={4}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Typography className={classes.title} variant="h6">
        {title}
      </Typography>
      <Box display="flex" justifyContent="flex-start" flexWrap="wrap" mt={1}>
        {links.map((link) => (
          <Typography className={classes.link} variant="subtitle1">
            {link.name}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default LinksPanel;
