import { db } from './base';
import { DBCOLABORADORES as dbKey } from '../constant/database';

class dbColaborador {
    static async getAll() {
        const colaboradorRef = db.collection(dbKey);
        const data = await colaboradorRef.get();
        return data.docs.map(x=>x.exists?x.data():null).filter(x=>!!x);
    }
}

export default dbColaborador;