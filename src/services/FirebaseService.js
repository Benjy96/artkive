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

    /* ----- PROFILE ------ */

    static async getArtistName(artistID) {
        let docRef = await db.collection('artists').doc(artistID).get();
        return docRef.data().firstname;
    }

    //1. https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#createuserwithemailandpassword
    //2. https://firebase.google.com/docs/reference/js/firebase.auth.html#usercredential
    static async register(email, password, firstname, surname) {
        await firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
            db.collection('artists').doc(userCredential.user.uid).set({
                firstname: firstname,
                surname: surname
            });
        })
        .catch(e => {
            return Promise.reject(e);
        });
    }

    /* ----- ARTWORK ------ */

    static async getArtworks(uid) {
        let artworks = [];
        let querySnapshot = await db.collection('artists').doc(uid).collection('artworks')
            .orderBy("date", "asc").get();

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

    static async deleteArtwork(artworkID) {
        let uid = this.getUserId();

        db.collection(`artists/${uid}/artworks`).doc(artworkID).delete();
    }
}

export default FirebaseService;
