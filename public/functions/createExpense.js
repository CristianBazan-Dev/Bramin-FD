const { ipcRenderer } = require('electron')

// Create gasto 
// New product function
const expenseForm = document.querySelector('#expenseForm')

const expense = document.querySelector('#expense')
const unitPrice = document.querySelector('#unitPrice')
const quantity = document.querySelector('#quantity')
const isInventary = document.querySelector('#isInventary')
const image = document.querySelector('#image')
const receipt = document.querySelector('#receipt')

expenseForm.addEventListener('submit', (e)=>{
    e.preventDefault
    const newExpense = {
        expense: expense.value,
        unitPrice: unitPrice.value,
        quantity: quantity.value, 
        isInventary: isInventary.checked, 
        image: image.value, 
        receipt: receipt.value
    }

    console.log(newExpense)

    ipcRenderer.send('new-expense', newExpense)
    
})


ipcRenderer.on('new-expense-created', (e, args )=>{
    const newExpense = JSON.parse(args)
    alert('Gasto añadido exitosamente!')
    console.log(newExpense)
})