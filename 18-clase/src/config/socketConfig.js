import { Server } from "socket.io";
import ContainerMongoDB from "../containers/containerMongo.js";
import { normalizeMessages } from '../utils/normalize.js'



//MOVER LINEA 29
const messagesDB = new ContainerMongoDB('messages');

//SOCKETS MOVER Y AGREGAR LA PARTE DE PRODUCTOS

export function configureSocket(server) {

    const io = new Server(server)

    io.on('connection', async (client) => {
        console.log("Usuario conectado:", client.id);

        const msg = await messagesDB.getAll();
        const normalizedMessages = normalizeMessages(msg);
        io.sockets.emit("loadMessages", normalizedMessages)


        client.on("newMessage", async (data) => {
            await messagesDB.save(data);
            const msg = await messagesDB.getAll()
            const normalizedMessages = normalizeMessages(msg);
            io.sockets.emit("loadMessages", normalizedMessages)
        })

    });

}