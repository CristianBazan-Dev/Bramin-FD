import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../GlobalState';

const { ipcRenderer } = window.require('electron');  

function InventoryAPI(props) {
    const state = useContext(GlobalState); 

    const [expenses, setExpenses] = useState([])
    const [inventory, setInventory] = useState([])

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

      useEffect(() => {
        const filtringExpenses = () => {
            expenses.filter(expens => {
            console.log(expens.isInventary === true)
        })}

        filtring
      }, [] )

    
      console.log("InventoryAPI", "Expenses:", expenses, "Inventory: ", inventory)
    return {
        inventory: [inventory, setInventory],
    };
}

export default InventoryAPI;