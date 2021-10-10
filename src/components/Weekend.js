import React,{useState,useEffect} from 'react';
import {Grid, Card, Box, Button, CardContent, Typography, makeStyles} from '@material-ui/core';
import imgl from './logo.jpg';
import wkndevnt1 from './explore.jpeg';
import axios from 'axios';
import moment from 'moment';
import Homebar from "./Homebar";
import Footer from './Footer';
import Snack from './Snackbar';
const useStyles=makeStyles({
card:{
    backgroundColor:"#D6EAF8",
    '&:hover':{
        backgroundColor:"#EBF5FB",
    }
}
,button:{
    color:"primary",
    '&:hover':{
        backgroundColor:"#2471A3",
    },
    marginTop:"8px"
}
});
const Weekend = (props) => {
    
    const headStyle = {margin:'0', color:'#6200EE'}
    const btnStyle = {margin:'8px 0' }
    const gridStyle={ margin:'3px auto', padding:'5px auto'}
    
    const [notify,setNotify]=useState({isOpen:false,mesg:''});

    
    const [wevent,setWevent]=useState([])
    const event="Weekend event"
    //const future=true
    useEffect(()=>{
        axios.get('http://localhost:8081/account/events/getEventsList/true/Weekend event')
        //('http://localhost:8081/account/event/getEventList/'.concat('/isFutureEvent').concat('future').concat('/eventType').concat('event'))
        //(`http://localhost:8081/account/events/getEventsList/isFutureEvent${future}/eventType${event}`)
        .then(res=>{
            console.log(res)
            console.log(res.data[0].event_id)
            setWevent(res.data)
        })
        .catch(err=>{
            console.log(err)

        })
    },[event])
    const handleRegistration=(id,e)=>{
       
        
            axios.post(`http://localhost:8081/account/events/registerForEvent/${id}/${email}`)
        .then((response) => {
            var res=response.status
            console.log(response)
            console.log(response.status)
            if (res === 200) {
                setNotify({
                    isOpen:true,
                    mesg:"Registered successfully"
                })
            //    alert("Registered Successfully")
            }
        })
        .catch((error) => {
            if (error.response.status === 400) {
                // console.log(error.response.data.message);
                // alert("Already registered ")
                setNotify({
                    isOpen:true,
                    mesg:"Already Registered"
                })
                
            }
            else{
            // setSuccess(false);
            console.log(error)
            setNotify({
                isOpen:true,
                mesg:"Something went wrong!"
            })}
        });
        //  setSuccess(false);
    };
    const classes=useStyles();
    return(
        <Box>
            
      
      <Box align="center">
      <center>
               <Typography variant='h5' style={{color:"textSecondary"}} >Weekend Events</Typography>
               <p style={{ height: "30px", width: "1200px", padding: "5px", borderRadius: "5px", color: "#2874a6" }}>
                     By Helen Keller -  <strong><i> Alone we can do so little; together we can do so much. </i></strong>
               </p>
      </center>
      </Box>
      <Box m={5}>
        
            <Grid container  spacing={6} >
             
                    
            {wevent.map((post)=>(
                <Grid item xs={12} sm={6} md={6}>
                    <Card style={{minwidth:200}} className={classes.card}>
                          <CardContent>
                          <Grid container spacing={5}>
                            <Grid item xs={6} style={gridStyle}>
                            <img src={`data:image/png;base64,${post.image}`} height='200px' width='270px' alt="Event image" />
                            </Grid>
                            <Grid item xs={6} style={gridStyle}>
                               <br></br>
                                <b>{post.name}</b><br></br>
                                {/* Event id : {post.event_id}<br></br> */}
                                <b>Venue : </b>  {post.venue}<br></br>
                                <b>Date : </b>  {moment(post.start_time).format('MMMM Do YYYY')}<br></br>
                               <b>Start Time : </b> {moment(post.start_time).format('h:mm a')}<br></br>
                                <b>End Time : </b>  {moment(post.end_time).format('h:mm a')}<br></br>
                                <Button type='submit'  variant="contained" color="primary" disabled={props.isSubmitting}
                                className={classes.button} onClick={e=>handleRegistration(post.event_id,e)} >{props.isSubmitting ? "Loading" : "Register"}</Button>
                                
                                </Grid>
                            </Grid>
                          </CardContent>
                    </Card>
                </Grid>
                      
                    ))}

                  
              
            </Grid>
            <Snack
              notify={notify}
              setNotify={setNotify}
              />
      </Box>
      <Footer/>
    </Box>
    )
}

export default Weekend;