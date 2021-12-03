import Axios from "axios";

export const getCities = () => {
  return Axios.get(`${process.env.REACT_APP_API_URL}/v1/cities`, {
    headers: {
      Authorization: localStorage.ACCESS_TOKEN,
    },
  });
};

export const login = (data) => {
  return Axios.post(`${process.env.REACT_APP_API_URL}/v1/login`, data);
};

export const printBillBar = (id) => {
  let printName = "Bar Print";
  Axios.get(
    `${process.env.REACT_APP_API_URL}/v1/orders/print-page/${id}?print_name=${printName}`,
    {
      headers: {
        Authorization: localStorage.ACCESS_TOKEN,
      },
    }
  ).then((res) => {
    if (res.data.data.printer_name != "") {
      printBill(res.data.data.html_data, res.data.data.printer_host_url, res.data.data.printer_name, printName);
    }
  });
};

export const printBillKitchen = (id) => {
  let printName = "Kitchen Print";
  Axios.get(
    `${process.env.REACT_APP_API_URL}/v1/orders/print-page/${id}?print_name=${printName}`,
    {
      headers: {
        Authorization: localStorage.ACCESS_TOKEN,
      },
    }
  ).then((res) => {
    if (res.data.data.printer_name != "") {
      printBill(res.data.data.html_data, res.data.data.printer_host_url, res.data.data.printer_name, printName);
    }
  });
};

export const printBillCustomer = (id) => {
  let printName = "Customer Print";
  Axios.get(
    `${process.env.REACT_APP_API_URL}/v1/orders/print-page/${id}?print_name=${printName}`,
    {
      headers: {
        Authorization: localStorage.ACCESS_TOKEN,
      },
    }
  ).then((res) => {
    if (res.data.data.printer_name != "") {
      printBill(res.data.data.html_data, res.data.data.printer_host_url, res.data.data.printer_name, printName);
    }
  });
};

export const printBill = (html_data, printHostUrl, printer_name, print_name) => {
  const formData = new FormData();
  formData.append('printer_name', printer_name);
  formData.append('print_name', print_name);
  formData.append('html_data', html_data);

  const axiConfig = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  Axios.post(`${printHostUrl}`, formData, axiConfig);
};
