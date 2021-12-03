import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import TableBox from "../../components/table-box";
import { ButtonCustom } from "../../components/button";
import styled from "styled-components";
import { addTable } from "../../actions/order";

const ButtonWrap = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default function TableSelectForm(props) {
  const [tableValue, setTableValue] = useState({});
  const dispatch = useDispatch();

  const handleCancel = () => {
    props.handleCancel();
  };

  const handleSubmit = () => {
    dispatch(addTable(tableValue.key));
    props.handleCancel();
  };

  const changeTable = (table) => {
    setTableValue(table);
  };

  return (
    <Fragment>
      <TableBox selected={false} changeTable={changeTable} value={null} />
      <ButtonWrap>
        <ButtonCustom btnTitle={"Cancel"} onClick={handleCancel} />
        <ButtonCustom
          type="primary"
          btnTitle={"Add Table"}
          className="ml-2 green"
          onClick={handleSubmit}
        />
      </ButtonWrap>
    </Fragment>
  );
}
