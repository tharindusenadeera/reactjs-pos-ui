import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ShopLogo from "../../assests/images/grill-logo.png";
import Theme from "../../utils/Theme";
import { ModalCustom } from "../../components/modal";
import { Label } from "../../components/field/Label";
import { Payment } from "../billing/Payment";
import { SelectField } from "../../components/field/SelectField";
import { convertToDecimal } from "../../utils/formats"

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

const Hr = styled.hr`
  margin-top: 3px;
  margin-bottom: 10px;
`;

const customerArr = [{ key: 1, value: "Walk in Customer" }];

const calculateOrderSummary = (selectedItems, disc) => {
  let subTot = 0;

  selectedItems.forEach((item) => {
    subTot += item?.subtotal;
  });
  
  const discount = disc.key === "1" ? subTot * (disc.value / 100) : disc.value;
  const taxPer = 0.03; // tax harcoded as 3%
  const shipping = subTot === 0 ? 0 : 0; // shipping harcoded as 0

  /*  Decimal Translations  */
  const subT = convertToDecimal(subTot, 2);
  const dis = convertToDecimal(discount, 2);
  const tax = convertToDecimal(subTot * taxPer, 2);
  const ship = convertToDecimal(shipping, 2);
  const tot = convertToDecimal(subTot - discount + subTot * taxPer + shipping, 2);
  
  return {
    totItems: selectedItems.length,
    subTot: subT,
    discount: dis,
    tax: tax,
    shipping: ship,
    tot: tot,
  };
};

export const BillingSection = (props) => {

  // key 1 -> percentage  2 -> fixed value
  const initialDiscount = { key: "1", value: 0 }
  const [dis, setDis] = useState(initialDiscount);
  const [savedDis, setSavedDis] = useState(initialDiscount);
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectedItems = useSelector((state) => state.selectedItems);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const clickOk = () => {
    setSavedDis(dis);
  };

  const clickCancel = () => {};

  const onChange = (type, event) => {
    
    if (type === 'name') {
      const {key} = event;
      setDis({...dis, key : key});
    } else {
      const figure = event?.target?.value || 0;

      if (!isNaN(figure)) {
        setDis({...dis, value : parseInt(figure)});
      }
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onModalClicked = () => {
    setDis(savedDis);
  }

  const { totItems, subTot, discount, tax, shipping, tot } =
    calculateOrderSummary(selectedItems, savedDis);

  const DiscountLabel = `Discount  (${savedDis.value} ${savedDis.key === "1" ? '%)' : '$)'}`;

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
            onModalClicked= {onModalClicked}
          />
          <p>${discount}</p>
        </FieldRow>

        <FieldRow>
          <Label label="Tax" className="label" />
          <p>${tax}</p>
        </FieldRow>

        <FieldRow>
          <Label
            label="Delivery Cost"
            className="label"
            // plusComp="shipping-cost"
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

      <div className="d-flex flex-column mt-4">
        <ModalCustom
          btnTitle="Pay the bill"
          type="primary"
          btnClass="mb-3 w-100 green"
          btnDisabled={true}
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

      <Hr />

      <div className="row">
        <div className="col-12">
          <SelectField
            showSearch={true}
            label="Choose a Customer"
            plusComp="customer-create"
            placeholder="Select customer"
            options={customerArr}
            okText="Add Customer"
            hideCancel={true}
            hideSubmit={true}
          />
        </div>
        <div className="col-12">
          <SelectField
            showSearch={true}
            label="Delivery Address"
            plusComp="shipping-create"
            placeholder="Select Address"
            okText="Add Address"
            hideCancel={true}
            hideSubmit={true}
          />
        </div>
      </div>
    </Fragment>
  );
};
