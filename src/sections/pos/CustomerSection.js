import React from "react";
import { SelectField } from "../../components/field/SelectField";

const customerArr = [{ key: 1, value: "Walk in Customer" }];

export const CustomerSection = () => {
  return (
    <div className="row">
      <div className="col-12 col-sm-6">
        <SelectField
          showSearch={true}
          label="Choose a Customer"
          plusComp="customer-create"
          placeholder="Select customer"
          options={customerArr}
          okText="Add Customer"
        />
      </div>
      <div className="col-12 col-sm-6">
        <SelectField
          showSearch={true}
          label="Shipping Address"
          plusComp="shipping-create"
          placeholder="Select Address"
          okText="Add Address"
        />
      </div>
    </div>
  );
};
