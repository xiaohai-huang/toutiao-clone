import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import DisplayCard from "./DisplayCard";
const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.grey[600],
    fontSize: "0.9rem",
    padding: "0.46rem",
    paddingLeft: "0px",
    marginRight: "0.2rem",
    fontWeight: 380,
    "&:hover": {
      color: theme.palette.primary.light,
      cursor: "pointer",
    },
    [theme.breakpoints.only("md")]: {
      padding: "0.55rem",
      paddingLeft: "0px",
      paddingRight: "0.2rem",
    },
  },
}));
function LinksPanel({ title, links }) {
  const classes = useStyles();
  return (
    <DisplayCard title={title}>
      <Box display="flex" justifyContent="flex-start" flexWrap="wrap" mt={1}>
        {links.map((link) => (
          <Typography
            key={link.name}
            className={classes.link}
            variant="subtitle1"
          >
            {link.name}
          </Typography>
        ))}
      </Box>
    </DisplayCard>
  );
}

export default LinksPanel;
