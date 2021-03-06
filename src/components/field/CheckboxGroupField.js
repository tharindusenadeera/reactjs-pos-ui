import React from "react";
import { CheckboxGroup } from "../checkbox/CheckboxGroup";
import { Label } from "./Label";
import { Error } from "./Error";

/* Props

label = string (Label title)
className = string (Custom class)


placeholder = String (Placeholder text)
errorMsg = String {Error message}

*/

export const CheckboxGroupField = (props) => {
  return (
    <div className="field-row">
      {props.label ? <Label label={props.label} /> : ""}
      <CheckboxGroup
        onChange={props.onChange}
        options={props.options}
        defaultValue={props.defaultValue}
        value={props.value}
      />
      <Error errorMsg={props.errorMsg} />
    </div>
  );
};
