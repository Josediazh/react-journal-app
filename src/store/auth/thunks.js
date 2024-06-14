import { firebaseLogout, registerUserWithCredentials, signInWithGoogle, signUserWithCredentials } from "../../firebase/providers";
import { clearNoteLogout } from "../journal/journalSlice";
import { checkingCredential, login, logout } from "./authSlice";


export const checkingAutentication = () => {
    return async( dispatch ) => {
        dispatch(checkingCredential());
        const payload = {
            status: 'authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: ''
        }
        dispatch(login(payload));
    }
}


export const startGoogleSighIn = () => {
    return async( dispatch ) => {
        dispatch(checkingCredential());
        const {ok,uid,email,displayName,photoURL,errorMessage} = await signInWithGoogle();

        if (!ok){ 

            const payload = {
                errorMessage: errorMessage
            }

            return dispatch(logout(payload)); 
        }

        const payload = {
            status: 'authenticated',
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
            errorMessage: ''
        }
        dispatch(login(payload));
    }
}

export const registerUser = ({email,password,fullName}) => {
    return async ( dispatch ) => {
        dispatch(checkingCredential());

        const {ok,uid,photoURL,errorMessage} = await registerUserWithCredentials({email,password,fullName});

        if (!ok){ 

            const payload = {
                errorMessage: errorMessage
            }

            return dispatch(logout(payload)); 
        }

        const payload = {
            status: 'authenticated',
            uid: uid,
            email: email,
            displayName: fullName,
            photoURL: photoURL,
            errorMessage: ''
        }

        dispatch(login(payload));

    }
}

export const startCredentialSignIn = ({correo,password}) => {

    return async (dispatch) => {
        dispatch(checkingCredential());
        const {ok,uid,email,displayName,photoURL,errorMessage} = await signUserWithCredentials({correo,password});

        if (!ok){ 

            const payload = {
                errorMessage: errorMessage
            }

            return dispatch(logout(payload)); 
        }

        const payload = {
            status: 'authenticated',
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
            errorMessage: ''
        }

        dispatch(login(payload));

    }

}

export const startFirebaseLogout = () => {
    return async (dispatch) => {
        await firebaseLogout();
        dispatch(logout());
        dispatch(clearNoteLogout());
    }
}