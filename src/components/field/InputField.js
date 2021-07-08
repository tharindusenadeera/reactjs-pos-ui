import React from "react";
import { InputCustom } from "../input";
import { Label } from "./Label";
import { Error } from "./Error";

/* Props

label = string (Label title)
plusComp = plus button modal component
className = string (Custom class)


placeholder = String (Placeholder text)
errorMsg = String {Error message}

*/

export const InputField = (props) => {
  return (
    <div className="field-row">
      <Label label={props.label} plusComp={props.plusComp} />
      <InputCustom
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
      />
      <Error errorMsg={props.errorMsg} />
    </div>
  );
};
