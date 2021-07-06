import React from "react";
import { BillingSection } from "./pos/BillingSection";
import { CustomerSection } from "./pos/CustomerSection";
import { ItemSection } from "./pos/ItemSection";
import { ProductSection } from "./pos/ProductSection";

export const Pos = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-xl-4 order-3 order-xl-1">
          <ItemSection />
        </div>
        <div className="col-5 order-1 order-xl-2">
          <CustomerSection />
          <ProductSection />
        </div>
        <div className="col-3 order-2 order-xl-3">
          <BillingSection />
        </div>
      </div>
    </div>
  );
};
