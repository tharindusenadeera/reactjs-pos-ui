import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

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

export const Layout = (props) => {
  return (
    <Wrapper>
      <Header />
      {props.children}
      <Footer />
    </Wrapper>
  );
};
