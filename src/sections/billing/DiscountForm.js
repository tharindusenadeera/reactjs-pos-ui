import React, { Fragment, useState} from "react";
import { InputField } from "../../components/field/InputField";
import { SelectField } from "../../components/field/SelectField";

const list = [
  { key: "1", value: "Percentage" },
  { key: "2", value: "Fixed Rate" },
];

export const DiscountForm = ({onChange}) => {
  const [type, setType] = useState("1");

  const changeType = (e) => {
    setType(e)
    onChange('name', list?.find((item) => item?.key === e))
  }

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
            type="number"
            label={type === "1" ? 'Discount (%)' : 'Discount ($)'}
            placeholder="Enter discount"
            onChange={(e) => onChange('figure', e)}
          />
        </div>
      </div>
    </Fragment>
  );
};
