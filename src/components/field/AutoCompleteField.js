import React from "react";
import { AutoCompleteCustom } from "../input/AutoCompleteCustom";
import { Label } from "./Label";
import { Error } from "./Error";

/* Props

label = string (Label title)
plusComp = plus button modal component
className = string (Custom class)


placeholder = String (Placeholder text)
errorMsg = String {Error message}

*/

export const AutoCompleteField = (props) => {
  const {
    label,
    plusComp,
    placeholder,
    value,
    disabled,
    errorMsg,
    options,
    onSearch,
    onSelect,
    onClear,
  } = props;
  return (
    <div className="field-row">
      <Label label={label} plusComp={plusComp} />
      <AutoCompleteCustom
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onSearch={onSearch}
        onSelect={onSelect}
        options={options}
        onClear={onClear}
      />
      <Error errorMsg={errorMsg} />
    </div>
  );
};
