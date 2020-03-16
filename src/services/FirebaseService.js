import firebase from 'firebase';
import { db } from '../firebaseInit';

class FirebaseService {

    static getUserId() {
        return firebase.auth().currentUser.uid;
    }
    
    static isCurrentUser(id) {
        if(firebase.auth().currentUser && firebase.auth().currentUser.uid == id){
            return true;
        } else return false;
    }

    static async getImageDownloadURL(imageRef) {
        var storage = firebase.storage();
        var gsRef = storage.refFromURL(imageRef);
        let downloadURL = await gsRef.getDownloadURL();

        return downloadURL;
    }

    static async getArtworks(uid) {
        let data = await (db.collection('artists').doc(uid).collection('artworks').get()).data();
        return data;
    }

    static async saveArtwork(title, description, date, image) {
        let uid = this.getUserId();

        if(image != null) {
            // Create a reference
            let storageRef = firebase.storage().ref();
            let ref = storageRef.child(`${uid}/${image.name}`);

            // Upload the file
            ref.put(image);

            let imagePath = ref.root + ref.fullPath;

            db.collection(`/artists/${uid}/artworks`).doc()
            .set(
                {
                    title: title,
                    description: description, 
                    date: date,
                    image: imagePath
                },
                { merge: true }
            );
        }
    }
}

export default FirebaseService;
