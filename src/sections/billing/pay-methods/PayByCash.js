import React, { Fragment, useState } from "react";
import styled from "styled-components";
import Theme from "../../../utils/Theme";
import { Label } from "../../../components/field/Label";
import { InputField } from "../../../components/field/InputField";
import { TextAreaField } from "../../../components/field/TextAreaField";

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

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

const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${Theme.colors.$greye9ecef};
  padding: 10px;
  border-radius: ${Theme.space.BorderRadius};
  margin: 15px 0;

  h4 {
    margin-bottom: unset;
  }
`;

const PayByCash = (props) => {
  const { total } = props;
  const [amountToReturn, setAmountToReturn] = useState(0);

  const handleComments = (e) => {};

  const handleAmount = (e) => {
    let paidAmount = e.target.value;
    let returnAmount = "";
    if (paidAmount > total) {
      returnAmount = parseFloat(paidAmount) - parseFloat(total);
    }
    setAmountToReturn(returnAmount.toFixed(2));
  };

  const handleKeyDown = (event) => {
    // console.log("key down", event.keyCode);
    // if (
    //   (event.which != 46 || event.target.value.indexOf(".") != -1) &&
    //   (event.which < 48 || event.which > 57)
    // ) {
    //   return event.preventDefault();
    // } else {
    //   return true;
    // }
  };

  return (
    <Fragment>
      <FieldRow className="total">
        <Label label="Total Amount to Pay" className="custom-label" />
        <p>$ {total}</p>
      </FieldRow>

      <FieldRow>
        <InputField
          type="number"
          step=".01"
          label="Recived Amount ($)"
          errorMsg="This is error message"
          onChange={handleAmount}
          onKeyDown={handleKeyDown}
        />
      </FieldRow>

      <Balance>
        <h4>Amount to Return :</h4>
        <h4>${amountToReturn}</h4>
      </Balance>

      <FieldRow>
        <TextAreaField label="Note (If Any)" onChange={handleComments} />
      </FieldRow>
    </Fragment>
  );
};

export default PayByCash;
