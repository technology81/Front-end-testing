import React, {useEffect, useState} from 'react';
import {Grid, Box, AppBar, Toolbar,FormControl,InputLabel,Select,MenuItem,FormHelperText, Typography, IconButton, Paper, Card, CardContent, Avatar,Radio, Checkbox, Button, makeStyles, FormGroup, FormControlLabel} from '@material-ui/core';
import {ArrowBack, Home, Menu } from '@material-ui/icons';
import {Formik, Form, Field } from 'formik';
import Homebar from "./Homebar";
import Footer from './Footer';
import Snack from './Snackbar';
import axios from 'axios';

const LeaderRR = () => {

    const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
    const paperStyle = {padding:'10px 25px', height:'auto', width:'auto', margin:'15px 20px', border:' black'}
    const gridStyle = {margin:'3px auto', padding:'5px auto'}
    const headStyle = {margin:'0', fontFamily:'sans-serif', color:'#8A2BE2'}
    const btnStyle = {margin:'8px 0'}
    const logoStyle = {height:98, width:128}
    const iconStyle = {height:45, width:45}
    const formStyle = {textAlign:'center'}
    const [pevent, setPevent] = useState([])
    const [user, setUser] = useState([])
    const event = "Past event"
    const [disable, setDisable] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, mesg: '' });
    const handleChange = (event) => {
        // setEventName(event.target.value);
        const evid=event.target.value;
        localStorage.setItem('LeadereventId', JSON.stringify(evid));
        const eventn = JSON.parse(localStorage.getItem("LeadereventId"));
        console.log(eventn)
         axios.get(`http://localhost:8081/account/admin/getAllParticipants/${eventn}`)
         .then(response => {
            console.log(response)
            console.log(response.data);
            setUser(response.data);
            // const pro=response.data
            // localStorage.setItem('myEdit',JSON.stringify(pro))


        })
        .catch(err=>{
            console.log(err)



        })
    };
    const [eventId, setEventId] = React.useState();

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
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        large: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            alignSelf:'center',

        },
        menu:{
            marginLeft:"20px"
        },
        card: {
            backgroundColor:"#D6EAF8"
        },




    }));

    const classes = useStyles();
    const eventname = JSON.parse(localStorage.getItem("LeadereventId"));
    const handleNomination=(userid,e)=>{
        // const eventname = JSON.parse(localStorage.getItem("LeadereventId"));
        setDisable(true)
        axios.post(`http://localhost:8081/account/leader/sendNominationCard/${userid}/${eventname}`)
             .then((response) => {
            var res=response.status
            console.log(response)

            console.log(response.status)
            if (res === 200) {


              //  alert("Certificate Sent Successfully!")
               setNotify({
                              isOpen: true,
                              mesg: "NominationCard Send Successfully!"
                          })
               setDisable(false)
            }
        })

        .catch((error) => {
            if (error.response.status === 400) {
              setNotify({
                isOpen: true,
                mesg: "Something Went Wrong!"
            })



            }
            else{
              setNotify({
                isOpen: true,
                mesg: "Something Went Wrong!"
            })
            }
            // setSuccess(false);
            console.log(error)



        });
        // setSuccess(false);

      };



    return (
        <Box>
            <Homebar/>

        <Grid style={gridStyle}>


                <Grid align='center'>
                    <br />
                    <center>

                        <Typography variant='h5' style={{color:"textSecondary"}} >Rewards and Recognition</Typography>
                        </center>
                </Grid>
                <Box className={classes.menu}>
                <FormControl    alignItems="center">
                <InputLabel>Event Type</InputLabel>
                 <Select
                    labelId="demo-event-name-label"
                    id="demo-event-name"

                    value={eventId}
                    onChange={handleChange}

                    MenuProps={MenuProps}
                    >
                    {pevent.map((eve) => (
                        <MenuItem key={eve.name} value={eve.name} >
                        {eve.name}
                        </MenuItem>
                    ))}
                    </Select>
                                    <FormHelperText>Find event by name</FormHelperText>
                                    <br />
                                </FormControl>
                                    </Box>



                <Formik >
                    {(props) => (

                        <Form style={formStyle}>

                            <Paper style={paperStyle} elevation={15}>


                                            <b> Participant(s) </b>

                                            <div className={classes.root}>

                                                    {user.map((post)=>(
                                                        <Grid item xs={12} sm={6} md={6} >
                                                        <Card className={classes.card}>
                                                        <CardContent>
                                                        <center>
                                                            <Avatar src="/broken-image.jpg" className={classes.large} />
                                                            <Typography variant='h6'>
                                                                {post.firstname}&nbsp;{post.lastname}
                                                            </Typography>
                                                            <Button type='submit'   variant="contained" color="primary" onClick={e=>handleNomination(post.id,e)} disabled={disable} > Nominate
                                                            </Button></center>
                                                        </CardContent>
                                                        </Card>
                                                        </Grid>



                                                    ))}






                                            </div>

                                        {/* <Button style={btnStyle} align='right' type='submit' color='primary' variant="contained">Nominate</Button> */}


                            </Paper>

                        </Form>
                    )}
                </Formik>

                <Snack
                notify={notify}
                setNotify={setNotify}
            />
    </Grid>
                <Footer/>
    </Box>

    )
}

export default LeaderRR