
const socket = io.connect();

function render(data) {
    const html = data.map((elem, index) => {
        return (`<div> <span style="color: blue;"> ${elem.date}</span>
            <strong>${elem.email}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function (data) { render(data); });

function addMessage(e) {
    const mensaje = {
        email: document.getElementById('username').value,
        text: document.getElementById('texto').value.toUpperCase()
    };
    mensaje.date = new Date().toLocaleString()
    socket.emit('new-message', mensaje);
    return false;
}


socket.on('products', function (products) { renderProduct(products); });

function renderProduct(products) {
    let headerTable = `<tr style="color: rgb(88, 188, 228);">
    <td><strong>TITLE</strong></td>
    <td><strong>PRICE</strong></td>
    <td><strong>THUMBNAIL</strong></td>
    <td><strong>ID</strong></td>
</tr>`
    const html = products.map((elem, index) => {
        return (`<tr>
        <td>${elem.title}</td>
        <td> ${elem.price}</td>
        <td><img src=${elem.thumbnail} style="width: 3rem;"></img></td>
        <td>${elem.id}</td>
        </tr>
   `)
    });
    document.getElementById('productsRender').innerHTML = headerTable += html;
}

function addProduct(e) {
    const newProduct = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('new-product', newProduct);
    return false;
} 