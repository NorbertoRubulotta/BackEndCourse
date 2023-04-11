import { Server } from "socket.io";
import { normalizeMessages } from '../utils/normalize.js'
import { MessagesContainer } from "../persistence/daos/factory.js";

//SOCKETS MOVER Y AGREGAR LA PARTE DE PRODUCTOS

export function configureSocket(server) {

    const io = new Server(server)

    io.on('connection', async (client) => {
        console.log("Usuario conectado:", client.id);

        const msg = await MessagesContainer.getAll();
        const normalizedMessages = normalizeMessages(msg);
        io.sockets.emit("loadMessages", normalizedMessages)


        client.on("newMessage", async (data) => {
            await MessagesContainer.save(data);
            const msg = await MessagesContainer.getAll()
            const normalizedMessages = normalizeMessages(msg);
            io.sockets.emit("loadMessages", normalizedMessages)
        })

    });

}