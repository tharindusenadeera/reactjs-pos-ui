import React, { Fragment } from "react";
import { InputField } from "../../components/field/InputField";

export const DiscountForm = ({onChange}) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <InputField
            label="Discount(%)"
            placeholder="Enter discount"
            onChange={onChange}
          />
        </div>
      </div>
    </Fragment>
  );
};
