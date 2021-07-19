import React from "react";
import { SelectCustom } from "../select/index";
import { Label } from "./Label";
import { Error } from "./Error";

/* Props

label = string (Label title)
className = string (Custom class)
plusComp = plus button modal component
okText = Modal Submit button text

showSearch = Boolean (True means enable search behavior)
placeholder = String (Placeholder text)
errorMsg = String {Error message}

*/

export const SelectField = (props) => {
  const {
    showSearch,
    placeholder,
    options,
    label,
    plusComp,
    okText,
    errorMsg,
    onChange,
    value,
    hideCancel,
    hideSubmit,
  } = props;

  return (
    <div className="field-row">
      <Label
        label={label}
        plusComp={plusComp}
        okText={okText}
        hideCancel={hideCancel}
        hideSubmit={hideSubmit}
      />
      <SelectCustom
        showSearch={showSearch}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        value={value}
      />
      <Error errorMsg={errorMsg} />
    </div>
  );
};
