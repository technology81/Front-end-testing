import React, { useEffect } from 'react';
import { Grid, Typography,Button,Paper,Tooltip,Avatar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { deepPurple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import logo from './logo.jpg';
import explore from './explore.jpeg';
//import opp from './volunteer1.gif';
import axios from 'axios';
import {useState} from 'react';
import {Route, useHistory } from 'react-router-dom';
// import DashboardIcon from '@material-ui/icons/Dashboard';
import Homebar from "./Homebar";
import Footer from "./Footer";
import Table1 from"./Table1";
import Table2 from"./Table2";
import Table3 from"./Table3";
import EventsReg from "./EventsReg";
import {

    XAxis,
    YAxis,
    CartesianGrid,

    Legend,
    Label,
    LineChart,Line
  } from "recharts";


const imgstyle = {
    margin: '10px 60px'
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      width:"100%",
    //   backgroundColor:"#48C9B0",
    //   backgroundColor:"#F5B041",
    //   backgroundColor:"#CC99CC",
    //   backgroundColor:"#FF6699",
      height:"auto",
      paddingTop:"5px"

    },

    purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    margin: theme.spacing(2),
  },
    media: {
      height: 140,
      /*minwidth:200,
      alignItems:'center'*/

    },
    root1:{
        backgroundColor:"#AED581",
    },
    grid1:{

        marginLeft:"0px",


        border:"outlined",
        // height:"auto",

    },
    grid:{
        marginLeft:"0px",
        // backgroundColor:"#AED581"
        padding:"10px"

    }
  }));



      export default function ButtonAppBar() {

      
       useEffect(()=>{

        {

        axios.get(`http://localhost:8081/account/events/getEventParticipated/4`)
       .then((response) => {
         console.log(response.data.events);
          var ct = response.data.eventsCount;
          setCount(ct);
        })
      };
    })


    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
      setAnchorEl(null);};


      let history = useHistory();



    return (
        <Box>
            <Box>
            
            <center>

             <Typography variant='h4' color="textSecondary"  align="center">Dashboard</Typography>

              <p style={{ height: "30px", width: "1200px", padding: "5px", borderRadius: "5px", color:"#2874a6" }}>
              By Bobby Unser  -  <strong><i> Success is where preparation and opportunity meet </i></strong>
            </p>
            </center>
            </Box>
            <Box mr={3} ml={3} p={2}>

            <center>
            <Paper variant="outlined" style={{borderRadius:"30px",padding:"10px"}}>
                <Grid container spacing={0} direction="row" margin="0px" padding="0px">

                    <Grid item xs={6} className={classes.grid1} >

                            <Typography gutterBottom variant="h6" color="secondary" align="center">
                                Opportunities Registered
                            </Typography>
                            {/*<Tooltip title="Count of Opportunities">
    <Avatar className={classes.purple}>{count}</Avatar></Tooltip>*/}
    <br></br>
                            <Table2/>


                    </Grid>
                    <Grid item xs={6}>
                            <Grid container spacing={1} direction="row">
                                <Grid item xs={6}>

                                <Typography gutterBottom variant="h6" color="secondary" align="center" >
                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Opportunities Participated
                            </Typography>

                            <br></br>
                            <Table1/>


                                </Grid>
                            </Grid>

                    </Grid>
                    <br></br><br></br>
                    <Grid item xs={12}>
                            <Grid container spacing={1} >
                                <Grid item xs={12}>
                                <br></br>
                                <center>
                                <Typography gutterBottom variant="h6" color="secondary" align="center">
                                Upcoming events

                            </Typography>
                            </center>
                            <br></br>
                            <Table3/>



                                </Grid>
                            </Grid>

                    </Grid>

                </Grid>
                </Paper>
              </center>

            </Box>
         </Box>

    )
  }