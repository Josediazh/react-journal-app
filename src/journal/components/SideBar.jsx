import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { SidebarItem } from "./SidebarItem";

export const SideBar = ({contentDrawer = 240}) => {

  const {displayName} = useSelector((state) => state.auth); 
  const {notes} = useSelector((state) => state.journal); 
  

  return (
    <Box component={'nav'} sx={{
      width:{ sm: contentDrawer },
      flexShrink: {sm: 0}
      }} className="ov-h">
      <Drawer
            variant='permanent'
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: contentDrawer }
            }}
        >
        <Toolbar>
          <Typography variant="h6" noWrap component={'div'}>{displayName}</Typography>
        </Toolbar>
        <Divider />
          <List>
            {
              notes.map( ({ id,title,body,date,imageURL = [] }) => {
                return (
                  <SidebarItem key={id} id={id} title={title} body={body} date={date} imageURL={imageURL} />
                )
              })
            }
          </List>    
      </Drawer>
    </Box>
  )
}