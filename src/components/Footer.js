import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import fb from './logo-FB.ico';
import insta from './logo-IG.ico';
import yt from './logo-YT.ico';
import {Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      minwidth:200,
      backgroundColor:"white",
    },
    bnav:{
      height:'45px',
      backgroundColor:"#E6E6E6",
    },
    bot:{

      position:"fixed",
      left:0,
      bottom:0,
      right:0,

      // marginBottom:"1px"

    }
}));

export default function Footer() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return(
        <Box mt={10} >
        <div className={classes.bot}>
          <BottomNavigation className={classes.bnav}>
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      
      <BottomNavigationAction label="Facebook" icon={<img src={fb} style={{ height: 25, width: 25 }}/> } />
      <BottomNavigationAction label="Instagram" icon={<img src={insta} style={{ height: 25, width: 25 }}/>} />
      <BottomNavigationAction label="Youtube" icon={<img src={yt} style={{ height: 25, width: 25 }}/>} />
      
        
      </BottomNavigation>
      </div>
      </Box>
  
    )

    }