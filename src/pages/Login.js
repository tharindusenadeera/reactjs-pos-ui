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

  const handleSubmit = () => {
    if (!name || !password) {
      return ;
    } else {
      
    }
  }

  return (
    <Wrapper>
      <GlobalStyle />
      <Box>
        <Title>Sign In</Title>
        <Body>
          <div className="field-row">
            <InputField label="User Name" errorMsg="this is error" onChange={e => setName(e.target.value)}/>
          </div>
          <div className="field-row">
            <PasswordField label="Password" onChange={e => setPassword(e.target.value)}/>
          </div>
        </Body>
        <ButtonCustom type="primary" btnTitle="Login" className="w-100" onClick={handleSubmit}/>
      </Box>
    </Wrapper>
  );
};
