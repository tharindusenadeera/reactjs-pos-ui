import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { DeleteButton } from "../../components/button/DeleteButton";
import { ModalCustom } from "../../components/modal";
import { Warning } from "../../sections/common/Warning";

const orderArr = [
  {
    title: "Order 1",
    customer: {
      name: "Sophia Hale",
      address: "9825 Johnsaon Dr.Columbo,MD21044",
    },
    status: "Pending",
    totalItems: 10,
    amount: 500,
  },
  {
    title: "Order 2",
    customer: {
      name: "Putram Jaya Isla",
      address:
        "9825 Johnsaon Dr.Columbo,MD21044. Manning PLace, ColomoDr.Columbo,MD21044.",
    },
    status: "Pending",
    totalItems: 12,
    amount: 400,
  },
  {
    title: "Order 3",
    customer: {
      name: "Sophia Hale",
      address: "9825 Johnsaon Dr.Columbo,MD21044",
    },
    status: "Pending",
    totalItems: 12,
    amount: 400,
  },
  {
    title: "Order 4",
    customer: {
      name: "Putram Jaya Isla",
      address:
        "9825 Johnsaon Dr.Columbo,MD21044. Manning PLace, ColomoDr.Columbo,MD21044.",
    },
    status: "On Hold",
    totalItems: 12,
    amount: 455,
  },
  {
    title: "Order 5",
    customer: {
      name: "Sophia Hale",
      address: "9825 Johnsaon Dr.Columbo,MD21044",
    },
    status: "On Hold",
    totalItems: 11,
    amount: 232,
  },
  {
    title: "Order 6",
    customer: {
      name: "Putram Jaya Isla",
      address:
        "9825 Johnsaon Dr.Columbo,MD21044. Manning PLace, ColomoDr.Columbo,MD21044.",
    },
    status: "Delevering",
    totalItems: 15,
    amount: 1456,
  },
  {
    title: "Order 7",
    customer: {
      name: "Sophia Hale",
      address:
        "9825 Johnsaon Dr.Columbo,MD21044. Manning PLace, ColomoDr.Columbo,MD21044.",
    },
    status: "Delevering",
    totalItems: 6,
    amount: 320,
  },
  {
    title: "Order 8",
    customer: {
      name: "Putram Jaya Isla",
      address:
        "9825 Johnsaon Dr.Columbo,MD21044. Manning PLace, ColomoDr.Columbo,MD21044.",
    },
    status: "Pending",
    totalItems: 8,
    amount: 769,
  },
];

const Wrapper = styled.div`
  .order-box {
    background-color: ${Theme.colors.$greye9ecef};
    border: 1px solid ${Theme.colors.$border};
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    h3 {
      margin-bottom: 18px;
    }
    label {
      margin-bottom: unset;
      margin-right: 5px;
    }
    p {
      margin-bottom: 8px;
    }
  }
`;

const ActionButtons = styled.div`
  margin-top: 12px;
  display: flex;
`;

export const OrderView = () => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setOrders(orderArr);
  }, []);

  const handleConfirm = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <Wrapper>
      <div className="row">
        {orders &&
          orders.map((order) => (
            <div className="col col-sm-6 col-md-4">
              <div className="order-box">
                <h3>{order.title}</h3>

                <div className="d-flex">
                  <p>
                    <label>Name</label>
                    {order.customer.name}
                  </p>
                </div>

                <div className="d-flex">
                  <p>
                    <label>Address</label>
                    {order.customer.address}
                  </p>
                </div>

                <div className="d-flex">
                  <p>
                    <label>Payment Status</label>
                    {order.status}
                  </p>
                </div>

                <div className="d-flex">
                  <p>
                    <label>Total Items</label>
                    {order.totalItems}
                  </p>
                </div>

                <div className="d-flex">
                  <p>
                    <label>Amount to Pay</label>$ {order.amount}
                  </p>
                </div>

                <ActionButtons>
                  <ModalCustom
                    btnTitle={Theme.icons.$edit}
                    type="primary"
                    btnClass="mr-2 yellow"
                    okText="Draft/Save current order"
                    cancelText="Discard current order"
                    handleOk={handleConfirm}
                    handleCancel={handleCancel}
                    showModal={showModal}
                    isModalVisible={isModalVisible}
                  >
                    <Warning
                      title="Save current order"
                      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    />
                  </ModalCustom>

                  <DeleteButton confirm={handleConfirm} cancel={handleCancel} />
                </ActionButtons>
              </div>
            </div>
          ))}
      </div>
    </Wrapper>
  );
};
