import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import clsx from "clsx";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import {
  GridRowModes,
  DataGrid,
  gridClasses,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { alpha, styled } from "@mui/material/styles";

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

const roles = ["Hot", "Cold"];
const randomRole = (index) => {
  return roles[index];
};

const initialRows = [
  {
    id: randomId(),
    name: "Milk Tea",
    joinDate: randomCreatedDate(),
    role: randomRole(0),
    stock: "In Stock",
  },
  {
    id: randomId(),
    name: "Lemon Tea",
    joinDate: randomCreatedDate(),
    role: randomRole(0),
    stock: "In Stock",
  },
  {
    id: randomId(),
    name: "Red Bean Ice",
    joinDate: randomCreatedDate(),
    role: randomRole(1),
    stock: "In Stock",
  },
  {
    id: randomId(),
    name: "Pineapple Ice",
    joinDate: randomCreatedDate(),
    role: randomRole(1),
    stock: "Out Of Stock",
  },
  {
    id: randomId(),
    name: "Bubble Tea",
    joinDate: randomCreatedDate(),
    role: randomRole(1),
    stock: "In Stock",
  },
];

export default function SoftDrinkDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setCountDrink(countDrink + 1);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    setCountDrink(countDrink - 1);
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
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "name",
      headerName: "Drinks",
      width: 280,
      editable: true,
      headerClassName: "customColumn",
    },
    {
      field: "joinDate",
      headerName: "Create date",
      type: "date",
      width: 280,
      editable: true,
      headerClassName: "customColumn",
    },
    {
      field: "role",
      headerName: "Temperature",
      width: 280,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Hot", "Cold"],
      headerClassName: "customColumn",
    },
    {
      field: "stock",
      headerName: "Stock Status",
      width: 280,
      editable: true,
      type: "singleSelect",
      valueOptions: ["In Stock", "Out Of Stock"],
      headerClassName: "customColumn",
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          negative: params.value === "Out Of Stock",
          positive: params.value === "In Stock",
        });
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      width: 280,
      cellClassName: "actions",
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
              <EditIcon
                className="text-emerald-500 hover:text-orange-500"
                sx={{ fontSize: 34 }}
              />
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <DeleteIcon
                className="text-red-500 hover:text-emerald-500"
                sx={{ fontSize: 34 }}
              />
            }
            label="Delete"
            onClick={() => handleDeleteOpen(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [countDrink, setCountDrink] = useState(5);

  const confirmDelete = () => {
    handleDeleteClick(deleteID)();
    setOpen(false);
    setDeleteID("");
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteID("");
  };

  const handleDeleteOpen = (id) => {
    setOpen(true);
    setDeleteID(id);
  };

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [
        ...oldRows,
        { id, name: "", age: "", isNew: true },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    };

    return (
      <GridToolbarContainer className="flex items-end justify-end">
        <Button
          color="primary"
          startIcon={<AddIcon className="font-semibold text-xl" />}
          onClick={handleClick}
        >
          <p className="font-semibold text-xl">Add Item</p>
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Box>
        <div className="flex items-center justify-start mt-4 mb-6">
          <h3 className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-100">
            Soft drinks
            <span className="text-gray-400 text-xl ml-3">
              (Total: {countDrink})
            </span>
          </h3>
        </div>
      </Box>
      <Box
        sx={{
          height: 500,
          fontWeight: "600",
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
          "& .customColumn": {
            fontSize: 24,
          },
          "& .MuiDataGrid-cell": {
            fontSize: 20,
          },
          "& .super-app-theme--cell": {
            backgroundColor: "rgba(224, 183, 60, 0.55)",
            color: "#1a3e72",
            fontWeight: "600",
          },
          "& .super-app.positive": {
            backgroundColor: "rgba(157, 255, 118, 0.49)",
            color: "#1a3e72",
            fontWeight: "600",
          },
          "& .super-app.negative": {
            backgroundColor: "#d47483",
            color: "#1a3e72",
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
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you confirm delete?"}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{ color: "red" }}
            // className="bg-red-500"
            onClick={() => {
              confirmDelete();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
