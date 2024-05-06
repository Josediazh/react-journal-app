import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNote, setActiveNote, setImagesActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {

    return async(dispatch,getState) => {

        dispatch(setSaving());

        const {uid} = getState().auth;
        const date = new Date().getTime();
        const newNote = {
            title: '',
            body: '',
            date: date,
            imageURL: []
        }
        const newDoc = doc( collection( firebaseDB, `${uid}/journal/notes` ) );
        await setDoc(newDoc,newNote);
        
        newNote.id = newDoc.id
        dispatch(addNewEmptyNote(newNote));

        const emptyNote = {
            id: newDoc.id,
            title: '',
            body: '',
            date: date,
            imageURL: [],
            isSavedNote: false
        }
        
        dispatch(setActiveNote(emptyNote));

    }
} 

export const startLoadingNotes = () => {

   return async(dispatch,getState) => {

        const {uid} = getState().auth;

        if (!uid) throw new Error('El usuario no esta autenticado');

        const collectionRef = collection(firebaseDB,`${uid}/journal/notes` );
        const docs = await getDocs(collectionRef);

        const arrayDocs = [];

        docs._docs.forEach(doc => {
            arrayDocs.push({id: doc.id,...doc.data()});
        });

        dispatch(setNotes(arrayDocs));

   }

}

export const startUpdateNote = () => {

   return async(dispatch,getState) => {

        dispatch(setSaving());

        const {uid} = getState().auth;
        const {activeNote} = getState().journal;
        const collectionRef = doc(firebaseDB,`${uid}/journal/notes/${activeNote.id}` );

        await updateDoc(collectionRef, {
            title: activeNote.title,
            body: activeNote.body,
            imageURL: activeNote.imageURL
        });

        dispatch (updateNote(activeNote));

   }

}

export const startUploadFiles = ( files = []) => {

   return async(dispatch,getState) => {

        dispatch(setSaving()); 

        const fileUploadPromise = [];
        for( const file of files ){
            fileUploadPromise.push(fileUpload(file));
        }

        const imageURL = await Promise.all(fileUploadPromise);

        dispatch(setImagesActiveNote(imageURL));

   }

}

export const startDeleteNote = () => {

   return async(dispatch,getState) => {

        const {uid} = getState().auth;
        const {activeNote} = getState().journal;
        const collectionRef = doc(firebaseDB,`${uid}/journal/notes/${activeNote.id}` );

        await deleteDoc(collectionRef);

        dispatch(deleteNote(activeNote));

   }

}