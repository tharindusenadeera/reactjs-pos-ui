import React, { useState } from "react";
import styled from "styled-components";
import Theme from "../utils/Theme";
import GlobalStyle from "../utils/globalStyles";
import { InputField } from "../components/field/InputField";
import { PasswordField } from "../components/field/PasswordField";
import { ButtonCustom } from "../components/button/index";

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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorObj, setErrorObj] = useState({});

  const handleSubmit = () => {
    if (!name && !password) {
      setErrorObj({
        all: "Required !",
        name: "Required !",
        password: "Required !",
      });
      return;
    } else if (!name) {
      setErrorObj({
        name: "Required !",
      });
      return;
    } else if (!password) {
      setErrorObj({
        password: "Required !",
      });
      return;
    } else {
      let obj = {
        username: name,
        password: password,
      };
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
              errorMsg={errorObj.name || errorObj.all ? errorObj.name : ""}
              onChange={(e) => {
                setName(e.target.value);
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
