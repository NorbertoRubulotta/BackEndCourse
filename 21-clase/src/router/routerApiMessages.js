
import { controllerPostMessages, deleteAll, createMessagesTable, controllerGetMessages, controllerGetByIdMessages, controllerPutByIdMessages, controllerDeleteById } from '../controllers/messagesController.js';
import { Router } from 'express';
const routerApiMessages = Router();

routerApiMessages.get('/', createMessagesTable, controllerGetMessages);
routerApiMessages.post('/', createMessagesTable, controllerPostMessages);
routerApiMessages.get('/:id_msg', createMessagesTable, controllerGetByIdMessages);
routerApiMessages.put('/:id_msg', createMessagesTable, controllerPutByIdMessages);
routerApiMessages.delete('/', createMessagesTable, deleteAll);
routerApiMessages.delete('/:id_msg', createMessagesTable, controllerDeleteById);

export default routerApiMessages;