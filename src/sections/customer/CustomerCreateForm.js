import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectField } from "../../components/field/SelectField";
import { InputField } from "../../components/field/InputField";
import { addCustomerTriggered, addCutomer } from "../../actions/customer";
import styled from "styled-components";
import { ButtonCustom } from "../../components/button";

const ButtonWrap = styled.div`
  position: relative;
  margin-top: 5px;
  margin-left: 10px;
`;

export const CustomerCreateForm = (props) => {
  const dispatch = useDispatch();
  const clickedSubmit = useSelector((state) => state.customer);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errorObj, setErrorObj] = useState({});
  const emailRegex = RegExp(
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  );
  const mobileNoRegex = RegExp("^([0-9]+)$");

  const validate = (data) => {
    let errors = {};
    if (!data.firstName) {
      errors.firstName = "First Name Required !";
    } else if (!data.lastName) {
      errors.lastName = "Last Name Required !";
    } else if (!data.email) {
      errors.email = "Email Required !";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Invalid Email !";
    } else if (!data.phoneNumber) {
      errors.phoneNumber = "Phone number Required !";
    } else if (!mobileNoRegex.test(data.phoneNumber)) {
      errors.phoneNumber = "Invalid Phone number !";
    }
    setErrorObj(errors);
    return errors;
  };

  const handleCancel = () => {
    props.handleCancel();
  };

  const handleSubmit = () => {
    let obj = {
      firstName,
      lastName,
      phoneNumber,
      email,
    };
    if (!firstName || !lastName || !phoneNumber) {
      console.log("=== ERROR - NOTHING ===");
      setErrorObj({
        all: "all",
        firstName: "Required !",
        lastName: "Required !",
        phoneNumber: "Required !",
      });
      return;
    } else {
      const errors = validate(obj);
      console.log("=== ERROR ===", errors);
      if (!Object.keys(errors).length) {
        dispatch(addCustomerTriggered(false));
        dispatch(addCutomer(obj));
        console.log("CUSTOMER", obj);
        props.handleCancel();
      }
    }
  };
  console.log("errorObj", errorObj);
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-sm-6">
          <InputField
            label="Phone Number"
            placeholder="Enter valid phone number"
            errorMsg={
              errorObj.phoneNumber || errorObj.all ? errorObj.phoneNumber : ""
            }
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setErrorObj({});
            }}
          />
        </div>

        <div className="col-12 col-sm-6">
          <InputField
            label="Email"
            placeholder="Enter email address"
            errorMsg={errorObj.email ? errorObj.email : ""}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorObj({});
            }}
          />
        </div>

        <div className="col-12 col-sm-6">
          <InputField
            label="First Name"
            placeholder="Type a name"
            errorMsg={
              errorObj.firstName || errorObj.all ? errorObj.firstName : ""
            }
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrorObj({});
            }}
          />
        </div>

        <div className="col-12 col-sm-6">
          <InputField
            label="Last Name"
            placeholder="Type a name"
            errorMsg={
              errorObj.lastName || errorObj.all ? errorObj.lastName : ""
            }
            onChange={(e) => {
              setLastName(e.target.value);
              setErrorObj({});
            }}
          />
        </div>
        <ButtonWrap>
          <ButtonCustom
            type="primary"
            btnTitle={"Add Customer"}
            onClick={handleSubmit}
          />
        </ButtonWrap>
        <ButtonWrap>
          <ButtonCustom btnTitle={"Cancel"} onClick={handleCancel} />
        </ButtonWrap>
      </div>
    </Fragment>
  );
};
