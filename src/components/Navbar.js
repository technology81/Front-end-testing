import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HHicon from './HH-icon.ico';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Navbar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ height: 60, backgroundColor: '#199bf1' }}>
                <Toolbar>
                    {/* <img src="./HH-icon.ico" /> */}
                    <img src={HHicon} alt="logo" height="50" width="50" align="center" />
                    &nbsp;&nbsp;
                    <Typography variant="h6" className={classes.title} align="left">
                        Helping Hands
                    </Typography>

                    {/* <Typography variant="h6" className={classes.title} align="left">

                    </Typography> */}


                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar