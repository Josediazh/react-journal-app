import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { setActiveNote } from "../../store/journal/journalSlice";
import { useDispatch } from "react-redux";


export const SidebarItem = ({id,title,body,date,imageURL = []}) => {

   
  const dispatch = useDispatch(); 
  const isSavingNote = true;

  const onActiveNote = () => {
    dispatch(setActiveNote({id,title,body,date,imageURL,isSavingNote}));
  }


  return (
    <ListItem onClick={onActiveNote} key={ id } disablePadding>
        <ListItemButton>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText className="limit_text" primary={ title } />
                <ListItemText className="limit_text" secondary={ body } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
