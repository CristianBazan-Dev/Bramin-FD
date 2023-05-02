const { ipcRenderer, app } = require('electron')

const editModal = document.querySelector('#edit-modal-container')

const editForm = document.querySelector('#editForm')

const editGastosIniciales = document.querySelector('#editGastosIniciales')
const editPrecio_unitario = document.querySelector('#editPrecio_unitario')
const editCantidad = document.querySelector('#editCantidad')


// New product function


// Creating an array for products so they can refresh automatically once we create a new one 
// This is going to be the state of the app. The data that we modified and process. 
// We apply this so in the render function it can be filled by the products that we received from the db 

let products = [];

// Updatestatus variable it's going to be used by the form that's going to show the data
// This it's going to be ok if we're adding a edit page 

let updateStatus = false; 

// We're adding another variable that's going to be the id of the product to update. 
// It's going to be filled by the id of the product that we're updating 
let idProductToUpdate = ''

// Date function

// Render products 
const productsBody = document.querySelector('#productsBody')

function renderProducts(products){
    productsBody.innerHTML = ''
    products.map(p =>{
        const date = new Date(p.dateOff).toLocaleDateString("es-AR",  {timezone: "UTC-3"});
       

        productsBody.innerHTML += `
        <tr class="table-light">
                <td  data-label="Gasto" id="gasto">${p.gastosIniciales}</td>
                <td data-label="Precio" id="precio_unitario">$${p.precio_unitario}</td>
                <td data-label="Cantidad" id="cantidad">${p.cantidad}</td>
                <td data-label="Precio total" id="total">$${p.precio_unitario * p.cantidad}</td>
               
                
                <form id="updateForm">
                    <td data-label="Stock">
                        <input class="stock"id="stockUpt" type="number" onclick="updateStock('${p._id}')" name="${p._id}" class="input-table" value="${p.stock}">
                    </td>
                    <td data-label="Venc.">${new Date(p.createdAt).toLocaleString()}</td>
                    <td data-label="Acciones" class="btn-table-actions">
                    
                        <div class="button-container two">
                        <button onClick="editProducts('${p._id}')" class="btn btn-primary">Editar</button>
                            <button onClick="deleteProduct('${p._id}')" class="btn btn-danger">Eliminar</button>
                        </div>              
                            
                        
                    </td>
                </form>
                
                
            </tr> 

        `
        
    })
}


// Delete function
// We pass the id so it showed to us. 
// We're sending an event to tell the main process that we're requesting to the db

function deleteProduct(id){
    const result = confirm('¿Está seguro de querer eliminar el producto?')
    if(result){
        ipcRenderer.send('eliminar-gasto', id);
    }
    return; 
}

// Edit function 

function editProducts(id){
    editModal.classList.add('active')
    updateStatus = true;
    idProductToUpdate = id;
    const product = products.find((product) => product._id === id);
    editGastosIniciales.value = product.gastosIniciales;
    editPrecio_unitario.value = product.precio_unitario;
    editCantidad.value = product.cantidad;
}

// Edit product 



 editForm.addEventListener('submit', async (e)=>{

   const editProductForm = {
            gastosIniciales: editGastosIniciales.value,
            precio_unitario: editPrecio_unitario.value,
            cantidad: editCantidad.value, 
         };
         console.log(editGastosIniciales.value, editPrecio_unitario.value, editCantidad.value)
         ipcRenderer.send('update-product', { ...editProductForm, idProductToUpdate})
    });

// Update stock function 
function updateStock(id){
         idProductToUpdate = id
         const stockButtons = document.getElementsByName(id)

         Array.from(stockButtons).forEach(stockButton =>{
            stockButton.addEventListener('change', ()=>{
                const product = products.find((product) => product._id === id);
                const stockUpdate = {
                    stock: stockButton.value
                }
                console.log(stockButton.name + " " + stockButton.value)
                ipcRenderer.send('update-stock', { ...stockUpdate, idProductToUpdate})
            })
         })
    
}





ipcRenderer.send('obtener-gastos')

// We convert the string object that we received in a json.
// Here we're executing the render function sending it
ipcRenderer.on('obtener-gastos', (e,args) =>{
    const productsReceived = JSON.parse(args);
    products = productsReceived;
    renderProducts(productsReceived)
})

// Receiving the data from the delete process of the main 
ipcRenderer.on('delete-product', (e,args)=>{
    const deletedProduct = JSON.parse(args); 
    // Searching and taking it off from the render.
    // We're saying that it's going to search for all the tasks that are different of the deleted one 
    const newProducts = products.filter(t =>{
        return t._id !== deletedProduct._id;
    });
    // Updating the list
    products = newProducts;
    renderProducts(products)
})

// Listening to the updated products 

ipcRenderer.on('update-product', (e,args)=>{
    const updatedProduct = JSON.parse(args);
    const products = products.map(p => {
        if (p._id === updatedProduct._id){
            p.gastosIniciales = updatedProduct.gastosIniciales; 
            p.precio_unitario = updatedProduct.precio_unitario; 
            p.cantidad = updatedProduct.cantidad; 
          
        }
        return p; 
    }) 
    renderProducts(products)
})


// Listening to the updated stock
ipcRenderer.on('update-stock', (e,args)=>{
    const updatedProduct = JSON.parse(args);
    const products = products.map(p => {
        if (p._id === updatedProduct._id){
            p.stock = updatedProduct.stock; 
        }
        return p; 
    }) 
    renderProducts(products)
})