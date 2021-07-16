import React from "react";
import { PasswordCustom } from "../input/Password";
import { Label } from "./Label";
import { Error } from "./Error";

/* Props

label = string (Label title)
plusComp = plus button modal component
className = string (Custom class)


placeholder = String (Placeholder text)
errorMsg = String {Error message}

*/

export const PasswordField = (props) => {
  const { label, plusComp, placeholder, value, disabled, errorMsg, onChange } = props;
  return (
    <div className="field-row">
      <Label label={label} plusComp={plusComp} />
      <PasswordCustom
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      <Error errorMsg={errorMsg} />
    </div>
  );
};
