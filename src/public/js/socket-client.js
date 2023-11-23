const socket = io();

socket.on("productos", productos => {
    const tbody = document.querySelector(".product-table tbody");

    tbody.innerHTML = "";

    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${producto.thumbnails}"></td>
            <td>${producto.title}</td>
            <td>${producto.description}</td>
            <td>${producto.price}</td>
            <td>${producto.stock}</td>
            <td>
                <button class="borrarProducto" data-id="${producto.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tbody.appendChild(fila);

        const botonBorrar = fila.querySelector('.borrarProducto');
        botonBorrar.addEventListener('click', () => {
            const productoId = botonBorrar.dataset.id;
            console.log({ productoId })

            socket.emit("productos", productoId);
        });
    });
});

const formulario = document.getElementById('producto-form')

formulario.addEventListener('submit', function (event) {
    event.preventDefault();


    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const codigo = document.getElementById('codigo').value;
    const stock = document.getElementById('stock').value;
    const categoria = document.getElementById('categoria').value;

    const producto = {
        title: titulo,
        description: descripcion,
        price: precio,
        code: codigo,
        stock: stock,
        category: categoria
    }
    socket.emit('agregarProducto', producto);

    formulario.reset();
});