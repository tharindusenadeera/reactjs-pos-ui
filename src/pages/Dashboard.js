import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  .container,
  .container-fluid,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const Header = styled.header``;

const Footer = styled.footer``;

const Section = styled.section``;

export const Dashboard = (props) => {
  return (
    <Wrapper>
      <Header>
        <div className="container-fluid">
          <div className="row">
            <div className="col">Header</div>
          </div>
        </div>
      </Header>
      <Section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-xl-4 order-3 order-xl-1">Left</div>
            <div className="col-5 order-1 order-xl-2">Middle</div>
            <div className="col-3 order-2 order-xl-3">Right</div>
          </div>
        </div>
      </Section>
      <Footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col text-center">© All rights reserved 2021</div>
          </div>
        </div>
      </Footer>
    </Wrapper>
  );
};
