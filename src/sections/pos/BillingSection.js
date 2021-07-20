import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ShopLogo from "../../assests/images/grill-logo.png";
import Theme from "../../utils/Theme";
import { ModalCustom } from "../../components/modal";
import { Label } from "../../components/field/Label";
import { Payment } from "../billing/Payment";

const ShopDetail = styled.div`
  display: flex;

  h4 {
    margin-bottom: 10px;
  }

  p {
    font-size: 0.75rem;
    font-weight: 500;
    color: ${Theme.colors.$grey};
    margin-bottom: 6px;
  }
`;

const ShopImg = styled.img`
  object-fit: cover;
  object-position: center;
  width: 80px;
  height: 80px;
  margin-right: 15px;
`;

const BillDetail = styled.div`
  .label {
    margin-bottom: unset;
  }
`;

const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  label,
  p {
    margin-bottom: unset;
  }
`;

const calculateOrderSummary = (selectedItems, discountPer) => {
  let subTot = 0;

  selectedItems.forEach((item) => {
    subTot += item?.subtotal;
  });

  const taxPer = 0.03; // tax harcoded as 3%
  const shipping = subTot === 0 ? 0 : 0; // shipping harcoded as 0

  return {
    totItems: selectedItems.length,
    subTot: subTot,
    discount: subTot * (discountPer / 100),
    tax: subTot * taxPer,
    shipping: shipping,
    tot: subTot - (subTot * discountPer) / 100 + subTot * taxPer + shipping,
  };
};

export const BillingSection = (props) => {
  const [perc, setPerc] = useState(0);
  const [savedPerc, setSavedPerc] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectedItems = useSelector((state) => state.selectedItems);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const clickOk = () => {
    setSavedPerc(perc);
  };

  const clickCancel = () => {};

  const onChange = (e) => {
    const per = e.target.value;

    if (!isNaN(per)) {
      setPerc(parseInt(per));
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { totItems, subTot, discount, tax, shipping, tot } =
    calculateOrderSummary(selectedItems, savedPerc);
  const DiscountLabel = `Discount  (${savedPerc}) %`;

  return (
    <Fragment>
      {/* <ShopDetail>
        <ShopImg src={ShopLogo} alt="Shop Logo" />
        <div>
          <h4>Shop Name Here</h4>
          <p>02199+(070)234-4569</p>
          <p>Russel st 50,Bostron,MA USA</p>
        </div>
      </ShopDetail> */}

      {/* <hr /> */}

      <BillDetail>
        <FieldRow>
          <Label label="Total Items" className="label" />
          <p>{totItems}</p>
        </FieldRow>

        <FieldRow>
          <Label label="Subtotal" className="label" />
          <p>${subTot}</p>
        </FieldRow>

        <FieldRow>
          <Label
            label={DiscountLabel}
            className="label"
            plusComp="discount"
            okText="Apply Discount"
            onChange={onChange}
            clickOk={clickOk}
            clickCancel={clickCancel}
          />
          <p>${discount}</p>
        </FieldRow>

        <FieldRow>
          <Label label="Tax" className="label" />
          <p>${tax}</p>
        </FieldRow>

        <FieldRow>
          <Label
            label="Shipping Cost"
            className="label"
            plusComp="shipping-cost"
            okText="Apply Shipping Cost"
          />
          <p>${shipping}</p>
        </FieldRow>

        {/* <FieldRow>
          <Label label="Additional Discount(5%)" className="label" />
          <p>$35</p>
        </FieldRow> */}

        <FieldRow>
          <Label label="Total" className="label" />
          <p>${tot}</p>
        </FieldRow>
      </BillDetail>

      <hr />

      <div className="d-flex flex-column mt-4">
        <ModalCustom
          btnTitle="Pay the bill"
          type="primary"
          btnClass="mb-3 w-100"
          title="Payment"
          okText="Pay Now"
          showModal={showModal}
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
        >
          <Payment />
        </ModalCustom>
      </div>
    </Fragment>
  );
};
