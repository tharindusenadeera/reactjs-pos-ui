import React, { Fragment, useState } from "react";
import styled from "styled-components";
import Theme from "../../../utils/Theme";
import swal from "sweetalert";
import { Label } from "../../../components/field/Label";
import { InputField } from "../../../components/field/InputField";
import { TextAreaField } from "../../../components/field/TextAreaField";
import { ButtonCustom } from "../../../components/button";
import { placePayment } from "../../../api/order";

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

const ButtonWrap = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const PayByCard = (props) => {
  const { total, order, closePopUp, paymentSucessCallback} = props;
  const [bank, setBank] = useState("");
  const [card, setCard] = useState("");
  const [comment, setComment] = useState("");
  const [errorObj, setErrorObj] = useState({});

  const validate = (data) => {
    let errors = {};

    if (!data.bank) {
      errors.bank = "Required !";
    } else if (!data.card) {
      errors.card = "Required !";
    }

    setErrorObj(errors);
    return errors;
  };

  const handleSubmit = () => {
    let obj = {
      bank: bank,
      card: card,
      order_id: order.id,
      payment_method: "card",
    };

    let errors = validate(obj);
    if (!Object.keys(errors).length) {
      if (comment) {
        obj.comment = comment;
      }

      swal({
        title: "Confirm to pay",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          placePayment(order.id, obj)
            .then((res) => {
              if (res.data.status == "success") {
                swal(`${res.data.message}`, "", "success");
                paymentSucessCallback();
                closePopUp();
              } else {
                swal(`${res.data.message}`, "Please Try Again!", "error");
              }
            })
            .catch((error) => {
              swal("Something Went Wrong !", "Please Try Again!", "error");
            });
        } else {
          swal("Process Terminated!");
        }
      });
    }
  };

  const handleCancel = () => {
    closePopUp();
  };

  const handleComments = (data) => {
    setComment(data);
  };

  const handleBank = (data) => {
    setBank(data);
  };

  const handleCard = (data) => {
    setCard(data);
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
          label="Card No"
          placeholder="Please enter last 4 digits"
          errorMsg={errorObj.card ? "Required !" : ""}
          onChange={(e) => handleCard(e.target.value)}
        />
      </FieldRow>

      <FieldRow>
        <InputField
          label="Bank"
          placeholder="Please enter bank name"
          errorMsg={errorObj.bank ? "Required !" : ""}
          onChange={(e) => handleBank(e.target.value)}
        />
      </FieldRow>

      <FieldRow>
        <TextAreaField
          label="Note (If Any)"
          onChange={(e) => handleComments(e.target.value)}
        />
      </FieldRow>

      <ButtonWrap>
        <ButtonCustom btnTitle={"Cancel"} onClick={handleCancel} />

        <ButtonCustom
          type="primary"
          btnTitle={"Pay"}
          className="ml-2 blue"
          onClick={handleSubmit}
        />
      </ButtonWrap>
    </Fragment>
  );
};

export default PayByCard;
