import React from "react";
import { TextAreaInput } from "../input/TextAreaInput";
import { Label } from "./Label";
import { Error } from "./Error";

/* Props

label = string (Label title)
plusComp = plus button modal component
className = string (Custom class)


placeholder = String (Placeholder text)
errorMsg = String {Error message}

*/

export const TextAreaField = (props) => {
  return (
    <div className="field-row">
      <Label label={props.label} plusComp={props.plusComp} />
      <TextAreaInput placeholder={props.placeholder} />
      <Error errorMsg={props.errorMsg} />
    </div>
  );
};
