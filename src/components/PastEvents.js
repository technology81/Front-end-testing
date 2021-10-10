import React, {useEffect, useState} from 'react';
import {Grid, Paper, Box, Card, CardContent, Button, Typography, makeStyles} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//import logo from './logo.jpeg';
//import wkndevnt1 from './HH-pic.jpg';

import moment from 'moment';
import axios from 'axios';
import {useHistory } from 'react-router-dom';
import Homebar from "./Homebar";
import Footer from './Footer';

import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1)
        },
    },
    grid:{
        display: 'flex',
        flexWrap: 'wrap',
    },
    card:{
        maxWidth: 175,
        display: 'flex',
        flexWrap: 'wrap',

    },
    button:{
        color:"primary",
        '&:hover':{
            backgroundColor:"#2471A3",
        },
        marginTop:"8px"
    },
    carouselCaption:{
        '&:hover':{
            backgroundColor:"#F5F5F5",
            backgroundOpacity:0.05,
        }
    }
}));



const PastEvents = (props) => {
    const gridStyle= {margin:'3px 3px', padding:'5px 5px'}
    const imgStyle = {height:'420px', width:'600px'}
    const headStyle = {margin:'0', fontFamily:'serif', color:'blue'}
    const btnStyle = {margin:'8px 0'}
    const logoStyle = {height:98, width:128}
    //const imgStyle = {height:'100px', width:'180px'}
    //const stepperStyle = {}
    let history = useHistory();


    /*const handleChange = () => {
        props.history.push('/home)')
    }*/

    const [pevent, setPevent] = useState([])
    const event = "Past event"
    const Home = () => {
        history.push('/apphome');
    };
    useEffect(() => {
        axios.get('http://localhost:8081/account/events/getEventsList/false/Weekend event')
        //('http://localhost:8081/account/events/getEvents/'.concat('/isFutureEvent').concat('past'))
        //(`http://localhost:8081/account/events/getEventsList/isFutureEvent${past}/eventTypes${event}`)
        .then(response => {
            console.log(response)
            console.log(response.data[0].event_id)
            setPevent(response.data)
        })
        .catch(err=>{
            console.log(err)

        })
    },[event])

    //Carousel

    const classes = useStyles();
    return(
        <Box>
        

        <Box align="center">
        <center>
            <Typography variant='h4' color="textSecondary" align="center">Past Events</Typography>
            <p style={{ height: "30px", width: "1200px", padding: "5px", borderRadius: "5px", color: "#2874a6" }}>
                By Elizabeth Andrew  -  <strong><i> Volunteers do not necessarily have the time; they have the heart. </i></strong>
            </p>
        </center>
        </Box>

      <Grid container className={classes.root} spacing={3}>
      <Grid item xs={6}>
            <Paper style={{height:'460px', borderRadius:'10px', width:"615px"}} variant="outlined" >
                <Carousel interval={10000} position="absolute" variant="dark" style={{marginLeft:'5px', marginRight:'5px'}} >
                  {pevent.map((post) => (
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={`data:image/png;base64,${post.image}`}
                                    style={imgStyle}
                                    alt="HH-Event"
                                />
                                <Carousel.Caption >
                                    <h4 style={{color:"black"}} >
                                        {post.name}
                                    </h4>
                                    <p align="left" style={{color:"black"}} >
                                        <b>Venue</b>: {post.venue}
                                        <br />
                                        <b>Date</b>: {moment(post.start_time).format('MMMM Do YYYY')}
                                        <br />
                                        <b>About</b>: {post.description}
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                  ))}
                </Carousel>
            </Paper>
            </Grid>
            <Grid item xs={5}>
            <Paper style={{height:'460px', borderRadius:'10px', width:"580px"}} variant="outlined" >
                <Typography align="center" variant='h5' style={{color:"textSecondary", fontFamily:"Gabriola",marginTop:"20px"}} >
                    <b>Our Volunteers' Thoughts on Helping Hands</b>
                </Typography>

                <div className={classes.root} >
                    <Grid container spacing={2}>
                        <Grid item xs >
                            <Card className={classes.card} style={{spacing:2,backgroundColor:"#4DD0E1"}} >
                                <CardContent>
                                    <Typography component='p' >
                                        <i>"Really enjoy volunteering for Helping Hands. when a little of your time and the simplest of acts can make someone's day better, it is so rewarding"</i>
                                        <br/>
                                        - Geethanjali Madhu
                                    </Typography>
                                    <center><AccountCircleIcon /></center>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs >
                            <Card className={classes.card} style={{spacing:2,backgroundColor:"#4DD0E1"}} >
                                <CardContent>
                                    <Typography component='p' >
                                       <i> "I got to experience so many elements of volunteering since joining Helping Hands, it was a genuinely enriching experience. Even besides that, I was unaware just how much fun I would have!"</i>
                                         <br/>
                                         - Kausalya R
                                    </Typography>
                                    <center><AccountCircleIcon /></center>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs >
                            <Card className={classes.card} style={{spacing:2,backgroundColor:"#4DD0E1"}} >
                                <CardContent>
                                    <Typography component='p' >
                                        <i>"If you are looking for an authentic volunteering experience among people who work passinately for the causes they believe in, then this is the place to be"</i>
                                         <br/>
                                         - Shreya Patil
                                    </Typography>
                                    <center><AccountCircleIcon /></center>
                                </CardContent>
                            </Card>
                        </Grid>


                    </Grid>
                </div>

            </Paper>
            </Grid>
                  </Grid>
    <Footer />
    </Box>
    )
}

export default PastEvents;