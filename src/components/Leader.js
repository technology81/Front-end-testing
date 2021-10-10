import Homebar from "./Homebar";
import React, { useEffect, useState } from 'react';
import Table4 from './Certificatetable';
// import { makeStyles } from '@material-ui/core/styles';
// import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';
// import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
// import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import { useHistory } from 'react-router-dom';
import { Paper, Typography, Grid, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText,Button } from '@material-ui/core';
import { CenterFocusStrong } from '@material-ui/icons';
 import Chart from './Chart'
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Certificates from './Certificates';
import Snack from './Snackbar';
import axios from 'axios';
import { Table, TableCell, TableBody, TableHead, TableRow, TableContainer } from '@material-ui/core';
const useStyles = makeStyles({
  root: {
    marginLeft: '0px',
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
    table: {
      minWidth: 400,
    },

  },
  gridItem: {
    border: '1px solid lightgray',
    borderRadius: '20px',
    backgroundColor: '#Faf0e6'
  },
  grid: {
    margin: 5
  },
  ncontainer: {
    minHeight: 180,
    maxHeight:180,
    overflowY:"scroll",

  },
});

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
const Leader = () => {
  const paperStyle = { padding: '20px 20px', width: 800, height: 580, margin: "30px auto" }
  const classes = useStyles();
  const gridStyle = { margin: '3px auto', padding: '5px auto' }
  const Home = () => {
    history.push('/apphome');
  };
  const [pevent, setPevent] = useState([])
  const event = "Nominate"
  const [user, setUser] = useState([])
  const [eventId, setEventId] = React.useState();
  const [disable, setDisable] = useState(false);
  const [flag, setFlag] = useState(true);
  const [notify, setNotify] = useState({ isOpen: false, mesg: '' });
  const [count,setCount]=useState();
  let history = useHistory()
  useEffect(() => {
    axios.get('http://localhost:8081/account/events/getEventsList/false/Weekend event')

      .then(response => {
        console.log(response)
        console.log(response.data[0].event_id)
        setPevent(response.data)
        setCount(response.data.length)

      })
      .catch(err => {
        console.log(err)

      })
  }, [event])
  const handleChange = (event) => {
    setFlag(false);
    // setEventName(event.target.value);
    const evenm = event.target.value;
    localStorage.setItem('LeaderboardeventId', JSON.stringify(evenm));
    const eventname = JSON.parse(localStorage.getItem("LeaderboardeventId"));
    console.log(eventname)
    axios.get(`http://localhost:8081/account/admin/getAllParticipants/${eventname}`)
      .then(response => {
        console.log(response)
        console.log(response.data);
        setUser(response.data);
        // const pro=response.data
        // localStorage.setItem('myEdit',JSON.stringify(pro))


      })
      .catch(err => {
        console.log(err)



      })
  };
  const handleNomination=(userid,e)=>{
     const evename = JSON.parse(localStorage.getItem("LeaderboardeventId"));
    setDisable(true)
    axios.post(`http://localhost:8081/account/leader/sendNominationCard/${userid}/${evename}`)
         .then((response) => {
        var res=response.status
        console.log(response)

        console.log(response.status)
        if (res === 200) {


          //  alert("Certificate Sent Successfully!")
           setNotify({
                          isOpen: true,
                          mesg: "NominationCard Sent Successfully!"
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
    <Box m={3}>
      <Homebar />
      <center>

        <Typography variant='h4' color="textSecondary" align="center">Leaderboard</Typography>

        <p style={{ height: "30px", width: "1200px", padding: "5px", borderRadius: "5px", color: "#2874a6" }}>
          By Danzel Washington  -  <strong><i> Man gives you the award but god gives you the reward </i></strong>
        </p>
      </center>

      <Box m={3} p={2}>
        <Typography gutterBottom variant="h6" color="secondary" align="center">
          Rewards and Recognitions
        </Typography>
        <Grid container spacing={1} className={classes.grid}>
          {/* <Paper variant="outlined">
    */}
          <Grid item xs={6} >
            <Paper className={classes.gridItem}>
              <Typography gutterBottom variant="body1" color="primary" align="center" >
                Nominate Volunteers
              </Typography>
              <Box m={3}>
                <FormControl alignItems="center" variant="outlined">
                  <InputLabel>Event Name</InputLabel>
                  <Select
                    labelId="demo-event-name-label"
                    id="demo-event-name"
                    label='Event Name'
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

                </FormControl>
              </Box>

              <Grid container style={{padding:'20px'}}>
                  <Grid item xs={4} md={12}>
              <center>

                <TableContainer component={Paper}  className={classes.ncontainer}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center"  style={{backgroundColor:"#73C6B6"}}>First Name</TableCell>
                        <TableCell align="center" style={{backgroundColor:"#73C6B6"}}>Last Name</TableCell>
                        <TableCell align="center"  style={{backgroundColor:"#73C6B6"}}>Nominate</TableCell>

                      </TableRow>
                    </TableHead>
                    {(flag)?<TableBody><TableRow><Typography gutterBottom variant="h6" color="textSecondary" >
                <center>Event not selected yet!</center>
              </Typography></TableRow></TableBody>:
                    <TableBody>

                      {user.map((row) => (

                        <TableRow key={row.firstname}>

                          <TableCell align="center" >{row.firstname}</TableCell>
                          <TableCell align="center">{row.lastname}</TableCell>
                          <TableCell align="center"><Button type='submit' variant="contained" color="primary"
                            onClick={e => handleNomination(row.id, e)} disabled={disable} > Nominate
                          </Button></TableCell>


                        </TableRow>
                      ))}
                    </TableBody>}
                  </Table>
                </TableContainer></center>

                        </Grid></Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} >
          <Paper className={classes.gridItem}>
            <Typography gutterBottom variant="body1" color="primary" align="center">
              Send Certificates
            </Typography>
            <br/>
            <Table4/>
            <br/>
            </Paper>
          </Grid>

          {/* </Paper> */}
          {/* <Card  className={classes.card}>
              <CardContent>
              </CardContent>
            <CardActionArea onClick={()=>{history.push('/LeaderRR');}}>

                    <ListItem alignItems='center'>
                      <ListItemIcon ><EmojiPeopleRoundedIcon /></ListItemIcon>
                      <ListItemText>
                      <Typography gutterBottom variant="h6" component="h1">
                      Nominate Volunteers
                    </Typography>
                      </ListItemText>
                    </ListItem> */}

          {/* </CardActionArea>
                  <CardActionArea onClick={()=>{history.push('/Certificates');}}>
                  <CardContent>

                    <ListItem alignItems='center'>
                      <ListItemIcon ><CardGiftcardIcon /></ListItemIcon>
                      <ListItemText>
                      <Typography gutterBottom variant="h6" component="h1">
                      Send Certificates
                    </Typography>
                      </ListItemText>
                    </ListItem>

                  </CardContent>
                  </CardActionArea>
            </Card> */}


          <Grid container spacing={2} className={classes.grid}>

            <Grid item xs={12}>
              <Paper variant="outlined" style={{ borderRadius: "30px" }}>
                <Typography gutterBottom variant="h6" color="secondary" align="center">Analytics</Typography>
                <Chart />
              </Paper>
              {/* <CardActionArea onClick={()=>{history.push('/Chart');}}>
                  <CardContent>

                    <ListItem alignItems='center'>
                      <ListItemIcon ><HourglassEmptyIcon /></ListItemIcon>
                      <ListItemText>
                      <Typography gutterBottom variant="h6" component="h1">
                      Hours Spent
                    </Typography>
                      </ListItemText>
                    </ListItem>

                  </CardContent>
                  </CardActionArea> */}
            </Grid>
          </Grid>
        </Grid>

        <Snack
                notify={notify}
                setNotify={setNotify}
            />
      </Box>
      <Footer />
    </Box>
  );




}
export default Leader;