import { ArrowBackOutlined, DeleteOutlined, SaveOutlined, UploadFileRounded } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components/ImagenGallery";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef } from "react";
import { exitActiveNote, resetSaveMessage, setActiveNote } from "../../store/journal/journalSlice";
import { startDeleteNote, startUpdateNote, startUploadFiles } from "../../store/journal/thunks";


export const NoteView = () => {

  const {activeNote,isSaving,saveMessage} = useSelector( (state) => state.journal );
  const dispatch = useDispatch();

  const {title,body,date,onInputChange,formState} = useForm(activeNote);  

  const dateNote = useMemo(() =>{
    const newDate = dayjs(date);
    return newDate;
  },[activeNote.date])

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState])

  useEffect(() => {
    if (saveMessage.length > 0 ){

        Swal.fire({
            icon: "success",
            title: "Nota actualizada",
            text: saveMessage,
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(resetSaveMessage());
            }
          });

    }
  }, [saveMessage])
  
  const onUpdateNote = () => {
    dispatch(startUpdateNote());
  }

  const onChangeFile = ({target}) => {
    if (target.files.length> 0 ){
        dispatch(startUploadFiles(target.files));
    }
  }

  const onDeleteNote = () => {
    Swal.fire({
      title: "Eliminar nota",
      text: "¿Esta seguro de eliminar esta nota?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleteNote());
      }
    });
  }

  const onExitActiveNote = () => {
    if (activeNote.isSavedNote == false) {

      return Swal.fire({
        title: "Nota vacia",
        text: "¿Estas seguro de dejar la nota vacia?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, salir",
        cancelButtonText: "cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(exitActiveNote());
        }
      });

    }
    dispatch(exitActiveNote());
  }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid container>
          <Grid item>
            <Button disabled={isSaving} onClick={onExitActiveNote} color="primary" sx={{ padding: 2 }}>
              <ArrowBackOutlined sx={{ fontSize: 30 }} />
            </Button>
          </Grid>
          <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{dateNote.format('DD-MMMM,YYYY')}</Typography>
          </Grid>
        </Grid>
        <Grid item>
            <Button disabled={isSaving} onClick={() => fileInputRef.current.click()  } color="primary" sx={{ padding: 2 }}>
                <UploadFileRounded sx={{ fontSize: 30, mr: 1 }} />
                Subir imagenes
            </Button>
            <Button disabled={isSaving} onClick={onUpdateNote} color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                onChange={onInputChange}
                value={title}
                name="title"
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
            />

            <TextField 
                onChange={onInputChange}
                value={body}
                name="body"
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
            />
            <input style={{display:'none'}} ref={fileInputRef} onChange={onChangeFile} multiple type="file" name="imageNote" />
        </Grid>
        <Grid container>
          <Button disabled={isSaving} onClick={onDeleteNote} color="error" sx={{ padding: 2 }}>
            <DeleteOutlined sx={{ fontSize: 30, mr: 1 }} />
            Eliminar
          </Button>
        </Grid>

        {/* Image gallery */}
        <ImageGallery images={activeNote.imageURL} title={title} />

    </Grid>
  )
}