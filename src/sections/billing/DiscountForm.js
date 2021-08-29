import React, { Fragment, useState } from "react";
import { InputField } from "../../components/field/InputField";
import { SelectField } from "../../components/field/SelectField";

const list = [
  { key: "1", value: "Percentage" },
  { key: "2", value: "Fixed Rate" },
];

export const DiscountForm = ({ onChange }) => {
  const [type, setType] = useState("1");
  const [discountValue, setDiscountValue] = useState(null);

  const changeType = (e) => {
    setType(e);
    onChange(
      "name",
      list?.find((item) => item?.key === e)
    );
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <SelectField
            label="Discount Type"
            placeholder="Choose a discount type"
            options={list}
            onChange={(e) => changeType(e)}
          />
        </div>
        <div className="col-12">
          <InputField
            type="string"
            label={type === "1" ? "Discount (%)" : "Discount ($)"}
            placeholder="Enter discount"
            value={discountValue}
            onChange={(e) => {
              if (e.target.value !== "-" && !isNaN(e.target.value)) {
                onChange("figure", e);
                setDiscountValue(e.target.value);
              } else {
                setDiscountValue(discountValue);
              }
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};
