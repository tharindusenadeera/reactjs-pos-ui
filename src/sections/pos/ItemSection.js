import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { SelectCustom } from "../../components/select";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { ContentModal } from "../../components/modal/ContentModal";
import { ItemView } from "../orders/ItemView";
import {addItem} from '../../actions/selectedItems';


import ProductImg1 from "../../assests/images/products/Chicken-Burger.jpg";
import ProductImg2 from "../../assests/images/products/Chicken-sandwich.jpg";
import ProductImg3 from "../../assests/images/products/Checken-Nugets.jpg";
import ProductImg4 from "../../assests/images/products/Chicken-Submarine.jpg";
import ProductImg5 from "../../assests/images/products/French-Fries.jpg";
import ProductImg6 from "../../assests/images/products/Cheesy-Gordita-Crunch.jpg";
import ProductImg7 from "../../assests/images/products/Cherry-Limeade.jpg";

const itemArr = [
  { key: 0, value: "All" },
  { key: 1, value: "Meat" },
  { key: 2, value: "Vegan" },
  { key: 3, value: "Gluten Free" },
  { key: 4, value: "Soft Drinks" },
];

const productsArr = [
  { key: 1, category: 1, name: "Chicken Burger", image: ProductImg1 },
  { key: 2, category: 1, name: "Chicken Sandwich", image: ProductImg2 },
  { key: 3, category: 1, name: "Chicken Nuggets", image: ProductImg3 },
  { key: 4, category: 1, name: "Chicken Submarine", image: ProductImg4 },
  { key: 5, category: 2, name: "French Fries", image: ProductImg5 },
  { key: 6, category: 3, name: "Cheesy Gordita Crunch", image: ProductImg6 },
  { key: 7, category: 4, name: "Cherry Limeade", image: ProductImg7 },
  { key: 1, category: 1, name: "Chicken Burger", image: ProductImg1 },
  { key: 2, category: 1, name: "Chicken Sandwich", image: ProductImg2 },
  { key: 3, category: 1, name: "Chicken Nuggets", image: ProductImg3 },
  { key: 4, category: 1, name: "Chicken Submarine", image: ProductImg4 },
  { key: 5, category: 2, name: "French Fries", image: ProductImg5 },
  { key: 6, category: 3, name: "Cheesy Gordita Crunch", image: ProductImg6 },
  { key: 7, category: 4, name: "Cherry Limeade", image: ProductImg7 },
];

const Head = styled.div`
  padding: 1.25rem;
`;

const Body = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  padding: 1.25rem;

  @media ${Theme.device.xs} {
    max-height: calc(100vh - 232px) !important;
  }
  @media ${Theme.device.sm} {
    max-height: calc(100vh - 248px) !important;
  }
  @media ${Theme.device.md} {
    max-height: calc(100vh - 630px) !important;
  }
  @media ${Theme.device.lg} {
    max-height: calc(100vh - 190px) !important;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${Theme.colors.$greyd3d7dc};
    //outline: 1px solid ${Theme.colors.$greye9ecef};
  }

  .ant-btn {
    margin-bottom: 25px;
    border-radius: 0.3rem;
  }
`;

const ProductCard = styled.div`
  display: block;
  .prod-title {
    font-size: 0.875rem;
    margin-top: 10px;
    display: block;
    color: ${Theme.colors.$black};
    transition: color ease-in-out 0.3s;
    white-space: break-spaces;
  }
  &:hover,
  :focus {
    .prod-title {
      color: ${Theme.colors.$primaryHover};
    }
  }
`;

const ProductImg = styled.img`
  width: 100%;
  height: 6.875rem;
  object-fit: cover;
  object-position: center;
  border-radius: 0.3rem;
`;

export const ItemSection = () => {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState(0);

  // selected item state from modal (set from child comp and dispatch in here
  // since modal ok handle happen in here)
  const [selectedItem, setSelectedItem] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    handleProducts(productsArr, selectedItems);
  }, []);

  const handleProducts = (data, value) => {
    let itemArr = [];
    if (value == 0) {
      itemArr = data;
    } else {
      itemArr = data.filter((item) => {
        return item.category == value;
      });
    }
    setProducts(itemArr);
  };

  const handleItemsSelect = (value) => {
    setSelectedItems(value);
    handleProducts(productsArr, value);
  };

  const handlePriceCalculation = (item) => {
    // disounted value and total value should update with services
    return {...item, discount: 100, subtotal: 1000};
  }

  const clickOk = () => {
    const item =  handlePriceCalculation(selectedItem);
    dispatch(addItem(item));
  }

  const clickCancel = () => {
    setSelectedItem({});
  }

  return (
    <Fragment>
      <Head>
        <div className="row">
          <div className="col-6">
            <SelectCustom
              showSearch={true}
              placeholder="Choose an item"
              options={itemArr}
              onChange={handleItemsSelect}
            />
          </div>
          <div className="col-6">
            <SelectCustom showSearch={true} placeholder="Type item to search" />
          </div>
        </div>
      </Head>

      <Body>
        <div className="row">
          {products.map((item, key) => {
            return (
              <div
                key={key}
                className="col-xl-4 col-lg-2 col-md-3 col-sm-4 col-6"
              >
                <ContentModal
                  //title={item.name}
                  btnContent={
                    <ProductCard>
                      <ProductImg src={item.image} alt="product image" />
                      <span className="prod-title">{item.name}</span>
                    </ProductCard>
                  }
                  okText="Add to order"
                  className="body-nonpadding"
                  clickOk={clickOk}
                  clickCancel={clickCancel}
                >
                  <ItemView item={item} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
                </ContentModal>
              </div>
            );
          })}
        </div>
      </Body>
    </Fragment>
  );
};
