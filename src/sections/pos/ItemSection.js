import React, { Fragment } from "react";
import { SelectCustom } from "../../components/select";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { ContentModal } from "../../components/modal/ContentModal";
import { ItemView } from "../orders/ItemView";

import ProductImg1 from "../../assests/images/products/Chicken-Burger.jpg";
import ProductImg2 from "../../assests/images/products/Chicken-sandwich.jpg";
import ProductImg3 from "../../assests/images/products/Checken-Nugets.jpg";
import ProductImg4 from "../../assests/images/products/Chicken-Submarine.jpg";
import ProductImg5 from "../../assests/images/products/French-Fries.jpg";
import ProductImg6 from "../../assests/images/products/Cheesy-Gordita-Crunch.jpg";
import ProductImg7 from "../../assests/images/products/Cherry-Limeade.jpg";

const Head = styled.div`
  padding: 1.25rem;
`;

const Body = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  padding: 1.25rem;
  @media ${Theme.device.sm} {
    height: 42vh;
  }

  @media ${Theme.device.xl} {
    height: 72vh;
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
  return (
    <Fragment>
      <Head>
        <div className="row">
          <div className="col-6">
            <SelectCustom placeholder="Choose a catagory" showSearch={false} />
          </div>
          <div className="col-6">
            <SelectCustom showSearch={true} placeholder="Type item to search" />
          </div>
        </div>
      </Head>

      <Body>
        <div className="row">
          <div className="col-xl-4 col-lg-2 col-md-3 col-sm-4 col-6">
            <ContentModal
              title="Chicken Burger"
              btnContent={
                <ProductCard>
                  <ProductImg src={ProductImg1} alt="product image" />
                  <span className="prod-title">Chicken Burger</span>
                </ProductCard>
              }
            >
              <ItemView />
            </ContentModal>
          </div>
          <div className="col-xl-4 col-lg-2 col-md-3 col-sm-4 col-6">
            <ContentModal
              title="Chicken Burger"
              btnContent={
                <ProductCard>
                  <ProductImg src={ProductImg2} alt="product image" />
                  <span className="prod-title">Chicken Sandwich</span>
                </ProductCard>
              }
            >
              <ItemView />
            </ContentModal>
          </div>
          <div className="col-xl-4 col-lg-2 col-md-3 col-sm-4 col-6">
            <ContentModal
              title="Chicken Burger"
              btnContent={
                <ProductCard>
                  <ProductImg src={ProductImg3} alt="product image" />
                  <span className="prod-title">Checken Nuggets</span>
                </ProductCard>
              }
            >
              <ItemView />
            </ContentModal>
          </div>
          <div className="col-xl-4 col-lg-2 col-md-3 col-sm-4 col-6">
            <ContentModal
              title="Chicken Burger"
              btnContent={
                <ProductCard>
                  <ProductImg src={ProductImg4} alt="product image" />
                  <span className="prod-title">Chicken Submarine</span>
                </ProductCard>
              }
            >
              <ItemView />
            </ContentModal>
          </div>
          <div className="col-xl-4 col-lg-2 col-md-3 col-sm-4 col-6">
            <ContentModal
              title="Chicken Burger"
              btnContent={
                <ProductCard>
                  <ProductImg src={ProductImg5} alt="product image" />
                  <span className="prod-title">French Fries</span>
                </ProductCard>
              }
            >
              <ItemView />
            </ContentModal>
          </div>
          <div className="col-xl-4 col-lg-2 col-md-3 col-sm-4 col-6">
            <ContentModal
              title="Chicken Burger"
              btnContent={
                <ProductCard>
                  <ProductImg src={ProductImg6} alt="product image" />
                  <span className="prod-title">Cheesy Gordita Crunch</span>
                </ProductCard>
              }
            >
              <ItemView />
            </ContentModal>
          </div>
          <div className="col-xl-4 col-lg-2 col-md-3 col-sm-4 col-6">
            <ContentModal
              title="Chicken Burger"
              btnContent={
                <ProductCard>
                  <ProductImg src={ProductImg7} alt="product image" />
                  <span className="prod-title">Cherry Limeade</span>
                </ProductCard>
              }
            >
              <ItemView />
            </ContentModal>
          </div>
        </div>
      </Body>
    </Fragment>
  );
};
