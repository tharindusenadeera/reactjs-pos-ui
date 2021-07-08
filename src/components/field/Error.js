import React from "react";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const Wrapper = styled.div`
  height: 18px;
`;

const ErrorText = styled.span`
  display: block;
  margin-top: 3px;
  color: ${Theme.colors.$danger};
  font-size: 0.688rem; /* 11px */
  font-weight: 500;
`;

export const Error = (props) => {
  return (
    <Wrapper>
      <ErrorText>{props.errorMsg}</ErrorText>
    </Wrapper>
  );
};
