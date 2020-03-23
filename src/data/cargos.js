import { db } from './base';
import { DBCARGO as dbKey } from '../constant/database';
import { default as firebase } from 'firebase'

class dbPermiso {
    static async getById(id) {
        const cargoRef = db.collection(dbKey).doc(id);
        return await cargoRef.get();
    }
    static async getByName(match) {
        const cargoRef = db
            .collection(dbKey)
            .where('name', '==', match)
        const data = await cargoRef.get();
        return data.empty ? null : data.docs[0].data();
    }
    static async getAll() {
        const cargoRef = db.collection(dbKey);
        const data = await cargoRef.get();
        return data.empty ? [] : data.docs.map(x => (x.exists ? x.data() : null)).filter(x => !!x);
    }
    static async getAllActive() {
        const cargoRef = db.collection(dbKey).where("active","==",true);
        const data = await cargoRef.get();
        return data.empty ? [] : data.docs.map(x => (x.exists ? x.data() : null)).filter(x => !!x);
    }
    static async create(data) {
        try {
            const cargoRef = db.collection(dbKey).doc();
            data.id = cargoRef.id;
            data.createdAt = new firebase.firestore.Timestamp.fromDate(new Date());
            data.updatedAt = new firebase.firestore.Timestamp.fromDate(new Date());
            data.active = true;
            await cargoRef.set(data);
            return { success: true, message: 'Se ha ingresado correctamente' };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
    static async updateById(id, data) {
        try {
            const cargoRef = db.collection(dbKey).doc(id);
            data.updatedAt = new firebase.firestore.Timestamp.fromDate(new Date());
            await cargoRef.set(data);
            return { success: true, message: 'Se ha ingresado correctamente' };
        } catch (e) {
            return { success: false, message: 'Ha ocurrido un error' };
        }
    }

    static getReference() {
        const cargoRef = db.collection(dbKey).where('active', '==', true);
        return cargoRef;
    }
}

export default dbPermiso;
