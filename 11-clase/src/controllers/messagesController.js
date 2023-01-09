import { MessagesContainer } from '../containers/messagesContainer.js';
import { randomUUID } from 'crypto';
import { createTable } from '../tables/messagesTables.js';
const tableName = 'messages';

async function createMessagesTable(req, res, next) {
    try {
        await createTable(tableName);
        next();
    } catch (error) {
        throw error;
    }
}

async function get(req, res) {
    try {
        res.json(await MessagesContainer.getAll());
    } catch (error) {

        throw new Error(`Error: ${error}`);
    }
}

async function post({ body }, res) {
    try {
        const object = body;
        object.id = randomUUID();
        await MessagesContainer.save(object);
        res.status(201);
        res.json(object);
    } catch (error) {

        throw new Error(`Error: ${error}`);
    }
}

async function getById({ params }, res) {
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

        throw new Error(`Error: ${error}`);
    }
}

async function deleteAll(req, res) {
    try {
        await MessagesContainer.deleteAll();
        res.status(201);
        res.json(await MessagesContainer.getAll());
    } catch (error) {

        throw new Error(`Error: ${error}`);
    }
}

async function updateById({ body, params }, res) {
    try {
        await MessagesContainer.updateById(params.id_msg, body);
        res.status(201)
        res.json(body);
    } catch (error) {

        throw new Error(`Error: ${error}`);
    }
}


async function deleteById({ params }, res) {
    try {
        await MessagesContainer.deleteById(params.id_msg);
        res.status(201)
        res.json(await MessagesContainer.getAll());
    } catch (error) {

        throw new Error(`Error: ${error}`);
    }

}
export { get, post, getById, deleteAll, createMessagesTable, updateById, deleteById };