import { Flag } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSaving: false,
    saveMessage: '',
    notes: [],
    activeNote: null
}

export const jounalSlice = createSlice({
    name: 'jounal',
    initialState,
    reducers: 
        {
        addNewEmptyNote: (state,  action ) => {
            
            state.notes.push(action.payload);
            state.isSaving = false;
            state.saveMessage = '';

        },
        setActiveNote: (state,  action ) => {

            state.activeNote = action.payload;

        },
        setNotes: (state,  action ) => {

            state.notes = action.payload;
            
        },
        setSaving: (state ) => {
            state.isSaving = true;
            state.saveMessage = '';
        },
        updateNote: (state,  action ) => {

            state.isSaving = false; 
            const indexNote = state.notes.findIndex( (note) => note.id == action.payload.id );
            state.notes[indexNote] = action.payload;
            state.saveMessage = `La nota ${action.payload.title} se actualizo correctamente`
            state.activeNote.isSavingNote = true;
                   
        },
        deleteNote: (state,  action ) => {

            state.isSaving = false; 
            const indexNote = state.notes.findIndex( (note) => note.id == action.payload.id );
            state.notes.splice(indexNote,1);
            state.activeNote = (indexNote == 0) ? null : state.notes[indexNote-1];
            
        },
        setImagesActiveNote: (state,  action ) => {

             state.activeNote.imageURL = [...state.activeNote.imageURL,...action.payload]
             state.isSaving = false; 

        },
        clearNoteLogout: (state) => {

            state.isSaving = false;
            state.saveMessage = '';
            state.notes = [];
            state.activeNote = null;

        },
        resetSaveMessage: (state ) => {
            state.saveMessage = '';
        },
        exitActiveNote: (state ) => {

            state.isSaving = false;
            state.activeNote =  null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { addNewEmptyNote,setActiveNote,setNotes,setSaving,updateNote,deleteNote,resetSaveMessage,setImagesActiveNote,clearNoteLogout,exitActiveNote } = jounalSlice.actions;