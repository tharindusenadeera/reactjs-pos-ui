import React from "react";
import GlobalStyle from "../../utils/globalStyles";
import Theme from "../../utils/Theme";
import { Header } from "./Header";
import { Footer } from "./Footer";

import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${Theme.colors.$background};
  color: ${Theme.colors.$black};
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

const Section = styled.section`
  height: 100vh;
  @media ${Theme.device.xs} {
    padding-top: 139px;
  }
  @media ${Theme.device.sm} {
    padding-top: 85px;
  }
`;

export const Layout = (props) => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Header />
      <Section>{props.children}</Section>
      {/* <Footer /> */}
    </Wrapper>
  );
};
