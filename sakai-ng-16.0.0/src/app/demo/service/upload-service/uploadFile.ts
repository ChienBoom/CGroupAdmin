import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { v4 } from 'uuid';
import { environment } from 'src/environments/environment';

export async function UploadFirebase(file: any) {
    if (file) {
        const firebaseConfig = environment.firebaseConfig;
        const app = initializeApp(firebaseConfig)
        const imageDb = getStorage(app);
        // const imgRef = ref(imageDb, `files/${v4()}`)
        const imgRef = ref(imageDb, `ctest/${v4()}`);
        try {
            const snapshot = await uploadBytes(imgRef, file).then(
                (snapshot) => snapshot
            );
            const urlImage = await getDownloadURL(
                ref(imageDb, snapshot.metadata.fullPath)
            );
            return urlImage;
        } catch (e) {
            console.log('error: ', e);
            return null;
        }
    } else {
        console.error('No file selected.');
        return null;
    }
}

export default UploadFirebase;
