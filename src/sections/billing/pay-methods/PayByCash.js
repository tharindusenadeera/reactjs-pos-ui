import React, { Fragment, useState } from "react";
import styled from "styled-components";
import Theme from "../../../utils/Theme";
import swal from "sweetalert";
import { Label } from "../../../components/field/Label";
import { InputField } from "../../../components/field/InputField";
import { TextAreaField } from "../../../components/field/TextAreaField";
import { ButtonCustom } from "../../../components/button";
import { placePayment } from "../../../api/order";
import { useDispatch } from "react-redux";
import { halfPayTheOrder, fullSettledTheOrder } from "../../../actions/order";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const FieldRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  label,
  p {
    margin-bottom: unset;
  }

  p {
    margin-left: 15px;
  }

  &.total {
    margin-bottom: 18px;
  }

  .field-row {
    width: 100%;
  }

  .custom-label {
    margin-bottom: unset;
  }
`;

const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${Theme.colors.$greye9ecef};
  padding: 10px;
  border-radius: ${Theme.space.BorderRadius};
  margin: 15px 0;

  h4 {
    margin-bottom: unset;
  }
`;

const ButtonWrap = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const PayByCash = (props) => {
  const { total, order, closePopUp, paymentSucessCallback } = props;
  const [amountToReturn, setAmountToReturn] = useState(0);
  const [amountPaid, setAmountPaid] = useState();
  const [error, setError] = useState(false);
  const [comment, setComment] = useState("");
  const [realBalance, setRealBalance] = useState(null);
  const [totalAmount, setTotalAmount] = useState(total);
  const dispatch = useDispatch();
  const [showSnackMessage, setShowSnackMessage] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    severity: "",
    message: "",
  });
  React.useEffect(() => {
    if (order?.amount_paid) {
      let amount = total - parseFloat(order.amount_paid);
      setTotalAmount(amount.toFixed(2));
    }
  }, [order, total]);

  const handleAmountToPay = (e) => {
    setError(false);
    let paidAmount = e.target.value || 0;
    let returnAmount = "";
    returnAmount =
      parseFloat(paidAmount).toFixed(2) - parseFloat(totalAmount).toFixed(2);

    setAmountPaid(paidAmount);
    if (Math.round(returnAmount * 100) / 100 < 0) {
      setAmountToReturn((Math.round(returnAmount * 100) / 100) * -1);
    } else {
      setAmountToReturn(Math.round(returnAmount * 100) / 100);
    }
    setRealBalance(Math.round(returnAmount * 100) / 100);
  };

  const cleanState = () => {
    setAmountToReturn(0);
    setAmountPaid();
    setError(false);
    setComment("");
    setRealBalance(null);
  };

  const handleSubmit = () => {
    if (!amountPaid) {
      setError(true);
    } else {
      let obj = {
        amount: amountPaid,
        order_id: order.id,
        payment_method: "cash",
      };

      if (comment) {
        obj.comment = comment;
      }

      swal({
        title: "Confirm to pay",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          placePayment(order.id, obj)
            .then((res) => {
              if (res.data.status === "success") {
                if (realBalance < 0) {
                  dispatch(
                    halfPayTheOrder({
                      totalAmount: parseFloat(total),
                      amountRemain: realBalance,
                      fullyPaid: false,
                    })
                  );
                } else if (realBalance >= 0) {
                  dispatch(
                    fullSettledTheOrder({
                      totalAmount: null,
                      amountRemain: null,
                      fullyPaid: true,
                    })
                  );
                }
                //swal(`${res.data.message}`, "", "success");
                paymentSucessCallback(order.id);
                closePopUp();
                cleanState();
              } else {
                //swal(`${res.data.message}`, "Please Try Again!", "error");
                setSnackMessage({
                  severity: "error",
                  message: "Please Try Again!",
                });
                setShowSnackMessage(true);
              }
            })
            .catch((error) => {
              //swal("Something Went Wrong !", "Please Try Again!", "error");
              setSnackMessage({
                severity: "error",
                message: "Something Went Wrong !",
              });
              setShowSnackMessage(true);
            });
        } else {
          //swal("Process Terminated!");
          setSnackMessage({
            severity: "error",
            message: "Process Terminated!",
          });
          setShowSnackMessage(true);
        }
      });
    }
  };

  const handleCancel = () => {
    closePopUp();
  };

  const handleComments = (data) => {
    setComment(data);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackMessage(false);
  };

  const vertical = "bottom";
  const horizontal = "center";

  return (
    <Fragment>
      <Snackbar
        open={showSnackMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snackMessage?.severity}
          sx={{ width: "100%" }}
        >
          {snackMessage?.message}
        </Alert>
      </Snackbar>
      <FieldRow className="total">
        <Label label="Total Amount to Pay" className="custom-label" />
        <p>$ {totalAmount}</p>
      </FieldRow>

      <FieldRow>
        <InputField
          type="number"
          // step="0.01"
          label="Received Amount ($)"
          errorMsg={error ? "Required" : ""}
          onChange={(e) => handleAmountToPay(e)}
        />
      </FieldRow>

      <Balance>
        <h4>Balance Amount :</h4>
        <h4>${amountToReturn}</h4>
      </Balance>

      <FieldRow>
        <TextAreaField
          label="Note (If Any)"
          onChange={(e) => handleComments(e.target.value)}
        />
      </FieldRow>

      <ButtonWrap>
        <ButtonCustom btnTitle={"Cancel"} onClick={handleCancel} />

        <ButtonCustom
          type="primary"
          btnTitle={"Pay"}
          className="ml-2 blue"
          onClick={handleSubmit}
        />
      </ButtonWrap>
    </Fragment>
  );
};

export default PayByCash;
