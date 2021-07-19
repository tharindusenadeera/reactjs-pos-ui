import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectField } from "../../components/field/SelectField";
import { InputField } from "../../components/field/InputField";
import { addCustomerTriggered, addCutomer } from "../../actions/customer";

export const CustomerCreateForm = () => {
  const dispatch = useDispatch();
  const clickedSubmit = useSelector((state) => state.customer);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const emailRegex = RegExp(
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  );
  const mobileNoRegex = RegExp("^([0-9]+)$");

  useEffect(() => {
    if (clickedSubmit.isAdd) {
      handleSubmit();
    }
  }, [clickedSubmit]);

  const validate = (data) => {
    let errors = {};
    if (!data.name) {
      errors.name = "Name Required !";
    } else if (!data.email) {
      errors.email = "Email Required !";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Invalid Email !";
    } else if (!data.phoneNumber) {
      errors.phoneNumber = "Phone number Required !";
    } else if (!mobileNoRegex.test(data.phoneNumber)) {
      errors.phoneNumber = "Invalid Phone number !";
    }

    return errors;
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !phoneNumber) {
      return;
    } else {
      let obj = {
        firstName,
        lastName,
        phoneNumber,
        email,
      };
      const errors = validate(obj);
      console.log("=== ERROR ===", errors);
      if (!Object.keys(errors).length) {
        dispatch(addCustomerTriggered(false));
        dispatch(addCutomer(obj));
        console.log("CUSTOMER", obj);
      }
    }
  };
console.log("clickedSubmit", clickedSubmit);
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-sm-6">
          <InputField
            label="First Name"
            placeholder="Type a name"
            errorMsg="This is an error"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="col-12 col-sm-6">
          <InputField
            label="Last Name"
            placeholder="Type a name"
            errorMsg="This is an error"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="col-12 col-sm-6">
          <InputField
            label="Email"
            placeholder="Enter email address"
            errorMsg="This is an error"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-12 col-sm-6">
          <InputField
            label="Phone Number"
            placeholder="Enter valid phone number"
            errorMsg="This is an error"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
    </Fragment>
  );
};
