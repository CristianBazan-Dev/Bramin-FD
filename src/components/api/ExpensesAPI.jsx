import React, { useState, useEffect } from "react";

const { ipcRenderer } = window.require("electron");

function ExpensesAPI(props) {
  const [expenses, setExpenses] = useState([]);

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

  return {
    expenses: [expenses, setExpenses],
  };
}

export default ExpensesAPI;
