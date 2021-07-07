import React from "react";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { EditButton } from "../../components/button/EditButton";
import { DeleteButton } from "../../components/button/DeleteButton";

const orderArr = [
  {
    title: "Order 1",
    cutomer: {
      name: "Sophia Hale",
      address: "9825 Johnsaon Dr.Columbo,MD21044",
    },
    status: "Pending",
    totalItems: "",
    amount: "",
  },
  {
    title: "Order 2",
    cutomer: {
      name: "Putram Jaya Isla",
      address:
        "9825 Johnsaon Dr.Columbo,MD21044. Manning PLace, ColomoDr.Columbo,MD21044.",
    },
    status: "Pending",
    totalItems: "",
    amount: "",
  },
  {
    title: "Order 3",
    cutomer: {
      name: "Sophia Hale",
      address: "9825 Johnsaon Dr.Columbo,MD21044",
    },
    status: "Pending",
    totalItems: "",
    amount: "",
  },
  {
    title: "Order 4",
    cutomer: {
      name: "Putram Jaya Isla",
      address:
        "9825 Johnsaon Dr.Columbo,MD21044. Manning PLace, ColomoDr.Columbo,MD21044.",
    },
    status: "On Hold",
    totalItems: "",
    amount: "",
  },
  {
    title: "Order 5",
    cutomer: {
      name: "Sophia Hale",
      address: "9825 Johnsaon Dr.Columbo,MD21044",
    },
    status: "On Hold",
    totalItems: "",
    amount: "",
  },
  {
    title: "Order 6",
    cutomer: {
      name: "Putram Jaya Isla",
      address:
        "9825 Johnsaon Dr.Columbo,MD21044. Manning PLace, ColomoDr.Columbo,MD21044.",
    },
    status: "Delevering",
    totalItems: "",
    amount: "",
  },
  {
    title: "Order 7",
    cutomer: {
      name: "Sophia Hale",
      address:
        "9825 Johnsaon Dr.Columbo,MD21044. Manning PLace, ColomoDr.Columbo,MD21044.",
    },
    status: "Delevering",
    totalItems: "",
    amount: "",
  },
  {
    title: "Order 8",
    cutomer: {
      name: "Putram Jaya Isla",
      address:
        "9825 Johnsaon Dr.Columbo,MD21044. Manning PLace, ColomoDr.Columbo,MD21044.",
    },
    status: "Pending",
    totalItems: "",
    amount: "",
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
  const Card = (
    <div className="col col-sm-6 col-md-4">
      <div className="order-box">s
        <h3>Order 1</h3>
        <div className="d-flex">
          <p>
            <label>Name</label>
            Sophia Hale
          </p>
        </div>
        <div className="d-flex">
          <p>
            <label>Address</label>
            9825 Johnsaon Dr.Columbo,MD21044
          </p>
        </div>
        <div className="d-flex">
          <p>
            <label>Payment Status</label>
            Pending
          </p>
        </div>
        <div className="d-flex">
          <p>
            <label>Total Items</label>
            10
          </p>
        </div>
        <div className="d-flex">
          <p>
            <label>Amount to Pay</label>
            $722
          </p>
        </div>
        <ActionButtons>
          <EditButton btnClass="mr-2" title="Edit Order">
            Edit Orders Here
          </EditButton>
          <DeleteButton />
        </ActionButtons>
      </div>
    </div>
  );

  const Card2 = (
    <div className="col col-sm-6 col-md-4">
      <div className="order-box">
        <h3>Order 2</h3>
        <div className="d-flex">
          <p>
            <label>Name</label>
            Sophia Hale Putram Jaya Isla
          </p>
        </div>
        <div className="d-flex">
          <p>
            <label>Address</label>
            9825 Johnsaon Dr.Columbo,MD21044. Manning PLace,
            ColomoDr.Columbo,MD21044.
          </p>
        </div>
        <div className="d-flex">
          <p>
            <label>Payment Status</label>
            Pending
          </p>
        </div>
        <div className="d-flex">
          <p>
            <label>Total Items</label>
            10
          </p>
        </div>
        <div className="d-flex">
          <p>
            <label>Amount to Pay</label>
            $722
          </p>
        </div>
        <ActionButtons>
          <EditButton btnClass="mr-2" title="Edit Order">
            Edit Orders Here
          </EditButton>
          <DeleteButton />
        </ActionButtons>
      </div>
    </div>
  );

  return (
    <Wrapper>
      <div className="row">
        {Card}
        {Card}
        {Card2}
        {Card}
        {Card2}
      </div>
    </Wrapper>
  );
};
