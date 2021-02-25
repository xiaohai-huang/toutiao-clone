import React from "react";
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.secondary,
  },
  paper: {
    background: theme.palette.background.default,
  },
  text: {
    color: theme.palette.grey[600],
  },
}));

function LoginCard() {
  const classes = useStyles();
  return (
    <Box className={classes.root} p={2}>
      <Paper className={classes.paper} elevation={1}>
        <Box
          p={2}
          pl={3}
          pr={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
          alignContent="center"
          textAlign="center"
        >
          <Typography className={classes.text} variant="caption">
            登录后可以保存您的浏览喜好、评论、收藏，并与APP同步，更可以发布微头条
          </Typography>
          <Box mt={2} />
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            disableElevation
          >
            登录
          </Button>
          {/* Social Media Login */}
          <Box mt={1}>
            <IconButton disableRipple>
              <Box display="flex" flexDirection="column">
                <img
                  alt="QQ"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAA4VBMVEVHcExKlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM5KlM4AAAAAAAAAAAAAAAAAAAAAAAAAAAD1rAX5rgUAAABcQAo+KwicbQ35rgX5rgVMPiQAAAAAAACaFhWFFBN9ExMAAAD////pHx9KlM4jDwb3rAaVlZUdHR0IBgI1NTXn5+dVVVVgYGDDw8PrNDGzfQpOIgvMJiTyYV70d3P90M/W1tbnIiH16OdtHRrvS0dDQ0O4IyKXaQvTkwlfSUzCAAAALXRSTlMAELO/ovQxBReTu985Y/CYCSTrWd3Wg0DKge8HT7IU0cOl49/faDHxMpfHRd9eRY/uAAAB6klEQVQ4y5VV6XqiQBAcEAQ08T4AFTXXl6tFFgjgFdd8Od//gXbURGuIJmz/GrprpqdrqhvG0LR2S26o47HakFttjR2zqlFrGvW8Xqno+brRrBnVgzBdUY08OvKGqujfcael8jevXi6dplyaUjw5lOakqAhXlXIF6fC9pUIOIlpOPlqiJuf2MaVwnAqmFZRdHUWJ/WBS8bMivSTUcW0Nh9a1UFFpy4dSBqfTo431HHCWN8mrKvDXMenTzA7wqa7fyDBgr0XkR0EQ+UQWuNcYrQbv1rGJojhJ/AmRDUfmaxprN2Fnl+ec+PHraMUXXQg026yVykxBEoZxQKncLSbX4XtI4fvHH24f7yENIVCXWQOlxbmZz9bA2ZwzhJJrMCSH3c89otDzQiJvfo+CU9m4sv+8c133abF4e1ssnvjybh+pjAXgrSvYrQCE1B3be17yM6fT6cvj8tkDJnlqKIaz+PDXdR9HG3tAJnkxQM+NAHwlukF6gHBzDXyZLncnmkg4PKHdM4PRzgKzZ+MTgihMx6LVF25FlmOiKASZOXbyBUxsR5SZKNwu+Vucj+LZChdb4Wow8+JJFE1ibza4SrUCNtfloN+/ODs/P7vo9weX6ebK3K7ZB0D2kZJ5SGUfe9kH6X+M5uzD/pffxz88hEUgI+Q2SQAAAABJRU5ErkJggg=="
                />
                <Typography variant="caption">QQ</Typography>
              </Box>
            </IconButton>

            <IconButton disableRipple>
              <Box display="flex" flexDirection="column">
                <img
                  alt="WeChat"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAANlBMVEVHcEw0wB80wB80wB80wB80wB80wB80wB80wB80wB80wB80wB80wB80wB80wB80wB80wB80wB/sFR1eAAAAEXRSTlMAM6J/wPPbFJQGsmdaQeok+zjJjmUAAAFoSURBVDjLlVWJsoMwCCQXkEvN///swz4N0V4pM45tsoGwLAgwWqwuYWgtYHI1wjtbeUEuhmIkUxgXXl/CyAY244LhYOkZlwM/rRKHfFuKFs2rMAbt5arkPb2+93Un+vQ2xZi87ln/ngrxYnseSPDBCI+MKBj4aCb8O7IMX4wfwdeggalwSpzvN6Gw14i7w+ikzLttd+53TFxMT6+dtt3SM0uEiue/JIAH1otjf3WJFdwZuQrEgd0xTn6Wa2wH6Vxh2cWCrS3ZS+wrFSVBF4PesHnHydsxeYPQyUkd544zg8YoQDvL7M6M3aJHOnNNgXSQ6MW1K/I2csAoUOtSDi/ycBZglZOsoQdll20H5jaY12SSEhZDCzegVXocDxxUWOuKA7Ao4VrCPgSGyFFLqKLQzt1OHA2iGGQ2joxdQUrjAzMKd9AqibDyRbjTrTDfXNPtOj8A5kfK9JCaH3vzg/SH0Tw/7L98Pv4APSQWTNn31goAAAAASUVORK5CYII="
                />
                <Typography variant="caption">微信</Typography>
              </Box>
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginCard;
