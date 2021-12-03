import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";
import Theme from "../../utils/Theme";
import styled from "styled-components";
import Clock from "react-live-clock";
import { ModalCustom } from "../../components/modal";
import { PopoverCustom } from "../../components/popover";
import { Calculator } from "../../components/calculator/index";
import { DropdownCustom } from "../../components/dropdown";
import { Menu } from "antd";
//import { OrderView } from "../orders/OrderView";
import { OrderType } from "../orders/OrderType";
import { isFetching } from "../../actions/common";
import { deleteOrder, getAllOrders } from "../../api/order";
import { useDispatch, useSelector } from "react-redux";
import { ButtonCustom } from "../../components/button";
import swal from "sweetalert";

const Wrapper = styled.header`
  padding: 15px 0;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: ${Theme.colors.$white};
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%);
  z-index: 1;
`;

const Brand = styled.h1`
  margin: unset;
`;

const TimeWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  time {
    width: 95px;
    font-weight: 600;
  }
  .date {
    border-left: 1px solid ${Theme.colors.$border};
    padding-left: 15px;
    margin-left: 15px;
    color: ${Theme.colors.$grey};
  }
`;

const NavControls = styled.div`
  display: flex;
  .btn-nav {
    padding: 6px;
    height: unset;
  }
`;

export const Header = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [allOrders, setAllOrders] = useState([]);
  const dispatch = useDispatch();

  const currentDate = moment().format("dddd DD MMMM YYYY");
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const clickedOrderTab = useSelector((state) => state.common.clickedOrderTab);

  useEffect(() => {
    getOrderList(clickedOrderTab);
  }, [refresh]);

  const getOrderList = (tab) => {
    dispatch(isFetching(true));
    let obj = {
      // date: "2021-09-21",
      date: moment().format("YYYY-MM-DD"),
    };

    if (tab && tab != "draft") {
      obj.order_type = tab;
    }

    getAllOrders(obj).then((res) => {
      if (res.data.status === "success") {
        let filteredOrders = [];
        if (tab == "draft") {
          filteredOrders = res?.data?.data?.filter((item) => {
            return item?.status === "draft";
          });
        } else {
          filteredOrders = res?.data?.data?.filter((item) => {
            return item?.status !== "cancelled" && item?.status !== "draft";
          });
        }

        setAllOrders(filteredOrders);
        dispatch(isFetching(false));
      }
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
    setRefresh(() => !refresh);
  };

  const clickCancel = () => {
    setIsModalVisible(false);
  };

  const clickOK = () => {
    setIsModalVisible(false);
  };

  const logout = () => {
    localStorage.setItem("ACCESS_TOKEN", "");
    history.push({
      pathname: "/",
    });
  };

  const handleDelete = (id) => {
    deleteOrder(id)
      .then((res) => {
        if (res.data.status === "success") {
          getOrderList(clickedOrderTab);
          swal(`${res.data.message}`, "", "success");
        } else {
          swal(`${res.data.message}`, "Please Try Again!", "error");
        }
      })
      .catch((error) => {
        swal("Something Went Wrong !", "Please Try Again!", "error");
      });
  };

  const handleClickedTab = (tab) => {
    getOrderList(tab);
  };

  return (
    <Wrapper>
      <div className="container-fluid">
        <div className="row">
          <div className="col d-flex flex-column flex-md-row justify-content-between align-items-center">
            <Brand className="d-none d-md-block">POS System</Brand>

            <TimeWrap>
              <Clock
                format={"hh:mm a"}
                ticking={true}
                timezone={currentTimeZone}
              />
              <div className="date">{currentDate}</div>
            </TimeWrap>

            <NavControls className="mt-3 mt-md-0">
              <PopoverCustom
                btnTitle={Theme.icons.$calculator}
                btnClass="btn-nav"
              >
                <Calculator />
              </PopoverCustom>
              <ModalCustom
                btnTitle={Theme.icons.$folder}
                btnClass="ml-3 btn-nav"
                count={allOrders && allOrders?.length}
                title="All Orders"
                type="primary"
                handleOk={clickOK}
                handleCancel={clickCancel}
                showModal={showModal}
                isModalVisible={isModalVisible}
              >
                {/* <OrderView clickOK={clickOK}/> */}
                <OrderType
                  clickOK={clickOK}
                  allOrders={allOrders}
                  handleDelete={handleDelete}
                  clickedTab={handleClickedTab}
                />
              </ModalCustom>
              <DropdownCustom
                btnTitle={Theme.icons.$user}
                btnClass="ml-3 btn-nav"
              >
                <Menu>
                  <Menu.Item key="1" onClick={() => logout()}>
                    {Theme.icons.$logout} Logout
                  </Menu.Item>
                </Menu>
              </DropdownCustom>
            </NavControls>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
