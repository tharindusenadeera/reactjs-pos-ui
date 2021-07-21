import React, { Fragment, useState } from "react";
import { InputField } from "../../components/field/InputField";
import { SelectField } from "../../components/field/SelectField";

const list = [
  { key: "1", value: "Fixed Rate" },
  { key: "2", value: "Percentage" },
];

export const DiscountForm = (props) => {
  const [selectedType, setSelectedType] = useState("");
  const [discount, setDiscount] = useState();
  const mobileNoRegex = RegExp("^([0-9]+)$");

  const onChangeType = value => {
    setSelectedType(value);
  }

  const onChangeDiscount = e => {
    if (!mobileNoRegex.test(e.target.value)) {
      return ;
    } else {
      setDiscount(e.target.value)
    }
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <SelectField
            label="Discount Type"
            placeholder="Choose a discount type"
            options={list}
            onChange={onChangeType}
          />
        </div>
        <div className="col-12">
          <InputField
            type="number"
            label="Discount(%)"
            placeholder="Enter discount"
            onChange={onChangeDiscount}
          />
        </div>
      </div>
    </Fragment>
  );
};
