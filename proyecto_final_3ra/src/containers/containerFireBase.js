import { firestoreDatabase } from './firebaseClient.js';

function asObject(doc) {
    return { id: doc.id, ...doc.data() };
}

export class FirestoreContainer {
    #collection;
    constructor(collectionName) {
        this.#collection = firestoreDatabase.collection(collectionName);
    }


    async save(object) {
        try {
            delete object.id;
            const ref = await this.#collection.add(object);
            return { ...object, id: ref.id };
        } catch (err) {
            throw new Error("ErrorMessage: 'Error trying to save elements");
        }
    }

    async getAll() {
        const result = [];
        try {
            const snapshot = await this.#collection.get();
            snapshot.forEach(doc => {
                result.push(asObject(doc));
            });
        } catch (err) {
            throw new Error("ErrorMessage: 'Error trying to find elements");
        }
        return result;
    }


    async getById(id) {
        let searchObject;
        try {
            let snapshot = await this.#collection.doc(id).get();
            if (!snapshot.exists) { return null }
            searchObject = asObject(snapshot);
        } catch (err) {
            throw new Error("ErrorMessage: 'Error trying to find elements");
        }
        return searchObject;
    }


    async updateById(oldObject, obj) {
        let ref = {};
        try {
            ref = await this.#collection.doc(oldObject).update(obj);
            return ref
        } catch (err) {
            return -1
        }
    }

    async deleteById(id) {
        try {
            const productExist = await this.getById(id);
            if (productExist === null) {
                return -1
            } else {
                const deleted = await this.#collection.doc(id).delete();
                // VER CON QUE COMPARARLO PARA EL IF
                return deleted
            }
        } catch (err) {
            throw new Error("ErrorMessage: Error trying to remove element");
        }
    }


}