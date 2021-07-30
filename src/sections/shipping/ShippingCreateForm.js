import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Checkbox } from "antd";
import { SelectField } from "../../components/field/SelectField";
import { InputField } from "../../components/field/InputField";
import { ButtonCustom } from "../../components/button";
import { getCities } from "../../api/common";
import { selectedCityDetails } from "../../actions/customer";

const ButtonWrap = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ShippingCreateForm = (props) => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const [deliveryFirstName, setDeliveryFirstName] = useState("");
  const [deliveryLastName, setDeliveryLastName] = useState("");
  const [firstDeliveryAddress, setFirstDeliveryAddress] = useState("");
  const [secondDeliveryAddress, setSecondDeliveryAddress] = useState("");
  const [deliveryPhoneNo, setDeliveryPhoneNo] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [errorObj, setErrorObj] = useState({});
  const [isSame, setIsSame] = useState(false);
  const emailRegex = RegExp(
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  );
  const mobileNoRegex = RegExp("^([0-9]+)$");

  useEffect(() => {
    getCities().then((res) => {
      if (res.data.status == "success") {
        handleCities(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (isSame) {
      setDeliveryFirstName(customer.addCustomer.first_name);
      setDeliveryLastName(customer.addCustomer.last_name);
      setDeliveryPhoneNo(customer.addCustomer.contact_number);
      setFirstDeliveryAddress(customer.addCustomer.address_line_1);
      setSecondDeliveryAddress(customer.addCustomer.address_line_2);
      setDeliveryEmail(customer.addCustomer.email);
    } else {
      setDeliveryFirstName("");
      setDeliveryLastName("");
      setDeliveryPhoneNo("");
      setFirstDeliveryAddress("");
      setSecondDeliveryAddress("");
      setDeliveryEmail("");
    }
  }, [isSame]);

  const handleCities = (data) => {
    let newArr = [];
    data?.forEach((element) => {
      let obj = {
        key: element.id,
        value: element.name,
        deliveryCharge: element.delivery_charge,
        status: element.status,
      };
      newArr.push(obj);
    });
    setCity(newArr);
  };

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
    } else if (!data.firstDeliveryAddress) {
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
        firstDeliveryAddress,
        selectedCity,
      };

      if (
        !deliveryFirstName ||
        !deliveryLastName ||
        !deliveryPhoneNo ||
        !selectedCity
      ) {
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
          let shippingDetail = {};
          console.log("SHIPPING", obj);
        }
      }
    }
  };

  const handleChecked = (e) => {
    setIsSame(e.target.checked);
  };

  const handleSelectedCity = (value) => {
    setSelectedCity(value);
    let cityDetails = city.filter((item) => {
      return item.id == value;
    });
    dispatch(selectedCityDetails(cityDetails && cityDetails[0]));
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
            value={deliveryFirstName ? deliveryFirstName : undefined}
            errorMsg={
              errorObj.deliveryFirstName || errorObj.all
                ? errorObj.deliveryFirstName
                : ""
            }
            onChange={(e) => {
              setDeliveryFirstName(e.target.value);
            }}
            disabled={isSame ? true : false}
          />
        </div>

        <div className="col-6">
          <InputField
            label="Delivery Last Name"
            placeholder="Enter Delivery Last Name"
            value={deliveryLastName ? deliveryLastName : undefined}
            errorMsg={
              errorObj.deliveryLastName || errorObj.all
                ? errorObj.deliveryLastName
                : ""
            }
            onChange={(e) => {
              setDeliveryLastName(e.target.value);
            }}
            disabled={isSame ? true : false}
          />
        </div>

        <div className="col-6">
          <SelectField
            showSearch={false}
            label="Delivery City"
            options={city && city}
            placeholder="Select a delivery city"
            onChange={handleSelectedCity}
            errorMsg={
              errorObj.selectedCity || errorObj.all ? errorObj.selectedCity : ""
            }
          />
        </div>

        <div className="col-6"></div>

        <div className="col-6">
          <InputField
            label="Delivery Address Line 1"
            placeholder="Enter first delivery Address line"
            value={firstDeliveryAddress ? firstDeliveryAddress : undefined}
            errorMsg={
              errorObj.firstDeliveryAddress || errorObj.all
                ? errorObj.firstDeliveryAddress
                : ""
            }
            onChange={(e) => {
              setFirstDeliveryAddress(e.target.value);
            }}
            disabled={isSame ? true : false}
          />
        </div>

        <div className="col-6">
          <InputField
            label="Delivery Address Line 2"
            placeholder="Enter second delivery Address"
            value={secondDeliveryAddress ? secondDeliveryAddress : undefined}
            onChange={(e) => {
              setSecondDeliveryAddress(e.target.value);
            }}
            disabled={isSame ? true : false}
          />
        </div>

        <div className="col-6">
          <InputField
            label="Delivery Phone Number"
            placeholder="Enter Phone Number"
            value={deliveryPhoneNo ? deliveryPhoneNo : undefined}
            errorMsg={
              errorObj.deliveryPhoneNo || errorObj.all
                ? errorObj.deliveryPhoneNo
                : ""
            }
            onChange={(e) => {
              setDeliveryPhoneNo(e.target.value);
            }}
            disabled={isSame ? true : false}
          />
        </div>

        <div className="col-6">
          <InputField
            label="Delivery Email"
            placeholder="Enter valid Delivery Email"
            value={deliveryEmail ? deliveryEmail : undefined}
            errorMsg={
              errorObj.deliveryEmail || errorObj.all
                ? errorObj.deliveryEmail
                : ""
            }
            onChange={(e) => {
              setDeliveryEmail(e.target.value);
            }}
            disabled={isSame ? true : false}
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
