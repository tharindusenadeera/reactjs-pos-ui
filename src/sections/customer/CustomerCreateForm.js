import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectField } from "../../components/field/SelectField";
import { InputField } from "../../components/field/InputField";
import { addCustomerTriggered, addCutomer, customerDetails } from "../../actions/customer";
import styled from "styled-components";
import { ButtonCustom } from "../../components/button";
import { addCustomer } from "../../api/customer";

const ButtonWrap = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const CustomerCreateForm = (props) => {
  const dispatch = useDispatch();
  const clickedSubmit = useSelector((state) => state.customer);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [firstAddressLine, setFirstAddressLine] = useState("");
  const [secondAddressLine, setSecondAddressLine] = useState("");
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
      setErrorObj({
        all: "all",
        firstName: "Required !",
        lastName: "Required !",
        phoneNumber: "Required !",
      });
      return;
    } else {
      const errors = validate(obj);
      let newCustomer = {
        first_name: firstName,
        last_name: lastName,
        contact_number: phoneNumber,
        email: email,
        address_line_1: firstAddressLine,
        address_line_2: secondAddressLine
      };
      if (!Object.keys(errors).length) {
        addCustomer(newCustomer).then(res => {
          console.log("=== Customer response ===", res.data);
          if (res.data.status == 'success') {
            dispatch(customerDetails(res.data.data));
            props.handleCancel();
          }
        })
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

        <div className="col-12 col-sm-6">
          <InputField
            label="Address Line 1"
            placeholder="Type first address line"
            // errorMsg={
            //   errorObj.lastName || errorObj.all ? errorObj.lastName : ""
            // }
            onChange={(e) => {
              setFirstAddressLine(e.target.value);
              setErrorObj({});
            }}
          />
        </div>

        <div className="col-12 col-sm-6">
          <InputField
            label="Address Line 2"
            placeholder="Type second address line"
            // errorMsg={
            //   errorObj.lastName || errorObj.all ? errorObj.lastName : ""
            // }
            onChange={(e) => {
              setSecondAddressLine(e.target.value);
              setErrorObj({});
            }}
          />
        </div>

        <ButtonWrap>
          <ButtonCustom btnTitle={"Cancel"} onClick={handleCancel} />

          <ButtonCustom
            type="primary"
            btnTitle={"Add Customer"}
            className="ml-2 green"
            onClick={handleSubmit}
          />
        </ButtonWrap>
      </div>
    </Fragment>
  );
};
