import React from "react";
import styled from "styled-components";
import { BillingSection } from "./pos/BillingSection";
import { CustomerSection } from "./pos/CustomerSection";
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
        <div className="col-12 col-xl-4 order-3 order-xl-1 mt-4 mt-xl-0">
          <Wrap>
            <ItemSection />
          </Wrap>
        </div>
        <div className="col-md-8 col-lg-8 col-xl-5  order-1 order-xl-2">
          <Wrap className="padding gutter-b">
            <CustomerSection />
          </Wrap>
          <Wrap className="padding">
            <ProductSection />
          </Wrap>
        </div>
        <div className="col-md-4 col-lg-4 col-xl-3 order-2 order-xl-3 mt-4 mt-md-0">
          <Wrap className="padding">
            <BillingSection />
          </Wrap>
        </div>
      </div>
    </div>
  );
};
