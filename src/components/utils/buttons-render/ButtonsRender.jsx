import React from "react";

import { Button } from "@mui/material";
import ModalForm from "../modal-form/ModalForm";
import { GlobalState } from "../../../GlobalState";
import { useContext } from "react";

const {ipcRenderer} = window.require('electron'); 



function ButtonsRender({ editId, deleteId }) {
  const state = useContext(GlobalState);

  const [showModal, setShowModal] = state.modal;

  const editButton = (editId) => {
    setShowModal(true)
   
  }
   


const deleteButton = (editId) => {
 const result = window.confirm('¿Está seguro de querer eliminar el producto?')
   if(result){
       ipcRenderer.send('delete-expense', editId);
   }
   window.location.reload(); 
};


  return (
    <div className="buttons-render-page">
      <Button
        variant="contained"
        size="medium"
        style={{
          marginLeft: 16,
          backgroundColor: "#8da99b",
          color: "#2c2827",
          fontFamily: "Montserrat",
          fontWeight: "800",
        }}
        onClick={() => {editButton(editId)}}
      >
        Editar
      </Button>

      <Button
        variant="contained"
        size="medium"
        style={{
          marginLeft: 16,
          backgroundColor: "#610a10   ",
          color: "#ffffff",
          fontFamily: "Montserrat",
          fontWeight: "800",
        }}
        onClick={() => {deleteButton(deleteId)}}
      >
        Eliminar
      </Button>
    </div>
  );
}

export default ButtonsRender;
