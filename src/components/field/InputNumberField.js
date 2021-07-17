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
  const { label, plusComp, placeholder, value, defaultValue, disabled, errorMsg, changeHandle } = props;
  return ( 
    <div className="field-row">
      <Label label={label} plusComp={plusComp} />
      <InputNumberCustom
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        changeHandle={changeHandle}
      />
      <Error errorMsg={errorMsg} />
    </div>
  );
};
