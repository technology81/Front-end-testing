import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssessmentIcon from '@material-ui/icons/Assessment';

import { NavLink } from 'react-router-dom';

export default function Admincomp() {
    return(
          <ListItem alignItems='center'>
            <ListItemIcon ><AssessmentIcon/></ListItemIcon>
           <ListItemText>
           LeaderBoard
          </ListItemText>
          </ListItem>
    )

    }