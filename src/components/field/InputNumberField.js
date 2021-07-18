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
  const { label, plusComp, placeholder, value, defaultValue, disabled, errorMsg, onClickPlus, onClickMinus, onChange } = props;
  console.log('value :', value);
  console.log('DV :', defaultValue);
  return ( 
    <div className="field-row">
      <Label label={label} plusComp={plusComp} />
      <InputNumberCustom
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onClickPlus={onClickPlus}
        onClickMinus={onClickMinus}
        onChange={onChange}
      />
      <Error errorMsg={errorMsg} />
    </div>
  );
};
