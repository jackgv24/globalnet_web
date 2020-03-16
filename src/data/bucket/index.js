import { COLABORADOR_STORE, IMAGES_STORE } from '../../constant/bucket';
import { bucket } from '../base';

export const valPictureProfile = async name => {
    return true;
};
export const uploadPictureFromBlob = async (name, blob) => {
    try {
        const bucketRef = bucket.ref(`${COLABORADOR_STORE}/${name}`);
        const upload = bucketRef.put(blob);
        upload.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case 'running':
                    console.log('Upload is ' + progress + '% done');
                    break;
            }
        });

        const task = await upload;
        const url = await task.ref.getDownloadURL()
        return { status: true, message: 'Se ha subido correctamente', url };
    } catch (error) {
        return { status: false, message: error.message, url: null };
    }
};
export const uploadPictureFromFile = async (name, file) => {
    try {
        const bucketRef = bucket.ref(`${COLABORADOR_STORE}/${name}`);
        var blob = new Blob([file], { type: 'image/jpeg' });
        const task = await bucketRef.put(blob);
        console.log(task);
        return {
            status: true,
            message: 'Se ha subido correctamente',
            url: task.ref.getDownloadURL,
        };
    } catch (error) {
        return { status: false, message: error.message };
    }
};
export const uploadImages = async file => {
    try {
        const bucketRef = bucket.ref();
        if (Array.isArray(file)) {
            const blobFiles = Array.from(file).map(x => {
                const _ref = bucketRef.child(`${IMAGES_STORE}/${x.name}`);
                return _ref.put(new Blob([x]));
            });
            const result = await Promise.all(blobFiles);
            return {
                status: true,
                message: 'Se ha subido correctamente',
                url: result.map(x => x.downloadURL),
            };
        } else {
            const _ref = bucketRef.child(`${IMAGES_STORE}/${file.name}`);
            const result = await _ref.put(new Blob([file]));
            return { status: true, message: 'Se ha subido correctamente', url: result.downloadURL };
        }
    } catch (error) {
        return { status: false, message: error.message };
    }
};
