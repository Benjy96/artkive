import firebase from 'firebase';
import { db } from '../firebaseInit';

class FirebaseService {

    static getUserId() {
        if(firebase.auth().currentUser) {
            return firebase.auth().currentUser.uid;
        } else {
            return null;
        }
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
        let artworks = [];
        let querySnapshot = await db.collection('artists').doc(uid).collection('artworks').get();
        querySnapshot.forEach(doc => {
            artworks.push({
                ...doc.data(),
                id: doc.id
            });
        });

        return artworks;
    }

    static async saveArtwork(title, description, date, image) {
        let uid = this.getUserId();

        if(image != null) {
            let d = new Date();
            // Create a reference
            let storageRef = firebase.storage().ref();
            let ref = storageRef.child(`${uid}/${d.toISOString()}-${image.name}`);

            // Upload the file
            await ref.put(image).then(async () => {
                let imagePath = ref.root + ref.fullPath;

                let downloadURL = await this.getImageDownloadURL(imagePath);

                db.collection(`/artists/${uid}/artworks`).doc()
                .set(
                    {
                        title: title,
                        description: description, 
                        date: date,
                        image: downloadURL
                    },
                    { merge: true }
                );
            });
        }
    }

    static async updateArtwork(artworkID, title, description) {
        let uid = this.getUserId();

        db.collection(`artists/${uid}/artworks`).doc(artworkID).update({
            title: title,
            description: description
        });
    }
}

export default FirebaseService;
