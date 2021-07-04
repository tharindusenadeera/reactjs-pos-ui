import React from "react";
import styled from "styled-components";
import Clock from "react-live-clock";

const Wrapper = styled.header`
  padding: 15px 0;
`;

const Brand = styled.div``;

const NavControls = styled.div``;

export const Header = () => {
  return (
    <Wrapper>
      <div className="container-fluid">
        <div className="row">
          <div className="col d-flex justify-content-between">
            <Brand>POS System</Brand>
            <Clock
              format={"HH:mm:ssa"}
              ticking={true}
              timezone={"US/Pacific"}
            />
            <NavControls>sdsdsd</NavControls>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
