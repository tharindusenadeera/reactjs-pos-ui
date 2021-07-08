import React, { Fragment } from "react";
import { SelectField } from "../../components/field/SelectField";
import { InputField } from "../../components/field/InputField";
import { TextAreaField } from "../../components/field/TextAreaField";

export const ShippingCost = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-6">
          <InputField
            label="Customer"
            value="Daniel Redcliff"
            errorMsg="This is an error"
            disabled={true}
          />
        </div>

        <div className="col-6">
          <SelectField
            label="Shipping Address"
            placeholder="Choose an address"
            showSearch={true}
            errorMsg="This is an error"
          />
        </div>

        <div className="col-6">
          <InputField
            label="Shipping Charges"
            placeholder="Enter shipping charges"
            errorMsg="This is an error"
          />
        </div>

        <div className="col-6">
          <SelectField
            label="Shipping Status"
            placeholder="Choose a option"
            showSearch={true}
            errorMsg="This is an error"
          />
        </div>

        <div className="col-12">
          <TextAreaField
            label="Shipping Charges"
            placeholder="Describe charges"
            errorMsg="This is an error"
          />
        </div>
      </div>
    </Fragment>
  );
};
