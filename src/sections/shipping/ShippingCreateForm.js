import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SelectField } from "../../components/field/SelectField";
import { InputField } from "../../components/field/InputField";
import { ButtonCustom } from "../../components/button";
import { Checkbox } from "antd";

const ButtonWrap = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ShippingCreateForm = (props) => {
  const customer = useSelector((state) => state.customer);
  const [deliveryFirstName, setDeliveryFirstName] = useState("");
  const [deliveryLastName, setDeliveryLastName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryPhoneNo, setDeliveryPhoneNo] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [errorObj, setErrorObj] = useState({});
  const [isSame, setIsSame] = useState(false);
  const emailRegex = RegExp(
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  );
  const mobileNoRegex = RegExp("^([0-9]+)$");

  const validate = (data) => {
    let errors = {};
    if (!data.deliveryFirstName) {
      errors.deliveryFirstName = "First Name Required !";
    } else if (!data.deliveryLastName) {
      errors.deliveryLastName = "Last Name Required !";
    } else if (!data.deliveryEmail) {
      errors.deliveryEmail = "Email Required !";
    } else if (!emailRegex.test(data.deliveryEmail)) {
      errors.deliveryEmail = "Invalid Email !";
    } else if (!data.deliveryPhoneNo) {
      errors.deliveryPhoneNo = "Phone number Required !";
    } else if (!mobileNoRegex.test(data.deliveryPhoneNo)) {
      errors.deliveryPhoneNo = "Invalid Phone number !";
    } else if (!data.deliveryAddress) {
      errors.deliveryAddress = "Address is Required !";
    }
    setErrorObj(errors);
    return errors;
  };

  const handleCancel = () => {
    props.handleCancel();
  };

  const handleSubmit = () => {
    if (isSame) {
    } else {
      let obj = {
        deliveryFirstName,
        deliveryLastName,
        deliveryPhoneNo,
        deliveryEmail,
        deliveryAddress,
      };

      if (!deliveryFirstName || !deliveryLastName || !deliveryPhoneNo) {
        setErrorObj({
          all: "all",
          deliveryFirstName: "Required !",
          deliveryLastName: "Required !",
          deliveryPhoneNo: "Required !",
        });
        return;
      } else {
        const errors = validate(obj);
        if (!Object.keys(errors).length) {
          console.log("SHIPPING", obj);
        }
      }
    }
  };

  const handleChecked = (e) => {
    setIsSame(e.target.checked);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <Checkbox onChange={handleChecked}>Same customer</Checkbox>
        </div>
        <div className="col-6">
          <InputField
            label="Delivery First Name"
            placeholder="Enter Delivery First Name"
            errorMsg={
              errorObj.deliveryFirstName || errorObj.all
                ? errorObj.deliveryFirstName
                : ""
            }
            onChange={(e) => {
              setDeliveryFirstName(e.target.value);
            }}
          />
        </div>

        <div className="col-6">
          <InputField
            label="Delivery Last Name"
            placeholder="Enter Delivery Last Name"
            errorMsg={
              errorObj.deliveryLastName || errorObj.all
                ? errorObj.deliveryLastName
                : ""
            }
            onChange={(e) => {
              setDeliveryLastName(e.target.value);
            }}
          />
        </div>

        <div className="col-6">
          <InputField
            label="Delivery Address"
            placeholder="Enter Delivery Address"
            errorMsg={
              errorObj.deliveryAddress || errorObj.all
                ? errorObj.deliveryAddress
                : ""
            }
            onChange={(e) => {
              setDeliveryAddress(e.target.value);
            }}
          />
        </div>

        <div className="col-6">
          <InputField
            label="Delivery Phone Number"
            placeholder="Enter Phone Number"
            errorMsg={
              errorObj.deliveryPhoneNo || errorObj.all
                ? errorObj.deliveryPhoneNo
                : ""
            }
            onChange={(e) => {
              setDeliveryPhoneNo(e.target.value);
            }}
          />
        </div>

        <div className="col-6">
          <InputField
            label="Delivery Email"
            placeholder="Enter valid Delivery Email"
            errorMsg={
              errorObj.deliveryEmail || errorObj.all
                ? errorObj.deliveryEmail
                : ""
            }
            onChange={(e) => {
              setDeliveryEmail(e.target.value);
            }}
          />
        </div>
        <div className="col-6"></div>

        <ButtonWrap>
          <ButtonCustom btnTitle={"Cancel"} onClick={handleCancel} />

          <ButtonCustom
            type="primary"
            btnTitle={"Add Details"}
            className="ml-2 green"
            onClick={handleSubmit}
          />
        </ButtonWrap>
      </div>
    </Fragment>
  );
};
