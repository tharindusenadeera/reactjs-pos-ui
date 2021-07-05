import React from "react";
import { ReactCalculator } from "simple-react-calculator";
import styled from "styled-components";

const Wrapper = styled.div`
  .css-h2okw {
    width: 220px;
    height: auto;
  }
  .css-hayew9 {
    font-size: 1.25rem !important;
    height: 75px;
  }
  .css-1txu9g8,
  .css-1iypx3a,
  .css-166hzw5,
  .css-9iwzto,
  .css-1uzr0i {
    font-size: 1rem !important;
    height: 45px;
  }
`;

export const Calculator = () => {
  return (
    <Wrapper>
      <ReactCalculator />
    </Wrapper>
  );
};
