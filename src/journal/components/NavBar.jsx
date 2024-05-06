import {LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { startFirebaseLogout } from "../../store/auth/thunks";


export const NavBar = ({contentWith = 240}) => {


  const dispatch = useDispatch(); 

  const onLogout = () => {

    dispatch( startFirebaseLogout() );

  }

  return (
    <AppBar sx={{width: {sm: `calc(100% - ${contentWith}px)`},ml: {sm:`${contentWith}px`} }} position="fixed">
        <Toolbar>
            <IconButton sx={{mr: 2,display: {sm:'none'} }} edge="start" color="inherit">
                <MenuOutlined>

                </MenuOutlined>
            </IconButton>
            <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography>Journal App</Typography>
                <IconButton onClick={ onLogout } color="error">
                    <LogoutOutlined></LogoutOutlined>
                </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}