import React from "react";
import { useContext, useState, useEffect } from "react";

import { GlobalState } from "../../GlobalState";

import Table from "../utils/table/Table";

import PageSelection from "../utils/page-selection/PageSelection";

import ButtonsRender from "../utils/buttons-render/ButtonsRender";
import { Button } from "@mui/material";

const { ipcRenderer } = window.require("electron");

function Expenses(props) {
  const state = useContext(GlobalState);

  const [expenses, setExpenses] = useState([]);

  const [buttonsId, setButtonsId] = useState([]);

  useEffect(() => {
    ipcRenderer.send("get-expenses");

    //   We convert the string object that we received in a json.
    //   Here we're executing the render function sending it
    ipcRenderer.on("get-expenses", (e, args) => {
      const expensesReceived = JSON.parse(args);
      const expenses = expensesReceived;
      setExpenses(expenses);
    });
  }, []);

  const editButton = (editId) => {};

  const deleteButton = (editId) => {
    const result = window.confirm(
      "¿Está seguro de querer eliminar el producto?"
    );
    if (result) {
      ipcRenderer.send("delete-expense", editId);
    }
    window.location.reload();
  };

  const tableColumns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "createdAt",
      headerName: "Fecha",
      type: "date",
      width: 200,
      valueGetter: ({ value }) => value && new Date(value),
      editable: true,
    },
    { field: "expense", headerName: "Gasto", width: 300, editable: true },
    {
      field: "unitPrice",
      headerName: "Precio unitario",
      type: "number",
      width: 200,
      editable: true, 
    },
    {
      field: "quantity",
      headerName: "Cantidad",
      type: "number",
      width: 300,
      editable: true, 
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      width: 300,
      editable: true, 
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 300,
      isRowSelectable: false,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <ButtonsRender editId={params.row.id} deleteId={params.row.id} />
        );
      },
      disableClickEventBubbling: true,
      checkboxSelection: false,
    },
  ];

  // valueGetter: (params: GridValueGetterParams) =>
  //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  console.log("Expenses: ", expenses, "ButtonsIds: ", buttonsId);

  const tableRows = expenses.map((expens) => {
    const date = new Date().toLocaleDateString();
    return {
      id: expens._id,
      createdAt: expens.createdAt,
      expense: expens.expense,
      unitPrice: `$ ${expens.unitPrice}`,
      quantity: expens.quantity,
      total: `$ ${expens.unitPrice * expens.quantity}`,
    };
  });

  return (
    <div className="expenses-page">
      <h1>Gastos</h1>
      <PageSelection />

      <Table columns={tableColumns} rows={tableRows} />
    </div>
  );
}

export default Expenses;
