import React from "react";
import { ReactCalculator } from "simple-react-calculator";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const Wrapper = styled.div`
  .css-h2okw {
    @media ${Theme.device.xs} {
      width: 300px;
    }
    @media ${Theme.device.sm} {
      width: 220px;
    }
    height: auto;
  }
  .css-hayew9 {
    @media ${Theme.device.xs} {
      font-size: 2.25rem !important;
      height: 85px;
    }
    @media ${Theme.device.sm} {
      font-size: 1.75rem !important;
      height: 75px;
    }
  }
  .css-1txu9g8,
  .css-1iypx3a,
  .css-166hzw5,
  .css-9iwzto,
  .css-1uzr0i {
    @media ${Theme.device.xs} {
      height: 65px;
      font-size: 1.25rem !important;
    }
    @media ${Theme.device.sm} {
      height: 45px;
      font-size: 1rem !important;
    }
  }
`;

export const Calculator = () => {
  return (
    <Wrapper>
      <ReactCalculator />
    </Wrapper>
  );
};
