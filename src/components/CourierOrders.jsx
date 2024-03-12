import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import clsx from "clsx";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";

import { BiDetail } from "react-icons/bi";
import { ProgressBar, Step } from "react-step-progress-bar";
import { TiTickOutline } from "react-icons/ti";
import { PiCookingPot } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { IoMdPrint } from "react-icons/io";

import {
  GridRowModes,
  DataGrid,
  gridClasses,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import { alpha, styled } from "@mui/material/styles";

import {
  getOrderPlaced,
  getCourierUser,
  updateOrderStatus,
  saveCourierOrder,
} from "../utils/firebaseFunctions";

import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

import CustomerRouteMap from "./CustomerRouteMap";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

export default function CourierOrders() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [finalClickInfo, setFinalClickInfo] = useState(null);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    // const editedRow = rows.find((row) => row.id === id);
  };

  const handleOnCellClick = async (params) => {
    // const courier = getCourierUser(params.id);
    setFinalClickInfo(params);
    if (params.field === "courier" && params.value !== null) {
      const orderData = orders.find((orders) => orders.id === params.id);
      let courierData = {};
      await getCourierUser(orderData.courierID).then((data) => {
        courierData = data;
      });
      setCourier(courierData);
    }
    // console.log(params.value)

    if (params.field === "courier" && params.value !== "") {
      handleCourierDetailsOpen();
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    // let data = {};
    // if (updatedRow.orderStatus === "Reject") {
    //   data = {
    //     id: updatedRow.id,
    //     orderStatus: updatedRow.orderStatus,
    //   };
    //   updateOrderStatus(data);
    //   handleRejectReasonOpen(true);
    // } else if (
    //   updatedRow.orderStatus === "Preparing" ||
    //   updatedRow.orderStatus === "Order Placed"
    // ) {
    //   data = {
    //     id: updatedRow.id,
    //     orderStatus: updatedRow.orderStatus,
    //   };
    //   updateOrderStatus(data);
    //   setAlert("visible");
    //   setTimeout(() => {
    //     setAlert("invisible");
    //   }, 4000);
    // }
    // setStatusUpdate(statusUpdate + 1);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "orderID",
      headerName: "ORDER ID",
      width: 180,
      editable: true,
      headerClassName: "customColumn",
    },
    {
      field: "createDate",
      headerName: "CREATED AT",
      width: 280,
      editable: false,
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleString() : "",
      headerClassName: "customColumn",
    },
    {
      field: "estimatedArrivalTime",
      headerName: "ESTIMATED ARRIVAL (Edit)",
      width: 280,
      editable: true,
      type: "singleSelect",
      valueOptions: ["10min", "15min", "20min", "25min", "30min"],
      headerClassName: "customColumn",
    },

    {
      field: "totalPrice",
      headerName: "TOTAL PRICE",
      width: 180,
      editable: false,
      headerClassName: "customColumn",
    },

    {
      field: "payment",
      headerName: "Playment",
      width: 180,
      editable: false,
      headerClassName: "customColumn",
    },

    {
      field: "orderStatus",
      headerName: "Order Status (Edit)",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Order Placed", "Preparing", "Reject"],
      headerClassName: "customColumn",

      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          orderPlaced: params.value === "Order Placed",
          preparing: params.value === "Preparing",
          reject: params.value === "Reject",
          onTheWay: params.value === "On the way",
          delivered: params.value === "Delivered",
        });
      },
    },

    {
      field: "details",
      headerName: "DETAILS",
      width: 180,
      editable: false,
      type: "actions",
      headerClassName: "customColumn",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={
              <BiDetail className="text-orange-500 hover:text-emerald-500 text-4xl" />
            }
            label="Edit"
            className="textPrimary"
            onClick={() => handleDetailsOpen(id)}
            color="inherit"
          />,
        ];
      },
    },

    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Action",
    //   width: 180,
    //   cellClassName: "actions",
    //   headerClassName: "customColumn",
    //   getActions: ({ id }) => {
    //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

    //     if (isInEditMode) {
    //       return [
    //         <GridActionsCellItem
    //           icon={<SaveIcon />}
    //           label="Save"
    //           sx={{
    //             color: "primary.main",
    //           }}
    //           onClick={handleSaveClick(id)}
    //         />,
    //         <GridActionsCellItem
    //           icon={<CancelIcon />}
    //           label="Cancel"
    //           className="textPrimary"
    //           onClick={handleCancelClick(id)}
    //           color="inherit"
    //         />,
    //       ];
    //     }

    //     return [
    //       <GridActionsCellItem
    //         icon={
    //           <EditIcon
    //             className="text-emerald-500 hover:text-orange-500"
    //             sx={{ fontSize: 34 }}
    //           />
    //         }
    //         label="Edit"
    //         className="textPrimary"
    //         onClick={handleEditClick(id)}
    //         color="inherit"
    //       />,
    //     ];
    //   },
    // },
    // {
    //   field: "courier",
    //   headerName: "COURIER",
    //   width: 180,
    //   editable: false,
    //   headerClassName: "customColumn",
    // },
  ];
  const navigate = useNavigate();

  const [openDetails, setOpenDetails] = useState(false);
  const [orders, setOrder] = useState([]);
  const [selectedID, setSelectedID] = useState("1697226551692");
  const [selectedOrder, setSelectedOrder] = useState({});

  const [estimatedDateTime, setEstimatedDateTime] = useState("");

  const [openRejectReason, setRejectReason] = useState(false);

  const [courierDetails, setCourierDetails] = useState(false);

  const [alert, setAlert] = useState("invisible");
  const [courier, setCourier] = useState({});

  const [rejectID, setRejectID] = useState("");
  //   const [statusUpdate, setStatusUpdate] = useState(0);

  const getEstimatedTime = () => {
    const order = selectedOrder;
    if (order && order.orderDate) {
      const orderDate = order.orderDate;
      const timePart = orderDate.split(" ")[1];
      const chineseTime = timePart.match(/(上午|下午)/)[0];
      const timeWithoutAmPm = timePart.replace(/(上午|下午)/, "");

      const eta = order.eta;
      const etaRange = eta.split("-").map(Number);
      const averageEta = (etaRange[0] + etaRange[1]) / 2;

      const estimatedTime = new Date(
        `${orderDate.split(" ")[0]} ${timeWithoutAmPm}`
      );
      estimatedTime.setMinutes(estimatedTime.getMinutes() + averageEta);

      setEstimatedDateTime(
        estimatedTime.toLocaleString().replace(/(上午|下午)/, chineseTime)
      );
    }
  };

  //   function getProgress(order = orders[index]) {
  function getProgress(orderId, orders) {
    let progress = 0;
    const order = orders.find((order) => order.id === orderId);

    if (order && order.orderStatus) {
      switch (order.orderStatus) {
        case "Order Placed":
          progress = 16;
          break;
        case "Preparing":
          progress = 49.5;
          break;
        case "On the way":
          progress = 82.5;
          break;
        case "Delivered":
          progress = 100;
          break;
        default:
          progress = 0;
      }
    }

    return progress;
  }

  const handleDetailsOpen = (id) => {
    setSelectedID(id);
    // setSelectedOrder(orders.find((order) => order.id === selectedID));
    getEstimatedTime();
    setOpenDetails(true);
  };

  const handleDetailsClose = () => {
    setOpenDetails(false);
  };

  const acceptOrder = async (id) => {
    const courierInfo = localStorage.getItem("userId");

    const courierData = {
      orderID: selectedOrder?.id,
      courierInfo: courierInfo,
      paymentMethod: selectedOrder?.paymentMethod,
      customerName: selectedOrder?.customerName,
      phone: selectedOrder?.phone,
      region: selectedOrder?.region,
      rating: 0,
      userAddress: selectedOrder?.userAddress,
      optionalAddress: selectedOrder?.optionalAddress,
      userInfo: selectedOrder?.userInfo,
      totalPrice: selectedOrder?.totalPrice,
      orderDeliveryFee: selectedOrder?.orderDeliveryFee,
      cartItems: selectedOrder?.cartItems,
      eta: "20",
      acceptOrderDate: new Date().toLocaleString(),
      orderStatus: "On the way",
    };
    await saveCourierOrder(courierData);

    let data = {};
    data = {
      id: id,
      orderStatus: "On the way",
      courier: "Peter",
    };
    updateOrderStatus(data);
    // setStatusUpdate(statusUpdate + 1);
    setOpenDetails(false);
    setAlert("visible");
    setTimeout(() => {
      setAlert("invisible");
    }, 3000);
    setTimeout(() => {
      navigate("/courierOrderList");
    }, 1000);
  };

  useEffect(() => {
    fetchData();
    // setStatusUpdate(0);

    // console.log(orders);
  }, []);

  useEffect(() => {
    // if (selectedID) {
    setSelectedOrder(orders.find((order) => order.id === selectedID));
    // }
  }, [selectedID, orders]);

  useEffect(() => {
    fetchData();
  }, [alert]);

  const fetchData = async () => {
    await getOrderPlaced().then((data) => {
      console.log(data);
      setOrder(data);

      const updatedRows = data.map((order, index) => {
        let [date, time] = order.orderDate.split(" ");

        if (time.includes("上午")) {
          time = time.replace("上午", "");
        } else if (time.includes("下午")) {
          time = time.replace("下午", "");
        }

        const formattedDate = `${date} ${time}`;

        return {
          id: order.id,
          orderID: order.id.toString(),
          createDate: new Date(formattedDate),
          estimatedArrivalTime: "20min",
          totalPrice: `$${order.totalPrice}`,
          payment: order.paymentMethod,
          courier: order.courier === "" ? "" : order.courier,
          orderStatus: order.orderStatus,
        };
      });

      setRows(updatedRows);
    });
  };

  //   const handleRejectReasonOpen = (id) => {
  //     setRejectID(id);
  //     setRejectReason(true);
  //   };

  //   const handleRejectReasonClose = () => {
  //     setRejectReason(false);
  //   };

  //   const rejectSubmit = (id) => {
  //     let data = {};

  //     data = {
  //       id: id,
  //       orderStatus: "Reject",
  //     };
  //     updateOrderStatus(data);
  //     setRejectReason(false);
  //     setOpenDetails(false);
  //     setStatusUpdate(statusUpdate + 1);
  //     setAlert("visible");
  //     setTimeout(() => {
  //       setAlert("invisible");
  //     }, 3000);
  //   };

  const handleCourierDetailsOpen = () => {
    setCourierDetails(true);
  };

  const handleCourierDetailsClose = () => {
    setCourierDetails(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mt-4 mb-4 ">
        <h1 className="text-gray-700 text-4xl font-semibold">
          Restaurant Orders
        </h1>
        <Stack
          sx={{ width: "30%", height: "80px" }}
          spacing={2}
          className={`float-right ${alert}`}
        >
          <Alert severity="success" variant="filled">
            <AlertTitle>
              <p className="font-semibold text-2xl">Success</p>
            </AlertTitle>
            <p className="font-semibold text-xl">Order has been accept!</p>
          </Alert>
        </Stack>
      </div>
      <Box
        sx={{
          height: 1000,
          fontWeight: "600",
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
          "& .customColumn": {
            fontSize: 20,
          },
          "& .MuiDataGrid-cell": {
            fontSize: 18,
          },
          "& .super-app-theme--cell": {
            backgroundColor: "rgba(224, 183, 60, 0.55)",
            color: "#1a3e72",
            fontWeight: "600",
          },
          "& .super-app.orderPlaced": {
            backgroundColor: "#7dafff",
            color: "black",
            fontWeight: "600",
          },
          "& .super-app.preparing": {
            backgroundColor: "#FFFF00",
            color: "black",
            fontWeight: "600",
          },
          "& .super-app.reject": {
            backgroundColor: "#FFC0CB",
            color: "black",
            fontWeight: "600",
          },
          "& .super-app.onTheWay": {
            backgroundColor: "#b796ff",
            color: "black",
            fontWeight: "600",
          },
          "& .super-app.delivered": {
            backgroundColor: "#96ffa8",
            color: "black",
            fontWeight: "600",
          },
        }}
      >
        <StripedDataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onCellClick={handleOnCellClick}
          //   slots={{
          //     toolbar: EditToolbar,
          //   }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </Box>
      <div className="flex flex-col ">
        <Dialog
          open={openDetails}
          onClose={handleDetailsClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <p className="text-4xl flex justify-center items-center font-semibold">
              Delivery Details{" "}
              <IoMdPrint className="absolute right-5 cursor-pointer text-emerald-500" />
            </p>
          </DialogTitle>
          {/* <DialogContent className=" no-scrollbar"> */}
          <div className="mb-2 no-scrollbar ml-4">
            <p className="font-semibold text-xl">Delivery location</p>
          </div>
          <div className="flex justify-center items-center">
            <CustomerRouteMap />
          </div>
          <div className="mt-2 ml-6">
            <span className="font-semibold text-gray-500">
              Distance : 0.8 km
            </span>
            <span className="font-semibold text-gray-500 ml-10">
              Duration : 4 mins
            </span>
          </div>
          <div className="ml-4 mt-4">
            <p className="font-semibold text-xl">Customer Info</p>
            {selectedOrder && (
              <div>
                <div>
                  <p className=" font-semibold py-2">
                    Customer Name :{" "}
                    <span className="text-gray-500">
                      {" "}
                      {selectedOrder?.customerName}
                    </span>
                  </p>
                </div>
                <div>
                  <p className=" font-semibold py-2">
                    Customer Contact :{" "}
                    <span className="text-gray-500">
                      {" "}
                      {selectedOrder?.phone}
                    </span>
                  </p>
                </div>
                <div>
                  <p className=" font-semibold py-2">
                    Customer Address :{" "}
                    <span className="text-gray-500">
                      {" "}
                      {selectedOrder?.userAddress}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
          <br />
          <hr />
          {selectedOrder && (
            <div className="mt-2 p-4">
              <div className="flex items-center justify-center">
                <p className="font-semibold text-4xl">Order Details</p>
              </div>
              <div>
                <p className="text-xl font-semibold py-2">
                  Order Status :{" "}
                  <span className="text-gray-500">
                    {" "}
                    {selectedOrder?.orderStatus}
                  </span>
                </p>
              </div>
              <ProgressBar percent={getProgress(selectedID, orders)}>
                <Step>
                  {({ accomplished }) => (
                    <div
                      className={`indexedStep ${
                        accomplished ? "accomplished" : null
                      }`}
                    >
                      <TiTickOutline className="text-xl" />
                    </div>
                  )}
                </Step>
                <Step>
                  {({ accomplished }) => (
                    <div
                      className={`indexedStep ${
                        accomplished ? "accomplished" : null
                      }`}
                    >
                      <PiCookingPot className="text-xl" />
                    </div>
                  )}
                </Step>
                <Step>
                  {({ accomplished }) => (
                    <div
                      className={`indexedStep ${
                        accomplished ? "accomplished" : null
                      }`}
                    >
                      <CiDeliveryTruck className="text-xl" />
                    </div>
                  )}
                </Step>
                <Step>
                  {({ accomplished }) => (
                    <div
                      className={`indexedStep ${
                        accomplished ? "accomplished" : null
                      }`}
                    >
                      <AiOutlineHome className="text-xl" />
                    </div>
                  )}
                </Step>
              </ProgressBar>
              <div className="">
                <p className="text-xl font-semibold py-2">Restaurant Details</p>
                <p className="">
                  Restaurant Name :
                  <span className="text-gray-400">
                    {" "}
                    {selectedOrder?.cartItems?.[0]?.restaurantName}
                  </span>
                </p>
                <p className="">
                  Restaurant Address :
                  <span className="text-gray-400">
                    {" "}
                    {selectedOrder?.cartItems?.[0]?.address}
                  </span>
                </p>
              </div>
              <div className="mt-4 space-y-2 rounded-lg border h-60 flex flex-col bg-gray-50 px-2 py-2 sm:px-6 overflow-y-scroll ">
                {selectedOrder?.cartItems?.map((item) => (
                  <div
                    className="flex flex-col gap-4 rounded-lg bg-gray-50 sm:flex-row border-2"
                    key={item.id}
                  >
                    <img
                      className="m-2 h-24 w-24 rounded-md object-cover object-center"
                      src={item?.imageURL}
                      alt=""
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">{item?.title}</span>
                      <span className="float-right text-gray-400 mt-2">
                        Qty:{" "}
                        <span className="text-textColor">{item?.qty || 0}</span>
                      </span>
                      <p className="text-lg font-bold mt-2">
                        $ {item?.price || 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end items-end">
                <p className="font-semibold text-2xl mt-4 mr-4">Total Price</p>
                <p className="text-2xl font-semibold">
                  $ {selectedOrder?.totalPrice}
                </p>
              </div>
            </div>
          )}
          <hr />
          {/* </DialogContent> */}
          <div className="h-20">
            {/* {selectedOrder?.orderStatus === "Order Placed" && (
              <div className="inline rounded-md bg-red-500 absolute left-10">
                <Button
                  onClick={() => handleRejectReasonOpen(selectedOrder?.id)}
                  className="absolute right-0"
                >
                  <p className="text-2xl p-2 text-white font-semibold">
                    {"Reject"}
                  </p>
                </Button>
              </div>
            )} */}
            {selectedOrder?.orderStatus === "Preparing" ? (
              <div className=" bg-emerald-500 hover:bg-orange-500 flex items-center justify-center">
                <Button
                  className="flex items-center justify-center"
                  onClick={() => acceptOrder(selectedOrder?.id)}
                >
                  <p className="text-2xl p-1 text-white font-semibold">
                    Accept order
                  </p>
                </Button>
              </div>
            ) : (
              <div className="inline rounded-md absolute right-10">
                <Button onClick={handleDetailsClose}>
                  <p className="text-2xl p-2  font-semibold">Close</p>
                </Button>
              </div>
            )}
          </div>
        </Dialog>
      </div>
      {/* <Dialog
        open={openRejectReason}
        onClose={handleRejectReasonClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reject Reason"}</DialogTitle>
        <DialogContent>
          <div className="border border-gray-400 rounded-xl p-2 mb-4">
            <textarea
              rows="4"
              cols="100"
              placeholder="Fill the reject reason..."
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            ></textarea>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleRejectReasonClose()}>
            <p className="text-red-500">Cancel</p>
          </Button>
          <Button onClick={() => rejectSubmit(rejectID)} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog> */}
      <Dialog
        open={courierDetails}
        onClose={() => handleCourierDetailsClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <p className="font-semibold text-2xl">Courier Info</p>
        </DialogTitle>
        <DialogContent>
          <div className="rounded-xl p-2 mb-4">
            <div className="flex justify-center items-center">
              <FaUserAlt className="text-4xl " />
            </div>
            <br />
            <p className="text-xl font-semibold">
              Name :{" "}
              <span className="text-gray-400">
                {" "}
                {courier?.firstName} {courier?.lastName}
              </span>
            </p>
            <br />
            <p className="text-xl font-semibold">
              Email : <span className="text-gray-400"> {courier?.email}</span>
            </p>
            <br />
            <p className="text-xl font-semibold">
              Phone : <span className="text-gray-400"> {courier?.phone}</span>
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCourierDetailsClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
