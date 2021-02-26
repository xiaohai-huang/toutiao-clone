import { Divider } from "@material-ui/core";
import React from "react";

function CardWrapper({ children }) {
  return (
    <>
      {children}
      <Divider />
    </>
  );
}

export default CardWrapper;
