import React, { useEffect } from "react";
import { SelectField } from "../../components/field/SelectField";
import { InputNumberField } from "../../components/field/InputNumberField";
import styled from "styled-components";
import Theme from "../../utils/Theme";

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

const TasteList = [
  { key: 1, value: "Sweet" },
  { key: 2, value: "Sour" },
  { key: 3, value: "Salty" },
  { key: 4, value: "Bitter" },
  { key: 5, value: "Savory" },
];

const SizeList = [
  { key: 1, value: "Small" },
  { key: 2, value: "Medium" },
  { key: 3, value: "Large" },
];

export const ItemView = ({ item, selectedProperties, updateSelectedproperties }) => {

  useEffect(() => {
    if (item) {
      updateSelectedproperties(item);
    }
  }, [item]);
  
  const onChangeTaste = (key) => {
    if (key) {
      const  taste = TasteList.find((itm) => itm.key === key);
      updateSelectedproperties({...item, ...{...selectedProperties, tasteKey: taste.key, taste: taste.value}});
    }
  }

  const onChangeSize = (key) => {
    if (key) {
      const  size = SizeList.find((itm) => itm.key === key);
      updateSelectedproperties({...item, ...{...selectedProperties, sizeKey: size.key, size: size.value}});
    }
  }

  const onClickPlus = () => {
    const newQty = selectedProperties?.qty ? selectedProperties?.qty + 1 : 1;
    console.log(newQty)
    updateSelectedproperties({...item, ...{...selectedProperties, qty: newQty}});
  }

  const onClickMinus = () => {
    const newQty = (!selectedProperties?.qty || selectedProperties?.qty === 0) ? 0 : selectedProperties?.qty -1;
    updateSelectedproperties({...item, ...{...selectedProperties, qty: newQty}});
  }

  const onChangeQuantity = (qty) => {
    updateSelectedproperties({...item, ...{...selectedProperties, qty: qty}});
  }

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
              options={TasteList}
              onChange={onChangeTaste}
              value={selectedProperties.taste}
            />
          </div>
          <div className="col-6">
            <SelectField
              label="Size"
              placeholder="Choose a size"
              options={SizeList}
              onChange={onChangeSize}
              value={selectedProperties.size}
            />
          </div>
          <div className="col-6">
            <InputNumberField label="Quantity" defaultValue={0} value={selectedProperties.qty} onClickPlus={onClickPlus} onClickMinus={onClickMinus} onChange={onChangeQuantity}/>
          </div>
        </div>
      </ItemForm>
    </ItemDetail>
  );
};
