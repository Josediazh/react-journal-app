import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { firebaseAuth } from './config' 

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try{
        const result = await signInWithPopup(firebaseAuth,googleProvider);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid,
        }
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const registerUserWithCredentials = async ({email,password,fullName}) => {

    try{

        const resp = await createUserWithEmailAndPassword(firebaseAuth,email,password);
        const {uid,photoURL} = resp.user;
        await updateProfile(firebaseAuth.currentUser,{displayName: fullName});

        return {
            ok: true,
            displayName: fullName, 
            email, 
            photoURL, 
            uid,
        }

    }
    catch(error){
        
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }

    }
}

export const signUserWithCredentials = async ({correo,password}) => {

    try{

        const resp = await signInWithEmailAndPassword(firebaseAuth,correo,password);
        const {uid,email,displayName,photoURL} = resp.user;

        return {
            ok: true,
            displayName: displayName, 
            email, 
            photoURL, 
            uid,
        }


    }catch(error){

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }

    }
}

export const firebaseLogout = async () => {
    
    firebaseAuth.signOut();

}