import { db } from './base';
import { DBCARGO as dbKey } from '../constant/database';

class Cargo {
    static async getById(id){
        const permisoRef = db.collection(dbKey).doc(id);
        return await permisoRef.get();
    }
    static async getByName(match) {
        const permisoRef = db.collection(dbKey).where("title","==",match).where("active","==",true);
        const data = await permisoRef.get();
        return data.empty?null:data.docs[0].data();
    }
    static async getAll(){
        const permisoRef = db.collection(dbKey).where("active","==",true);
        const data = await permisoRef.get();
        return data.empty?[]:data.docs.map(x=>x.exists?x.data():null).filter(x=>!!x);
    }
}

export default Cargo;