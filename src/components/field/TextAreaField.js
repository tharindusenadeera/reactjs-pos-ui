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
  const { label, plusComp, placeholder, errorMsg, onChange } = props;
  return (
    <div className="field-row">
      <Label label={label} plusComp={plusComp} />
      <TextAreaInput placeholder={placeholder} onChange={onChange}/>
      <Error errorMsg={errorMsg} />
    </div>
  );
};
