
const socketClient = io();
const buttonShow = document.getElementById('showProducts');
const messageArea = document.getElementById('message');
const formNewMessage = document.getElementById('formNewMessage')
const loginUserName = document.getElementById('loginName')
const loginForm = document.getElementById('loginForm')
const welcomeUser = document.getElementById('welcomeUser');
const byeUser = document.getElementById('byeUser');
const cookieUsername = 'username'
const socket = io.connect();


// MOSTRAR PRODUCTOS DE LA BASE
const showProducts = (products) => {
    const listP = products.map(({ name, price, thumbnail, description }) => {
        return `
              <tr>
                <td id="prodName" class="text-center">${name}</td>
                <td class="text-center">${price}</td>
                <td> <img class="img-thumbnail rounded mx-auto d-block" src="${thumbnail}" alt="${description}"> </td>
                <td> <p>${description}</p> </td>
              </tr>
              `;
    });

    const prodList = `
                      <tr>
                          <th class="table-info text-center">Nombre del producto</th>
                          <th class="table-info text-center">Precio del producto</th>
                          <th class="table-info text-center">Imágen del producto</th>
                          <th class="table-info text-center">Descripción del producto</th>
                      </tr>
                        ${listP.join('\n')}
                      `;
    const listOfProds = document.getElementById('productsRender');
    listOfProds.innerHTML = prodList;
}

function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

async function getUsername(username) {
    const userName = getCookie(username)
    welcomeUser.innerText = `Welcome ${userName}`
    return userName
}

const LogUserName = getUsername(cookieUsername);



// MOSTRAR PRODUCTS FAKER
buttonShow.addEventListener('click', async e => {

    e.preventDefault();
    try {
        const quest = await fetch('/api/products-test', {
            method: 'GET',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json charset=UTF-8' }
        })
        const data = await quest.json();
        showProducts(data);
    } catch (error) {
        console.log(error);
    }
});



// ESQUEMA NORMALIZR
const authorEntity = new normalizr.schema.Entity('author', {}, { idAttribute: "email" })
const messageEntity = new normalizr.schema.Entity('message', { author: authorEntity }, { idAttribute: "_id" })
const mensajesEntity = new normalizr.schema.Array(messageEntity)



// RENDERIZAR MENSAJES NORMALIZADOS
function render(data) {
    const mensajesdeNormalized = normalizr.denormalize(data.result, mensajesEntity, data.entities);

    const html = mensajesdeNormalized.map((elem, index) => {
        return (`<div>
            <strong>${elem.author.email}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('loadMessages', function (data) { render(data); });

// FORMULARIO NUEVO MENSAJE
formNewMessage.addEventListener('submit', e => {

    e.preventDefault();

    const mensaje = {
        author: {
            email: document.getElementById('useremail').value,
            nombre: document.getElementById('userName').value,
            apellido: document.getElementById('userLastName').value,
            edad: document.getElementById('age').value,
            alias: document.getElementById('nickName').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById('message').value.toUpperCase()
    };

    socketClient.emit('newMessage', mensaje);
    messageArea.value = "";


})




