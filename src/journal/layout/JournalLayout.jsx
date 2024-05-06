import { Box, Toolbar } from '@mui/material'
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';


const contentWith = 240;

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display:"flex"}}>
        <NavBar contentWith={contentWith}/>
        <SideBar contentWith={contentWith}/>
        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />

            { children }
            
        </Box>
    </Box>
  )
}