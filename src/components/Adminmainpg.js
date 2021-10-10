import React, { useState, useEffect } from "react";
import Homebar from "./Homebar";
import Footer from './Footer';
import { Button, Typography, Grid, Box, Avatar, Tooltip, IconButton } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { useHistory } from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';
// import { Link } from 'react-router-dom';
import PublishSharpIcon from '@material-ui/icons/PublishSharp';
import { makeStyles } from '@material-ui/core/styles';
import {  Paper } from '@material-ui/core';

import axios from 'axios';
import Pastupload from "./Pastupload";
import Addevent from "./Addevents";
import Editevent from "./Editevents";
import { Table, TableCell, TableBody, TableHead, TableRow, TableContainer } from '@material-ui/core';
import Snack from './Snackbar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { deepPurple } from '@material-ui/core/colors';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    // margin: theme.spacing(2),
  },
  root: {
    marginLeft: '3px',
  },
  card: {
    //width:350,
    borderRadius: '30px',
    backgroundColor: "white",
    // '&:hover':{
    //     backgroundColor:"#EBF5FB",
    // },
    button: {
      color: "primary",
      // '&:hover':{
      //     backgroundColor:"#2471A3",
      // },
      marginTop: "8px"
    },

  },
  gridItem: {
    border: '1px solid lightgray',
    borderRadius: '20px',
    backgroundColor: '#Faf0e6',

    marginTop: '1px',
    width: 300,
    marginLeft: '30px'

  },
  grid: {
    margin: 5
  },
  table: {
    minWidth: 400,
  },

  formControl: {
    // marginTop: theme.spacing(2),
    minWidth: 180,

  },
}));
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


function createData(firstname, lastname, email) {
  return { firstname, lastname, email };
}
const rows = [
  createData('Anvitha', 'Mihir', 'anvitha@gmail.com'),
  createData('Ajith', 'Kale', 'AjithKale@gmail.com'),
  createData('Nikitha', 'M', 'Niki@gmail.com'),
  createData('Sanya', 'Manohar', 'saniya12@gmail.com'),

];



