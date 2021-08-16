import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ShopLogo from "../../assests/images/grill-logo.png";
import Theme from "../../utils/Theme";
import { ModalCustom } from "../../components/modal";
import { Label } from "../../components/field/Label";
import { Payment } from "../billing/Payment";
import { SelectField } from "../../components/field/SelectField";
import { convertToDecimal } from "../../utils/formats";
import SaveOrder from "../orders/SaveOrder";
import { addTable } from "../../actions/order";
import { PdfButton } from "../../components/button/PdfButton";

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

const ButtonContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const customerArr = [{ key: 1, value: "Walk in Customer" }];

const tableArr = [
  { key: 1, value: "T01" },
  { key: 2, value: "T02" },
  { key: 3, value: "T03" },
  { key: 4, value: "T04" },
  { key: 5, value: "T05" },
];

const calculateOrderSummary = (selectedItems, disc, id) => {
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
  const tot = convertToDecimal(
    subTot - discount + subTot * taxPer + shipping,
    2
  );

  return {
    totItems: selectedItems.length,
    subTot: subT,
    discount: dis,
    tax: tax,
    shipping: ship,
    tot: tot,
    orderId: id,
  };
};

export const BillingSection = (props) => {
  // key 1 -> percentage  2 -> fixed value
  const dispatch = useDispatch();
  const initialDiscount = { key: "1", value: 0 };
  const [dis, setDis] = useState(initialDiscount);
  const [savedDis, setSavedDis] = useState(initialDiscount);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderSnapShot, setOrderSnapShot] = useState({});

  const selectedItems = useSelector((state) => state.selectedItems.productList);
  const orderMetaData = useSelector((state) => state.selectedItems.metaData);
  const mealType = useSelector((state) => state.common.mealType);
  const addOrder = useSelector((state) => state.order.addOrder);

  const tableNumber = useSelector((state) => state.order.tableNumber);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const clickOk = () => {
    setSavedDis(dis);
  };

  const clickCancel = () => {};

  const onChange = (type, event) => {
    if (type === "name") {
      const { key } = event;
      setDis({ ...dis, key: key });
    } else {
      const figure = event?.target?.value || 0;

      if (!isNaN(figure)) {
        setDis({ ...dis, value: parseInt(figure) });
      }
    }
  };

  const handleOk = (a) => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    // setIsModalVisible(false);
  };

  const onModalClicked = () => {
    setDis(savedDis);
  };

  const { totItems, subTot, discount, tax, shipping, tot } =
    calculateOrderSummary(selectedItems, savedDis);

  const DiscountLabel = `Discount  (${savedDis.value} ${
    savedDis.key === "1" ? "%)" : "$)"
  }`;

  const confirmAndPayClicked = (orderSnapshot) => {
    const orderBillSummary = calculateOrderSummary(
      orderSnapshot?.productList,
      savedDis,
      addOrder.id
    );

    setOrderSnapShot({ orderBillSummary: orderBillSummary });
  };

  const handleSelectedTable = (value) => {
    dispatch(addTable(value));
  };

  const printButtonClicked = () => {
    console.log("print clicked");
  };
  

  const closePopUp = () => {
    setIsModalVisible(false);
  };

  return (
    <Fragment>
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
        {mealType == "deliver" ? (
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
        ) : (
          <Fragment />
        )}

        {mealType == "dine_in" ? (
          <div className="col-12">
            <SelectField
              defa
              showSearch={false}
              label="Table Number"
              value={
                tableNumber
                  ? tableArr.filter((option) => option.key == tableNumber)
                  : undefined
              }
              options={tableArr && tableArr}
              placeholder="Select a table"
              onChange={handleSelectedTable}
            />
          </div>
        ) : (
          <Fragment />
        )}
      </div>

      <Hr />

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
            onModalClicked={onModalClicked}
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

        <FieldRow>
          <Label label="Total" className="label" />
          <p>${tot}</p>
        </FieldRow>
      </BillDetail>

      {orderMetaData && orderMetaData.order_id ? (
        orderMetaData.status === "draft" ? (
          // already added draft orders changes saving
          <div className="d-flex justify-content-between mt-4">
            <div style={{ width: "48%" }}>
              <SaveOrder type="updateDraft" width="block" />
            </div>
            <div style={{ width: "48%" }}>
              <SaveOrder type="add" width="block" prevType="draft" />
            </div>
          </div>
        ) : (
          // already added orders changes saving
          <div className="d-flex flex-column mt-4">
            <SaveOrder
              type="update"
              width="block"
              order_id={orderMetaData.order_id}
            />
          </div>
        )
      ) : (
        // newly adding or drafting orders
        <div className="d-flex justify-content-between mt-4">
          <div style={{ width: "48%" }}>
            <SaveOrder type="draft" width="block" />
          </div>
          <div style={{ width: "48%" }}>
            <SaveOrder type="add" width="block" />
          </div>
        </div>
      )}

      <div className="d-flex flex-column mt-4">
        <ButtonContent>
          <div style={{ width: "78%" }}>
            <ModalCustom
              btnTitle="Confirm & Pay"
              customButton={true}
              customButtonType="confirmPay"
              callBackCutomButton={confirmAndPayClicked}
              printDisable={true}
              type="primary"
              btnClass="mb-3 w-100 green"
              btnDisabled={!selectedItems.length}
              title="Payment"
              okText="Pay Now"
              showModal={showModal}
              isModalVisible={isModalVisible}
              handleOk={handleOk}
              handleCancel={handleCancel}
              maskClosable={false}
              hideSubmit={true}
              hideCancel={true}
            >
              <Payment orderSnapShot={orderSnapShot} closePopUp={closePopUp} />
            </ModalCustom>
          </div>

          <div style={{ width: "18%" }}>
            <PdfButton
              onClick={printButtonClicked}
              disabled={
                !(
                  addOrder?.status === "placed" ||
                  orderMetaData?.status === "placed"
                )
              }
              width="block"
            />
          </div>
        </ButtonContent>
      </div>
    </Fragment>
  );
};
