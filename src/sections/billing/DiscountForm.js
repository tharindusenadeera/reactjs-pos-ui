import React, { Fragment } from "react";
import { InputField } from "../../components/field/InputField";

export const DiscountForm = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <InputField
            label="Discount"
            placeholder="Enter discount"
            errorMsg="This is an error"
          />
        </div>
      </div>
    </Fragment>
  );
};
