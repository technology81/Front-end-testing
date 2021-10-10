import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';



export default function Admincomp() {
    return(
          <ListItem alignItems='center'>
            <ListItemIcon ><SupervisorAccountIcon/></ListItemIcon>
           <ListItemText>
            Admin
          </ListItemText>
          </ListItem>
    )

    }