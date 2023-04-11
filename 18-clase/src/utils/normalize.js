import { normalize, schema } from 'normalizr';

export function normalizeMessages(data) {
    const authorEntity = new schema.Entity('author', {}, { idAttribute: 'email' })


    const messageEntity = new schema.Entity('message', { author: authorEntity }, { idAttribute: "_id" })
    const mensajesEntity = new schema.Array(messageEntity)
    const mensajesNormalized = normalize(data, mensajesEntity);

    return mensajesNormalized;
}


