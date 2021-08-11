import React, { useEffect, useState } from "react";
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
import { OrderGroup } from "../orders/OrderGroup";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentDate = moment().format("dddd DD MMMM YYYY");
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const clickCancel = () => {
    setIsModalVisible(false);
  };

  const clickOK = () => {
    setIsModalVisible(false);
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
                count={5}
                title="Draft Orders"
                type="primary"
                handleOk={clickOK}
                handleCancel={clickCancel}
                showModal={showModal}
                isModalVisible={isModalVisible}
              >
                {/* <OrderView clickOK={clickOK}/> */}
                <OrderGroup clickOK={clickOK}/>
              </ModalCustom>
              <DropdownCustom
                btnTitle={Theme.icons.$user}
                btnClass="ml-3 btn-nav"
              >
                <Menu>
                  <Menu.Item key="0">
                    <a href="#">1st menu item</a>
                  </Menu.Item>
                  <Menu.Item key="1">{Theme.icons.$logout} Logout</Menu.Item>
                </Menu>
              </DropdownCustom>
            </NavControls>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
