import React from 'react';
import { useSelector } from "react-redux";
import { ButtonCustom } from "../../components/button";
import { addOrder } from "../../api/order";
import swal from "sweetalert";

const AddOrder = () => {

    const selectedItems = useSelector((state) => state.selectedItems);

    const handleOrder = () => {
        swal({
          title: "Confirm to Add",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            addOrder(selectedItems);
          } else {
            swal("Process Terminated!");
          }
        });
      }

    return (
        <ButtonCustom type="primary" className="green" btnTitle="Add Order" onClick={handleOrder}/>
    )
}

export default AddOrder;
