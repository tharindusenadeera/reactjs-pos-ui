import React, { Fragment } from "react";
import { SelectField } from "../../components/field/SelectField";
import { InputField } from "../../components/field/InputField";

export const ShippingCreateForm = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-6">
          <SelectField
            label="Country"
            placeholder="Choose a country"
            showSearch={true}
            errorMsg="This is an error"
          />
        </div>

        <div className="col-6">
          <InputField
            label="Estate"
            placeholder="Enter state name"
            errorMsg="This is an error"
          />
        </div>

        <div className="col-6">
          <SelectField
            label="City"
            placeholder="Choose a city"
            showSearch={true}
            errorMsg="This is an error"
          />
        </div>

        <div className="col-6">
          <InputField
            label="Postal code"
            placeholder="Enter postal code"
            errorMsg="This is an error"
          />
        </div>

        <div className="col-6">
          <InputField
            label="Address"
            placeholder="Enter an address"
            errorMsg="This is an error"
          />
        </div>

        <div className="col-6">
          <InputField
            label="Phone Number"
            placeholder="Enter valid phone number"
            errorMsg="This is an error"
          />
        </div>
      </div>
    </Fragment>
  );
};
