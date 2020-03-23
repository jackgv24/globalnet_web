import { auth,db } from '../data'
import { uploadPictureFromBlob as uploadToBucket } from '../data/bucket'
import { DBCOLABORADORES as dbKey } from '../constant/database';
import { default as firebase } from 'firebase'

class Colaborador {
    static async getAll() {
        const colaboradorRef = await db.collection(dbKey).get();
        if (colaboradorRef.empty) return [];
        return colaboradorRef.docs.map(x => (x.exists ? x.data() : null)).filter(x => !!x);
    }
    static async getById(id) {
        const colaboradorRef = await db
            .collection(dbKey)
            .doc(id)
            .get();
        return colaboradorRef.exists ? colaboradorRef.data() : null;
    }
    static async getByName(name) {
        const colaboradorRef = await db.collection(dbKey).where('name', '==', name).limit(1).get();
        if(colaboradorRef.empty) return null;
        return colaboradorRef.docs[0].exists?colaboradorRef.docs[0].data():null;
    }
    static getRefById(id) {
        return db.collection(dbKey).doc(id);
    }
    static async create(data,img=null){
        let user = null;
        try {
            user = await auth.createUserWithEmailAndPassword(data.email, data.pwd)
            const ref = db.collection(dbKey).doc(user.user.uid);

            if(!user) return { success: false, message: 'Ah ocurrido un error' };
            
            data.id = user.user.uid;
            delete data.pwd;

            if (img) {
                const { url = null, message, status } = await uploadToBucket(data.id,img);
                if (!status) {
                    console.error(message);
                } else if (url) {
                    data.pictureUrl = url;
                }
            }

            data.createdAt = new firebase.firestore.Timestamp.fromDate(new Date());
            data.updatedAt = new firebase.firestore.Timestamp.fromDate(new Date());
            data.active = true;

            await ref.set(data);
            return { success: true, message: 'Se ha ingresado correctamente el registro' };
        } catch (error) {
            console.error(error);
            if (user) {
                await user.user.delete();
            }
            return { success: false, message: 'Ah ocurrido un error' };
        }
    }
    static async update(id,data){
        try {
            const colaboradorRef = db.collection(dbKey).doc(id);
            await colaboradorRef.set(data);
            return { success: true, message: 'Se ha modificado correctamente el registro' };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Ah ocurrido un error' };
        }
    }
}

export default Colaborador;