import React, { Fragment } from "react";
import styled from "styled-components";
import Theme from "../../../utils/Theme";
import { Label } from "../../../components/field/Label";
import { InputField } from "../../../components/field/InputField";
import { TextAreaField } from "../../../components/field/TextAreaField";

const FieldRow = styled.div`
  display: flex;
  align-items: center;

  @media ${Theme.device.xs} {
    justify-content: space-between;
  }

  label,
  p {
    margin-bottom: unset;
  }

  p {
    margin-left: 15px;
  }

  &.total {
    margin-bottom: 18px;
  }

  .field-row {
    width: 100%;
  }

  .custom-label {
    margin-bottom: unset;
  }
`;

const PayByCard = (props) => {
  const { total } = props;

  const handleCardNo = (e) => {};

  const handleBank = (e) => {}

  const handleComments = (e) => {};

  return (
    <Fragment>
      <FieldRow className="total">
        <Label label="Total Amount to Pay" className="custom-label" />
        <p>$ {total}</p>
      </FieldRow>

      <FieldRow>
        <InputField
          label="Card No"
          placeholder="Please enter last 4 digits"
          onChange={handleCardNo}
        />
      </FieldRow>

      <FieldRow>
        <InputField
          label="Bank"
          placeholder="Please enter bank name"
          onChange={handleBank}
        />
      </FieldRow>

      <FieldRow>
        <TextAreaField label="Note (If Any)" onChange={handleComments} />
      </FieldRow>
    </Fragment>
  );
};

export default PayByCard;
