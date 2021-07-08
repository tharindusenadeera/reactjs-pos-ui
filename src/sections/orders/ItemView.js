import React, { Fragment } from "react";
import { SelectField } from "../../components/field/SelectField";
import { InputNumberField } from "../../components/field/InputNumberField";
import styled from "styled-components";

import ProductImg1 from "../../assests/images/products/Chicken-Burger.jpg";

const ItemDetail = styled.div`
  img {
    width: 150px;
    height: 120px;
    object-fit: cover;
    object-position: center;
    border-radius: 0.3rem;
    margin-right: 30px;
  }
`;

const ItemForm = styled.div`
  width: 100%;

  h4 {
    margin-bottom: 15px;
  }
`;

export const ItemView = () => {
  return (
    <div>
      <ItemDetail className="d-sm-flex">
        <img src={ProductImg1} alt="Item" />

        <ItemForm className="mt-3 mt-sm-0">
          <h4>Item Name Here</h4>
          <div className="row">
            <div className="col-6">
              <SelectField
                label="Taste"
                placeholder="Choose a taste"
                errorMsg="This is an error"
              />
            </div>
            <div className="col-6">
              <SelectField
                label="Size"
                placeholder="Choose a size"
                errorMsg="This is an error"
              />
            </div>
            <div className="col-6">
              <InputNumberField label="Quantity" defaultValue={0} />
            </div>
          </div>
        </ItemForm>
      </ItemDetail>
    </div>
  );
};
