import { COLABORADOR_STORE } from '../../constant/bucket';
import { bucket } from '../base'


export const uploadPictureProfile = async (file) => {
    try {
        const bucketRef = bucket.ref(`${COLABORADOR_STORE}/${name}`);
        const task = await bucketRef.put(file);
        return {status:true,message:'Se ha subido correctamente',url:task.downloadURL}
    } catch (error) {
        return {status:false,message:error.message}
    }
}
