import React from "react";
import { Tag } from 'antd';
import styled from "styled-components";

const Wrapper = styled.div``;

export const TagCustom = (props) => {
    const {onClose, tag, value } = props;

    const handleClose = (id) => {
        onClose(id);
    }

    return (
        <Wrapper>
            <Tag onClose={() => handleClose(value)} color="#63b10e">
                {tag}
            </Tag>
        </Wrapper>
    )
}