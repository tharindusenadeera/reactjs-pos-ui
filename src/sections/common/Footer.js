import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer``;

export const Footer = () => {
  return (
    <Wrapper>
      <div className="container-fluid">
        <div className="row">
          <div className="col text-center">© All rights reserved 2021</div>
        </div>
      </div>
    </Wrapper>
  );
};
