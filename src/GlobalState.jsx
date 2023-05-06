import { useState, createContext } from "react";
import ExpensesAPI from "./components/api/ExpensesAPI";
import InventoryAPI from "./components/api/InventoryAPI";


export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const [requests, setRequests] = useState([]);
  const [services, setServices] = useState([]);

  const [inventory, setInventory] = useState([]);

  const state = {
    modal: [showModal, setShowModal],
    requests: [requests, setRequests],
    services: [services, setServices],
    expensesAPI: ExpensesAPI(),
    inventoryAPI: InventoryAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
