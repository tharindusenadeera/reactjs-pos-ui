import React, { Fragment, useState } from "react";
import { SelectField } from "../../components/field/SelectField";
import { InputField } from "../../components/field/InputField";

export const CustomerCreateForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");


  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-sm-6">
          <InputField
            label="First Name"
            placeholder="Type a name"
            errorMsg="This is an error"
            onChange={e => setFirstName(e.target.value)}
          />
        </div>

        <div className="col-12 col-sm-6">
          <InputField
            label="Last Name"
            placeholder="Type a name"
            errorMsg="This is an error"
            onChange={e => setLastName(e.target.value)}
          />
        </div>

        <div className="col-12 col-sm-6">
          <InputField
            label="Email"
            placeholder="Enter email address"
            errorMsg="This is an error"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="col-12 col-sm-6">
          <InputField
            label="Phone Number"
            placeholder="Enter valid phone number"
            errorMsg="This is an error"
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
    </Fragment>
  );
};
