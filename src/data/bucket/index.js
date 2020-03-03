import { COLABORADOR_STORE } from '../../../constant/bucket';
import { storage } from 'firebase'

class Upload {
    storageRef;
    constructor(){
        this.storageRef = storage().ref();
    }
    
    async uploadPictureProfile() {

    }
}

export default Upload