import React, { useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import logo from './logo.jpeg';
import axios from 'axios';
import { useState } from 'react';
import moment from 'moment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Homebar from "./Homebar";
import Footer from './Footer';

const imgstyle = {
    margin: '10px 60px'
}
const useStyles = makeStyles((theme) => ({
    root: {
        minwidth: 200,

    },
    grid:{
      // backgroundColor:"#F5B041",
      height:"auto"
    },


    media: {
        height: 140,


    }
}));



export default function ButtonAppBar() {

    const dataInfo = JSON.parse(localStorage.getItem("myInfo"))
    const id = dataInfo.id


    const [event, setEvent] = useState([]);


    useEffect(() => {
        {
            axios.get(`http://localhost:8081/account/events/getEventParticipated/${id}`)
                .then((response) => {

                    setEvent(response.data.events)

                })
        };
    }, [])
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
    <Box  >
    <Box m={1}>

        <Grid container  spacing={2} className={classes.grid}>


               { event.map((option) => (

                    <Grid item xs={12} sm={6} md={6}>
                      <Card style={{width:300 ,height:"auto",backgroundColor:"#F5B041",borderRadius:"10px"}}>
                      <CardContent>
                      <center><b>{option.name}</b><br/></center>
                      <p align="left">
                      <b>Venue :</b>{option.venue}<br></br>
                     <b> Date :</b>{moment(option.start_time).format('MMMM Do YYYY')}<br></br>
                     <b> Time :</b>{moment(option.start_time).format('h:mm a')}<br></br>
                     </p>
                      </CardContent></Card></Grid>

                ))};


                     { /*<Grid item xs={12} sm={6} md={6}>
                      <Card style={{width:300 ,height:"auto",backgroundColor:"#F5B041",borderRadius:"10px"}}>
                      <CardContent >
                      <center><b>Animal Shelter</b><br/></center>
                      <p align="left">
                      <b>Venue :Mumbai</b><br></br>
                     <b> Date :21st August 2021</b><br></br>
                     <b> Time :6:30pm</b><br></br>
                     </p>
              </CardContent></Card></Grid>*/}


        </Grid>

  </Box>
  </Box>




      
    

  )
}