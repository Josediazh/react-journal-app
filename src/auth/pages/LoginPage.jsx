import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { Google } from "@mui/icons-material"
import { Alert, Button, CircularProgress, Fade, Grid, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { checkingAutentication, startCredentialSignIn, startGoogleSighIn } from "../../store/auth/thunks"


const initialForm = {
  correo: '',
  password: ''
}


export const LoginPage = () => {

  const dispatch = useDispatch();  
  const {status,errorMessage} = useSelector((state) => state.auth); 
  const {correo,password,onInputChange,formState} = useForm(initialForm); 

  const isAthenticated = useMemo( () => status === 'checking',[status]);

  const onFormSubtmit = (event) => {
    event.preventDefault();
    dispatch( checkingAutentication(correo,password) );
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSighIn() );
  }

  const onSignInCredentials = () => {
    dispatch( startCredentialSignIn(formState) );
  }

  return (
    <AuthLayout title="Login">
      <Fade in={ true }
            unmountOnExit>
       <form onSubmit={onFormSubtmit}>
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField onChange={onInputChange} value={correo} label="Correo" type="email" name="correo" placeholder="correo@gmail.com" fullWidth></TextField>
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField onChange={onInputChange} value={password} label="Contraseña" type="password" name="password" placeholder="Contraseña" fullWidth></TextField>
          </Grid>
          <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12} sm={6}>
              <Button disabled={ isAthenticated } onClick={ onSignInCredentials } type="submit" variant="contained" fullWidth>Login</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={ isAthenticated } onClick={onGoogleSignIn} variant="contained" fullWidth><Google></Google></Button>
            </Grid>
          </Grid>
          <Grid xs={12} item display={ (!!errorMessage) ? '' : 'none' }>
              <Alert sx={{mt: 2}} severity="error">{errorMessage}</Alert>
          </Grid>  
          <Grid container justifyContent={"center"} sx={{mt: 2}}>
            <Fade in={ isAthenticated } style={{
              transitionDelay: isAthenticated ? '800ms' : '0ms',
            }}
            unmountOnExit>
              <CircularProgress />
            </Fade>
          </Grid>
        </Grid>
        <Grid sx={{mt:2}} container direction={"row"} justifyContent={"end"}>
          <Link to={"/register"}>Crear una cuenta</Link>
        </Grid>
       </form> 
      </Fade>
    </AuthLayout>
  )
}