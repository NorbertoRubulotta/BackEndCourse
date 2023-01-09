import { normalize, schema } from 'normalizr';

export function normalizeMessages(data) {
    const authorEntity = new schema.Entity('author', { idAtribute: "email" })
    const textEntity = new schema.Entity('text')

    const mensajesEntity = new schema.Entity('message', {
        author: authorEntity,
        text: textEntity
    })

    const mensajesNormalized = normalize(data, mensajesEntity);

    return mensajesNormalized;
}
