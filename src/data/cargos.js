import { db } from './base';
import { DBCARGO as dbKey } from '../constant/database';

class dbPermiso {
    static async create(data){
        try {
            const cargoRef = db.collection(dbKey).doc();
            data.id = cargoRef.id;
            await cargoRef.set(data);
            return {success:true,message:'Se ha ingresado correctamente'}
        } catch (error) {
            console.error(error);
            return {success:false,message:error.message};
        }
    }
    static async getById(id){
        const permisoRef = db.collection(dbKey).doc(id);
        return await permisoRef.get();
    }
    static async getByName(match) {
        const permisoRef = db.collection(dbKey).where("name","==",match).where("active","==",true);
        const data = await permisoRef.get();
        return data.empty?null:data.docs[0].data();
    }
    static async getAll(){
        const permisoRef = db.collection(dbKey).where("active","==",true);
        const data = await permisoRef.get();
        return data.empty?[]:data.docs.map(x=>x.exists?x.data():null).filter(x=>!!x);
    }
}

export default dbPermiso;