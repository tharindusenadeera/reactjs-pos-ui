import React, { Fragment, useRef } from "react";
import { SelectCustom } from "../select/index";
import { Label } from "./Label";

/* Props

plusComp = plus button modal component

*/

export const SelectField = (props) => {
  const { showSearch, placeholder, options } = props;

  return (
    <Fragment>
      <Label label={props.label} plusComp={props.plusComp} />
      <SelectCustom
        showSearch={showSearch}
        placeholder={placeholder}
        options={options}
      />
    </Fragment>
  );
};
