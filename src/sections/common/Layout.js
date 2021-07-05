import React from "react";
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

  h1 {
    font-size: 20px !important;
    font-weight: 700 !important;
  }
`;

export const Layout = (props) => {
  return (
    <Wrapper>
      <Header />
      {props.children}
      <Footer />
    </Wrapper>
  );
};
