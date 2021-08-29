import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Theme from "../utils/Theme";
import GlobalStyle from "../utils/globalStyles";
import { InputField } from "../components/field/InputField";
import { PasswordField } from "../components/field/PasswordField";
import { ButtonCustom } from "../components/button/index";
import { login } from "../api/common";
import { authenticate } from "../actions/common";
import swal from "sweetalert";
import { ACCESS_TOKEN } from "../constants/ActionTypes";

const Wrapper = styled.section`
  background: ${Theme.colors.$gradientBackground};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  background-color: ${Theme.colors.$white};
  padding: 35px;
  border-radius: ${Theme.space.BorderRadius};
  box-shadow: 0 0 15px 6px rgb(56, 72, 131);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
`;

const Body = styled.div`
  margin-bottom: 10px;
`;

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorObj, setErrorObj] = useState({});
  const [deviceName, setDeviceName] = useState("");

  const handleSubmit = () => {
    if (!username && !password) {
      setErrorObj({
        all: "Required !",
        username: "Required !",
        password: "Required !",
      });
      return;
    } else if (!username) {
      setErrorObj({
        username: "Required !",
      });
      return;
    } else if (!password) {
      setErrorObj({
        password: "Required !",
      });
      return;
    } else {
      let device_name = deviceName ? deviceName : "localhost";
      let obj = {
        username,
        password,
        device_name,
      };
      login(obj)
        .then((res) => {
          if (res.data.status == "success") {
            dispatch(authenticate(true));
            localStorage.setItem(ACCESS_TOKEN, `Bearer ${res.data.data.token}`);
            history.push({
              pathname: "/dashboard",
            });
          } else {
            swal("Something Went Wrong !", "Please Try Again!", "error");
            dispatch(authenticate(false));
          }
        })
        .catch((error) => {
          swal("Something Went Wrong !", "Please Try Again!", "error");
        });
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <Box>
        <Title>Sign In</Title>
        <Body>
          <div className="field-row">
            <InputField
              label="Username"
              errorMsg={errorObj.email || errorObj.all ? errorObj.email : ""}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorObj({});
              }}
            />
          </div>
          <div className="field-row">
            <PasswordField
              label="Password"
              errorMsg={
                errorObj.password || errorObj.all ? errorObj.password : ""
              }
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorObj({});
              }}
            />
          </div>
        </Body>
        <ButtonCustom
          type="primary"
          btnTitle="Login"
          className="w-100"
          onClick={handleSubmit}
        />
      </Box>
    </Wrapper>
  );
};
