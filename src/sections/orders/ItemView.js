import React, { Fragment } from "react";
import { SelectField } from "../../components/field/SelectField";
import { InputNumberField } from "../../components/field/InputNumberField";
import styled from "styled-components";

import ProductImg1 from "../../assests/images/products/Chicken-Burger.jpg";
import Theme from "../../utils/Theme";

const ItemDetail = styled.div`
  img {
    object-fit: cover;
    object-position: center;
    margin-right: 30px;

    @media ${Theme.device.xs} {
      width: 100%;
      height: 200px;
    }
    @media ${Theme.device.sm} {
      width: 275px;
      height: 270px;
    }
  }
`;

const ItemForm = styled.div`
  width: 100%;
  padding: 20px;

  h3 {
    margin-bottom: 15px;
  }
`;

export const ItemView = ({ item }) => {
  return (
    <ItemDetail className="d-sm-flex">
      <img src={item && item.image} alt="Item" />

      <ItemForm className="mt-3 mt-sm-0">
        <h3>{item && item.name}</h3>
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
  );
};
