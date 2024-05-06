import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/auth/thunks'
import { Link } from 'react-router-dom'
import { Alert, Button, CircularProgress, Fade, Grid, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useFormValidate } from '../../hooks/useFormValidate'

const formData = {
  email: '',
  password: '',
  fullName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [ (value) => value.length >= 6, 'La contraseña debe de tener más de 6 letras.'],
  fullName: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

  const {status,errorMessage} = useSelector((state) => state.auth); 
  const dispatch = useDispatch(); 
  
  const {fullName,email,password,onInputChange,formState} = useForm(formData);
  const {fullNameMessage,passwordMessage,emailMessage,onFormValidate} = useFormValidate(formState,formValidations);

  const isAthenticated = useMemo( () => status === 'checking',[status]);

  const onFormSubtmit = (event) => {
    event.preventDefault();
    onFormValidate();

    dispatch(registerUser(formState));
  }

  return (
    <AuthLayout title="Registro">
     <Fade in={ true }
            unmountOnExit>
        <form onSubmit={onFormSubtmit}>
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField error={!!fullNameMessage} helperText={fullNameMessage} onChange={onInputChange} value={fullName} label="Nombre completo" type="text" name="fullName" placeholder="Jose Luis" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField error={!!emailMessage} helperText={emailMessage} onChange={onInputChange} value={email} label="Correo" type="email" name="email" placeholder="Correo@gmail.com" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField error={!!passwordMessage} helperText={passwordMessage} onChange={onInputChange} value={password} label="Contraseña" type="password" name="password" placeholder="Contraseña" fullWidth></TextField>
            </Grid>
            <Grid container spacing={2} sx={{mt:2}}>
              <Grid item xs={12} sm={12}>
                <Button disabled={ isAthenticated } type="submit" variant="contained" fullWidth>Crear cuenta</Button>
              </Grid>
            </Grid>
            <Fade
              in={ isAthenticated } style={{
                transitionDelay: isAthenticated ? '800ms' : '0ms',
              }}
              unmountOnExit
            >
              <Grid xs={12} item display={ (!!errorMessage) ? '' : 'none' }>
                <Alert sx={{mt: 2}} severity="error">{errorMessage}</Alert>
              </Grid>
            </Fade>
          </Grid>
          <Grid sx={{mt:2}} container direction={"row"} justifyContent={"end"}>
            <Typography sx={{paddingRight:1}}>¿Ya tienes una cuenta?</Typography>
            <Link to={"/login"}>Ingresar</Link>
          </Grid>
          <Grid container justifyContent={"center"} sx={{mt: 2}}>
            <Fade in={ isAthenticated } style={{
                transitionDelay: isAthenticated ? '800ms' : '0ms',
              }}
              unmountOnExit>
                <CircularProgress />
            </Fade>
          </Grid>
        </form> 
       </Fade> 
    </AuthLayout>  
  )
}