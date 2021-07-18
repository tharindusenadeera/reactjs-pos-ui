import React from "react";
import Icon from "../../assests/images/icons/warning.png";
import styled from "styled-components";
import Theme from "../../utils/Theme";

const Wrapper = styled.div`
  @media ${Theme.device.xs} {
    width: 100%;
  }
  @media ${Theme.device.sm} {
    width: 50%;
  }
`;

export const Warning = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <Wrapper className="d-flex flex-column align-items-center">
        <img src={Icon} alt="Warning Icon" />
        <h1 className="mt-3 text-center">{props.title}</h1>
        <p className="text-center">{props.text}</p>
      </Wrapper>
    </div>
  );
};
