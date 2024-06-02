const socketClient = io();
const addForm = document.getElementById('addForm')
const deleteForm = document.getElementById('deleteForm')

socketClient.on('productsUpdate', (productsArray) => {
   const productList = productsArray.map(product => {
       return `<div>
                   <h2>${product.title}</h2>
                   <p>Descripcion: ${product.description}</p>
                   <ul>
                       <li>Precio: ${product.price}</li>
                       <li>Thumbnail: ${product.thumbnail}</li>
                       <li>Code: ${product.code}</li>
                       <li>Stock: ${product.stock}</li>
                       <li>Status: ${product.status}</li>
                       <li>ID:${product.id} </li>
                   </ul>
               </div>`
       }).join('')
       productsContainer.innerHTML = productList
   });

addForm.addEventListener("submit", async (e) => {
   e.preventDefault();
   const title = document.getElementById("title").value;
   const price = document.getElementById("price").value;
   const description = document.getElementById("description").value;

   await fetch('/api/products', {
      method:"POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({title, price, description, code: 1})
   })
})

deleteForm.addEventListener("submit", async (e) => {
   e.preventDefault();
   const id = document.getElementById("id").value;

   await fetch(`/api/products/${id}`, {
      method:"DELETE",
      headers: {
         "Content-Type": "application/json",
      }
   })
})