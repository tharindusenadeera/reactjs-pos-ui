import React from "react";
import { InputNumberCustom } from "../input/InputNumberCustom";
import { Label } from "./Label";
import { Error } from "./Error";

/* Props

label = string (Label title)
plusComp = plus button modal component
className = string (Custom class)


placeholder = String (Placeholder text)
errorMsg = String {Error message}

*/

export const InputNumberField = (props) => {
  return (
    <div className="field-row">
      <Label label={props.label} plusComp={props.plusComp} />
      <InputNumberCustom
        placeholder={props.placeholder}
        value={props.value}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
      />
      <Error errorMsg={props.errorMsg} />
    </div>
  );
};
