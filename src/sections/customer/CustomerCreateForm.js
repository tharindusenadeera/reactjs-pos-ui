import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectField } from "../../components/field/SelectField";
import { InputField } from "../../components/field/InputField";
import {
  addCustomerTriggered,
  addCutomer,
  customerDetails,
} from "../../actions/customer";
import styled from "styled-components";
import { ButtonCustom } from "../../components/button";
import {
  addCustomer,
  getAllCustomers,
  getCustomerById,
} from "../../api/customer";
import { AutoCompleteField } from "../../components/field/AutoCompleteField";
import swal from "sweetalert";

const ButtonWrap = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const tableArr = [
  { key: 1, value: "T01" },
  { key: 2, value: "T02" },
  { key: 3, value: "T03" },
  { key: 4, value: "T04" },
  { key: 5, value: "T05" },
];

export const CustomerCreateForm = (props) => {
  const dispatch = useDispatch();
  const mealType = useSelector((state) => state.common.mealType);
  const storedCustomerDetails = useSelector(
    (state) => state.customer.customerDetails
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [firstAddressLine, setFirstAddressLine] = useState("");
  const [secondAddressLine, setSecondAddressLine] = useState("");
  const [errorObj, setErrorObj] = useState({});
  const [phoneNumberArr, setPhoneNumberArr] = useState([]);
  const [customer, setCustomer] = useState({});
  const [selectedTable, setSelectedTable] = useState("");
  const emailRegex = RegExp(
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  );
  const mobileNoRegex = RegExp("^([0-9]+)$");

  useEffect(() => {
    handleAllCustomers();
  }, []);

  useEffect(() => {
    setFirstName(customer.first_name);
    setLastName(customer.last_name);
    setEmail(customer.email);
    setFirstAddressLine(customer.address_line_1);
    setSecondAddressLine(customer.address_line_2);
  }, [customer]);

  useEffect(() => {
    if (storedCustomerDetails) {
      setFirstName(storedCustomerDetails.first_name);
    }
  }, [storedCustomerDetails]);

  const handleAllCustomers = () => {
    getAllCustomers().then((res) => {
      if (res.data.data) {
        handlePhoneNumbers(res.data.data);
      }
    });
  };

  const handlePhoneNumbers = (data) => {
    let newArr = [];
    data.forEach((element) => {
      let obj = {};
      if (element.status == 1) {
        obj = {
          key: element.id,
          value: element.contact_number,
        };
      }
      newArr.push(obj);
    });
    setPhoneNumberArr(newArr);
  };

  const validate = (data) => {
    let errors = {};
    if (!data.firstName) {
      errors.firstName = "First Name Required !";
    } else if (!data.lastName) {
      errors.lastName = "Last Name Required !";
    } else if (!data.phoneNumber) {
      errors.phoneNumber = "Phone number Required !";
    } else if (!mobileNoRegex.test(data.phoneNumber)) {
      errors.phoneNumber = "Invalid Phone number !";
    }
    setErrorObj(errors);
    return errors;
  };

  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setFirstAddressLine("");
    setSecondAddressLine("");
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
        address_line_2: secondAddressLine,
      };

      if (mealType == "dine_in") {
        newCustomer.table_number = selectedTable;
      }

      if (!Object.keys(errors).length) {
        swal({
          title: "Confirm to Add",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            addCustomer(newCustomer)
              .then((res) => {
                if (res.data.status == "success") {
                  dispatch(customerDetails(res.data.data));
                  setFirstName("");
                  setLastName("");
                  setPhoneNumber("");
                  setEmail("");
                  setFirstAddressLine("");
                  setSecondAddressLine("");
                  handleAllCustomers();
                  swal("Successfully Submitted !", "", "success");
                  props.handleCancel();
                } else {
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
    }
  };

  const getCustomer = (id) => [
    getCustomerById(id).then((res) => {
      if (res.data.status == "success") {
        setCustomer(res.data.data);
      }
    }),
  ];

  const selectedPhoneNumberId = (phoneNumber) => {
    let customerId = phoneNumberArr.filter((item) => {
      return item.value == phoneNumber;
    });
    getCustomer(customerId[0].key);
  };

  const handlePhoneNumberSelect = (value) => {
    selectedPhoneNumberId(value);
    setErrorObj({});
    setPhoneNumber(value);
  };

  const handlePhoneNumberSearch = (value) => {
    setErrorObj({});
    setPhoneNumber(value);
  };

  const handleSelectedTable = (value) => {
    setErrorObj({});
    setSelectedTable(value);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-sm-6">
          <AutoCompleteField
            label="Phone Number"
            placeholder="Select a phone number"
            onSearch={handlePhoneNumberSearch}
            onSelect={handlePhoneNumberSelect}
            options={phoneNumberArr}
            errorMsg={
              errorObj.phoneNumber || errorObj.all ? errorObj.phoneNumber : ""
            }
          />
        </div>

        <div className="col-12 col-sm-6">
          <InputField
            label="Email"
            placeholder="Enter email address"
            value={email ? email : undefined}
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
            value={firstName ? firstName : undefined}
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
            value={lastName ? lastName : undefined}
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
            value={firstAddressLine ? firstAddressLine : undefined}
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
            value={secondAddressLine ? secondAddressLine : undefined}
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
