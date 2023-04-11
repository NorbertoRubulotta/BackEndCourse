import { MessagesContainer } from '../containers/messagesContainer.js';
import { randomUUID } from 'crypto';
import { createTable } from '../tables/messagesTables.js';
import { logger } from '../loggers/logger.js';
const tableName = 'messages';

async function createMessagesTable(req, res, next) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        await createTable(tableName);
        next();
    } catch (error) {
        throw loggerFileError.error({ Error: 'Error creating table' });
    }
}

async function get(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        res.json(await MessagesContainer.getAll());
    } catch (error) {

        throw loggerFileError.error({ Error: 'Error getting message' });
    }
}

async function post({ body }, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        const object = body;
        object.id = randomUUID();
        await MessagesContainer.save(object);
        res.status(201);
        res.json(object);
    } catch (error) {

        throw loggerFileError.error({ Error: 'Error saving message' });
    }
}

async function getById({ params }, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        const message = await MessagesContainer.getById(params.id_msg);
        if (!message) {
            res.status(404);
            res.json({ message: 'Message not found' });
        } else {
            res.status(201);
            res.json(message);
        }
    } catch (error) {

        throw loggerFileError.error({ Error: 'Error finding message' });
    }
}

async function deleteAll(req, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        await MessagesContainer.deleteAll();
        res.status(201);
        res.json(await MessagesContainer.getAll());
    } catch (error) {

        throw loggerFileError.error({ Error: 'Error deleting message' });
    }
}

async function updateById({ body, params }, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        await MessagesContainer.updateById(params.id_msg, body);
        res.status(201)
        res.json(body);
    } catch (error) {

        throw loggerFileError.error({ Error: 'Error updating message' });
    }
}


async function deleteById({ params }, res) {
    logger.info({ Route: req.originalUrl, Method: req.method, Message: 'New request' })
    try {
        await MessagesContainer.deleteById(params.id_msg);
        res.status(201)
        res.json(await MessagesContainer.getAll());
    } catch (error) {

        throw loggerFileError.error({ Error: 'Error deleting message' });
    }

}
export { get, post, getById, deleteAll, createMessagesTable, updateById, deleteById };