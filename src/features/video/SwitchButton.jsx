import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  autoPlayLabel: {
    color: "#999",
    fontSize: "0.75rem",
  },
}));
// copied from M-UI official example
const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: "ff3183",
        borderColor: "ff3183",
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function SwitchButton({ autoPlay, handleChange }) {
  const classes = useStyles();

  return (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>
            <Typography className={classes.autoPlayLabel}>自动播放</Typography>
          </Grid>
          <Grid item>
            <AntSwitch
              checked={autoPlay}
              onChange={handleChange}
              name="autoPlayCheckButton"
            />
          </Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}
