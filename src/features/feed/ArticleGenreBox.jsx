import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ArticleGenreBox({ options, value, setValue }) {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="article-genre-selector"
      options={options}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}
