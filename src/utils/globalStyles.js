import { createGlobalStyle } from "styled-components";
import Theme from "../utils/Theme";

const GlobalStyle = createGlobalStyle`
  @media ${Theme.device.xxl}{ 
    .container, .container-lg, .container-md, .container-sm, .container-xl {
        max-width: 1320px;
    }
  }
  /* Boostrap 5 Media query */

  h1 {
    font-size: 1.25rem !important;
    font-weight: 700 !important;
  }

  h3 {
    font-size: 1.375rem !important;
    font-weight: 500 !important;
  }

  h4 {
    font-size: 0.875rem !important;
    font-weight: 700 !important;
  }

  label {
    font-size: 0.813rem;
    font-weight: 600;
  }

  p {
    font-size: 0.813rem;
    font-weight: 400;
    color: #212529;
  }

  .btn-danger {
    background-color: #fc2a2a;
    border-color: #fc2a2a;
    color: #ffffff;
  }
  .btn-danger:focus,
  .btn-danger:hover {
    background-color: #cf0909;
    border-color: #cf0909;
    color: #f7e4e4;
  }

  .field-row{
    margin-bottom: 6px;
  }

  /* Ant Btn */
  .ant-btn{
    height: unset;
    padding: 6px 20px;
    border-radius: ${Theme.space.BorderRadius};
  }

  /* Ant Popconfirm */
  .ant-popover{
    .ant-popover-inner{
      border-radius: ${Theme.space.BorderRadius};
      box-shadow: 0px 0px 8px rgb(1 1 1 / 15%);
      .ant-popover-message{
        .anticon{
          display: none;
        }
        .ant-popover-message-title{
          font-size: 0.875rem;
          color: ${Theme.colors.dark};
          padding-left: unset;
        }
      }
      .ant-popover-buttons {
        display: flex;
        flex-direction: row-reverse;
        .ant-btn{
          &{
            background: ${Theme.colors.$white};
            border-color: ${Theme.colors.$secondary};
            color: ${Theme.colors.$secondary};
            &:hover {
              background: ${Theme.colors.$white};
              border-color: ${Theme.colors.$secondaryHover};
              color: ${Theme.colors.$secondaryHover};
            }
          }
          &.ant-btn-primary{
            background: ${Theme.colors.$primary};
            border-color: ${Theme.colors.$primary};
            color: ${Theme.colors.$white};
            &:hover {
              background: ${Theme.colors.$primaryHover};
              border-color: ${Theme.colors.$primaryHover};
              color: ${Theme.colors.$white};
            }
          }
        }
      }
    }
  }

  /* Ant Message */
  .ant-message-custom-content{
    display: flex;
    align-items: center;
  }

  /* Ant Modal */
  .ant-modal{
    .ant-modal-footer{
      .ant-btn{
          &{
            background: ${Theme.colors.$white};
            border-color: ${Theme.colors.$secondary};
            color: ${Theme.colors.$secondary};
            &:hover {
              background: ${Theme.colors.$white};
              border-color: ${Theme.colors.$secondaryHover};
              color: ${Theme.colors.$secondaryHover};
            }
          }
          &.ant-btn-primary{
            background: ${Theme.colors.$primary};
            border-color: ${Theme.colors.$primary};
            color: ${Theme.colors.$white};
            &:hover {
              background: ${Theme.colors.$primaryHover};
              border-color: ${Theme.colors.$primaryHover};
              color: ${Theme.colors.$white};
            }
          }
        }
    }
  }

  /* Ant Select */
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled){
    background-color: ${Theme.colors.$primaryLight};
  }

`;

export default GlobalStyle;
