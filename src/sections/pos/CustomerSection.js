import React from "react";
import { SelectField } from "../../components/field/SelectField";

export const CustomerSection = () => {
  return (
    <div className="row">
      <div className="col-6">
        <SelectField
          showSearch={true}
          label="Choose a Customer"
          plusComp="customer-create"
          placeholder="Select customer"
        />
      </div>
      <div className="col-6">
        <SelectField
          showSearch={true}
          label="Shipping Address"
          plusComp="shipping-create"
          placeholder="Select Address"
        />
      </div>
    </div>
  );
};
