import { TextField } from "@material-ui/core";
import React, { useRef } from "react";

// https://stackoverflow.com/a/56173415
export default function CodeTextArea({ onChange, value, ...props }) {
  const textArea = useRef();
  const runAfterUpdate = useRunAfterUpdate();
  return (
    <TextField
      ref={textArea}
      onKeyDown={(e) => {
        if (e.key === "Tab") {
          e.preventDefault();

          const { selectionStart, selectionEnd } = e.target;
          onChange(
            (prev) =>
              prev.substring(0, selectionStart) +
              "  " +
              prev.substring(selectionEnd)
          );
          // move the cursor to the inserted position
          runAfterUpdate(() => {
            e.target.selectionEnd = e.target.selectionStart =
              selectionStart + 2;
          });
        }
      }}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      {...props}
    />
  );
}

function useRunAfterUpdate() {
  const afterPaintRef = React.useRef(null);
  React.useLayoutEffect(() => {
    if (afterPaintRef.current) {
      afterPaintRef.current();
      afterPaintRef.current = null;
    }
  });
  const runAfterUpdate = (fn) => (afterPaintRef.current = fn);
  return runAfterUpdate;
}
