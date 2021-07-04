import React from "react";
import styled from "styled-components";

const Section = styled.section``;

export const Pos = () => {
  return (
    <Section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-xl-4 order-3 order-xl-1">Left</div>
          <div className="col-5 order-1 order-xl-2">Middle</div>
          <div className="col-3 order-2 order-xl-3">Right</div>
        </div>
      </div>
    </Section>
  );
};