export default function Adminpg() {
  let history = useHistory();
  const classes = useStyles();
  const [wevent, setWevent] = useState([]);
  const event = "Weekend event"
  const [open, setOpen] = React.useState(false);
  const [past, setPast] = React.useState({ isOp: false });
  const [add, setAdd] = React.useState({ open: false });
  const [editp, setEditp] = React.useState({ openEdit: false });
  const [eventName, setEventName] = React.useState();
  const [user, setUser] = useState([])
  const [count, setCount] = useState()
  const [notify, setNotify] = React.useState({ isOpen: false, mesg: '' });
  const [flag, setFlag] = useState(false);
  const [select,setSelect]=useState(false);
  const [cnt, setCnt] = useState()
  useEffect(() => {
    axios.get('http://localhost:8081/account/events/getEventsList/true/Weekend event')

      .then(res => {
        console.log(res)
        console.log(res.data[0].event_id)
        setWevent(res.data)
        setCnt(res.data.length)
        if(cnt===0) {
        setFlag(true);
      }else{
        setFlag(false);
      }
      })
      .catch(err => {
        console.log(err)

      })
  }, [event])

  const handleChange = (event) => {
    setEventName(event.target.value);
    const eventn = event.target.value;
    setSelect(true);
    axios.get(`http://localhost:8081/account/admin/getAllParticipants/${eventn}`)

    .then(res => {
      console.log(res)
      setUser(res.data)
      setCount(res.data.length)
    })
    .catch(err => {
      console.log(err)

    })
}
const sentEmail = () => {
    axios.post(`http://localhost:8081/account/admin/sendReminders/${eventName}`)
      .then(res => {
        if (res.status === 200) {
          // alert("Remainders sent successfully")
          setNotify({
                    isOpen:true,
                    mesg:"Reminders sent successfully!"
                })
        }

      })
      .catch(err => {
        setNotify({
          isOpen:true,
          mesg:"Something went wrong!"
      })

      })
    // alert("senting mail")
  };


  const handleDialogue = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const pastDialogue = () => {
    setPast({
      isOp: true

    })

  };

  const addEvents = () => {
    setAdd({
      open: true

    })
  };

  const editEvents = () => {
    setEditp({
      openEdit: true

    })
  };

  return (

    <Box m={3}>
     <Snack
              notify={notify}
              setNotify={setNotify}
              />
      <Pastupload past={past}
        setPast={setPast} />
      <Addevent add={add}
        setAdd={setAdd} />
      <Editevent editp={editp}
        setEditp={setEditp} />
     
      {/* <Box mt={1} mb={3} align="center">
        <img src={logo} alt="logo" width='200' height='150' />
      </Box> */}
      {/* <br></br>
      <br></br> */}
      <center>

        <Typography variant='h4' color="textSecondary" align="center">Admin Board</Typography>

        <p style={{ height: "30px", width: "1200px", padding: "5px", borderRadius: "5px", color: "#2874a6" }}>
          By Danzel Washington  -  <strong><i> Man gives you the award but god gives you the reward </i></strong>
        </p>
      </center>
      <Box m={3} p={2}>

        <Grid container spacing={1} className={classes.grid}>

          <Grid item xs={4} >
            <Paper className={classes.gridItem} style={{backgroundColor:'#FFBD00'}}>
              <Typography gutterBottom variant="body1" color="Black" align="center" onClick={addEvents} style={{ cursor: 'pointer' }}>
                Add Events
              </Typography></Paper>

          </Grid>
          <Grid item xs={4} >
            <Paper className={classes.gridItem} style={{backgroundColor:'#009BFF'}}>
              <Typography gutterBottom variant="body1" color="Black" align="center" onClick={editEvents} style={{ cursor: 'pointer'}}>
                Edit Events
              </Typography></Paper>
          </Grid>
          <Grid item xs={4} >
            <Paper className={classes.gridItem} style={{backgroundColor:'#FF8700'}}>
              <Typography gutterBottom variant="body1" color="Black" align="center" onClick={pastDialogue} style={{ cursor: 'pointer' }}>
                Upload Past Event Photos
              </Typography></Paper>
          </Grid>
          {/* <Grid item xs={12} className={classes.gridItem}>
              <Typography gutterBottom variant="body1" color="Black" align="center"  onClick={handleDialogue} style={{cursor:'pointer'}}>
                View Registered Users
              </Typography>
            </Grid> */}




        </Grid>

        <br />
        <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={12}>
            <Paper variant="outlined" style={{ borderRadius: "30px", padding: "30px", backgroundColor: '#Faf0e6' }}>
              {/* <Typography gutterBottom variant='h6' color="secondary" align="center">Registered User</Typography><br/> */}
              <Grid
                container
                direction="row"
              // justifyContent="center"
              //alignItems="center"
              spacing={10}
              >
                <Grid item md={4}>
                <FormControl variant="outlined" className={classes.formControl} >

                  <InputLabel id="demo-event-name-label">Event Name</InputLabel>
                  <Select
                    labelId="demo-event-name-label"
                    id="demo-event-name"
                    label="Event Name"
                     value={eventName}
                     onChange={handleChange}

                    MenuProps={MenuProps}
                  >
                    {wevent.map((eve) => (
                      <MenuItem key={eve.name} value={eve.name} >
                        {eve.name}
                      </MenuItem>
                    ))}
                  </Select>


                </FormControl></Grid>
                <Grid item md={4}>
                {/* <Box ml={40} > */}
                <Grid
                container
                direction="row">

                <Grid item>
                <Typography gutterBottom variant='h5' color="secondary" align="center">Registered Users</Typography></Grid>
                <Grid item>
                <Tooltip title="Count of participants"><Avatar  className={classes.purple} style={{marginLeft:'20px'}}>{count}</Avatar>
                </Tooltip></Grid></Grid>
                {/* </Box> */}

                {/* <Tooltip title="Count of participants"><Avatar style={{ color: 'purple', marginLeft: 20, marginRight: 20 }}>{count}</Avatar>
                </Tooltip> */}
                </Grid>
                <Grid item md={4}>
                  <center>
                  <Tooltip title="Sent Email">
                  <IconButton color='primary' aria-label="Notify"
                   onClick={sentEmail}>

                    <NotificationsIcon fontSize="large"/>
                  </IconButton></Tooltip>
                  </center>
                  </Grid>
                  </Grid>


                <br/>
                <Grid container>
                  <Grid item xs={4} md={8}>
              <center>

              {(flag)?<div font-color='red'><Alert severity="error">No Events Added Yet!</Alert></div>:
              <TableContainer component={Paper} style={{marginLeft:'25%'}} >
                {(select)?
                <Table className={classes.table} aria-label="simple table">

                  <TableHead>
                    <TableRow>
                      <TableCell align="center" >First Name</TableCell>
                      <TableCell align="center">Last Name</TableCell>
                      <TableCell align="center">Email</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.map((row) => (
                      <TableRow key={row.firstname}>
                        <TableCell align="center" >{row.firstname}</TableCell>
                        <TableCell align="center">{row.lastname}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>


                      </TableRow>
                    ))}
                  </TableBody>
                </Table>:''}
              </TableContainer>}</center></Grid></Grid>
            </Paper>
          </Grid>
        </Grid>

      </Box>
      <Footer />
    </Box>
  );






}