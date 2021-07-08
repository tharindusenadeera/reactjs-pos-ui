import React, { Fragment } from "react";
import styled from "styled-components";
import ShopLogo from "../../assests/images/grill-logo.png";
import Theme from "../../utils/Theme";
import { ModalCustom } from "../../components/modal";
import { Label } from "../../components/field/Label";

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

export const BillingSection = () => {
  return (
    <Fragment>
      <ShopDetail>
        <ShopImg src={ShopLogo} alt="Shop Logo" />
        <div>
          <h4>Shop Name Here</h4>
          <p>02199+(070)234-4569</p>
          <p>Russel st 50,Bostron,MA USA</p>
        </div>
      </ShopDetail>

      <hr />

      <BillDetail>
        <FieldRow>
          <Label label="Total Items" className="label" />
          <p>6</p>
        </FieldRow>

        <FieldRow>
          <Label label="Subtotal" className="label" />
          <p>$900</p>
        </FieldRow>

        <FieldRow>
          <Label
            label="Discount (10%)"
            className="label"
            plusComp="discount"
            okText="Apply Discount"
          />
          <p>$90</p>
        </FieldRow>

        <FieldRow>
          <Label label="Tax" className="label" />
          <p>$6</p>
        </FieldRow>

        <FieldRow>
          <Label
            label="Shipping Cost"
            className="label"
            plusComp="shipping-cost"
            okText="Apply Shipping Cost"
          />
          <p>$1</p>
        </FieldRow>

        <FieldRow>
          <Label label="Additional Discount(5%)" className="label" />
          <p>$35</p>
        </FieldRow>

        <FieldRow>
          <Label label="Total" className="label" />
          <p>$855</p>
        </FieldRow>
      </BillDetail>

      <hr />

      <div className="d-flex flex-column">
        <ModalCustom
          btnTitle="Pay with cash"
          type="primary"
          btnClass="mb-3 w-100"
        >
          Cash Modal
        </ModalCustom>

        <ModalCustom
          btnTitle="Pay with Card"
          type="secondary"
          btnClass="ml-1 w-100"
        >
          Card Modal
        </ModalCustom>
      </div>
    </Fragment>
  );
};
