import React from "react";
import Theme from "../../utils/Theme";
import styled from "styled-components";
import Clock from "react-live-clock";
import { Button } from "antd";
import { ModalCustom } from "../../components/modal";
import { PopoverCustom } from "../../components/popover";

const Wrapper = styled.header`
  padding: 15px 0;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: ${Theme.colors.$white};
  z-index: 1;
`;

const Brand = styled.h1``;

const TimeWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  time {
    width: 95px;
    font-weight: 500;
  }
  .date {
    border-left: 1px solid ${Theme.colors.$border};
    padding-left: 15px;
    margin-left: 15px;
    color: ${Theme.colors.$grey};
  }
`;

const NavControls = styled.div``;

export const Header = () => {
  return (
    <Wrapper>
      <div className="container-fluid">
        <div className="row">
          <div className="col d-flex justify-content-between">
            <Brand>POS System</Brand>
            <TimeWrap>
              <Clock
                format={"hh:mm:ssa"}
                ticking={true}
                timezone={"US/Pacific"}
              />
              <div className="date">Monday 5 July 2021</div>
            </TimeWrap>
            <NavControls>
              <PopoverCustom />
              <ModalCustom btnTitle="Orders">
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </ModalCustom>
            </NavControls>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
