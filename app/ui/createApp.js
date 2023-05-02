const { ipcRenderer } = require('electron')


// New product function
const gastoForm = document.querySelector('#gastoForm')

const gastosIniciales = document.querySelector('#gastosIniciales')
const precio_unitario = document.querySelector('#precio_unitario')
const cantidad = document.querySelector('#cantidad')



gastoForm.addEventListener('submit', (e)=>{
    const nuevoGasto = {
        gastosIniciales: gastosIniciales.value,
        precio_unitario: precio_unitario.value,
        cantidad: cantidad.value, 
    }

    console.log(nuevoGasto)

    ipcRenderer.send('nuevo-gasto', nuevoGasto)
    
})

// Receiving data from the backend 

// New task response.
//  Args it's going to be the info of productSaved in the backend route

// We received the object converted in a String, so we apply parse to generate an object again



ipcRenderer.on('nuevo-gasto-creado', (e, args )=>{
    const nuevoGasto = JSON.parse(args)
    
    alert('¡Producto creado exitosamente!')
    console.log(nuevoGasto)
})


