import React from "react";
import styled from "styled-components";
import { BillingSection } from "./pos/BillingSection";
import { CatagorySection } from "./pos/CatagorySection";
import { ItemSection } from "./pos/ItemSection";
import { ProductSection } from "./pos/ProductSection";

const Wrap = styled.div`
  border-radius: 0.3rem;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%);
  background-color: #ffffff;

  &.padding {
    padding: 1.25rem;
  }

  &.gutter-b {
    margin-bottom: 30px;
  }
`;

export const Pos = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-xl-4 mb-4 mb-xl-0">
          <Wrap>
            <ItemSection />
          </Wrap>
        </div>
        <div className="col-md-8 col-lg-8 col-xl-5 mb-4">
          <Wrap className="padding gutter-b">
            <CatagorySection />
          </Wrap>
          <Wrap className="padding">
            <ProductSection />
          </Wrap>
        </div>
        <div className="col-md-4 col-lg-4 col-xl-3 mb-4">
          <Wrap className="padding">
            <BillingSection />
          </Wrap>
        </div>
      </div>
    </div>
  );
};
