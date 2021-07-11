import React from "react";
import { SelectField } from "../../components/field/SelectField";
import { InputNumberField } from "../../components/field/InputNumberField";
import styled from "styled-components";
import Theme from "../../utils/Theme";

import ProductImg1 from "../../assests/images/products/Chicken-Burger.jpg";

const ItemDetail = styled.div`
  @media ${Theme.device.sm} {
    display: flex;
  }
`;

const Image = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media ${Theme.device.xs} {
    width: 100%;
    height: 25vh;
  }
  @media ${Theme.device.sm} {
    width: 375px;
    margin-right: 30px;
  }
`;

const ItemForm = styled.div`
  width: 100%;
  padding: 20px;

  h3 {
    margin-bottom: 35px;
  }
`;

export const ItemView = ({ item }) => {
  return (
    <ItemDetail>
      <Image
        style={{
          backgroundImage: `url(${item && item.image})`,
        }}
      />
      {/* <img src={item && item.image} alt="Item" /> */}

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
