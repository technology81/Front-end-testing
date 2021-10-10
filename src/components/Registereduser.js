import React, { useState, useEffect } from "react";
import Homebar from "./Homebar";
import Footer from './Footer';
import logo from './logo.jpg';
import { Box, Grid, Card, Typography, CardContent, IconButton, Avatar, Tooltip } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import axios from 'axios';
import { deepPurple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Snack from './Snackbar';

const useStyles = makeStyles((theme) => ({
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    margin: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  head:{
    color:"#6200EE"
  },
}));

const Reguserpg = (props) => {
  const classes = useStyles();
  const [notify,setNotify]=useState({isOpen:false,mesg:''});
  const [user, setUser] = useState([])
  const [count, setCount] = useState()
  const eventn = JSON.parse(localStorage.getItem("eventName"))
  console.log(eventn)
  useEffect(() => {
    axios.get(`http://localhost:8081/account/admin/getAllParticipants/${eventn}`)

      .then(res => {
        console.log(res)
        setUser(res.data)
        setCount(res.data.length)
      })
      .catch(err => {
        console.log(err)

      })
  }, [eventn])
  const [disable, setDisable] = React.useState(false);
  const sentEmail = () => {

    axios.post(`http://localhost:8081/account/admin/sendReminders/${eventn}`)
      .then(res => {
        if (res.status === 200) {
          // alert("Remainders sent successfully")
          setNotify({
                    isOpen:true,
                    mesg:"Remainders sent successfully!"
                })
                setDisable(true)
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
  return (
    <Grid  height='100%'>
      <Homebar />

      <Box align="center">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant='h5' className={classes.head} >Registered users for {eventn}</Typography>
          <Tooltip title="Count of participants">
            <Avatar className={classes.purple}>{count}</Avatar></Tooltip>
          <Tooltip title="Sent Email">
            <IconButton color='primary' aria-label="Notify" className={classes.margin}
              onClick={sentEmail} disabled={disable}>
              <NotificationsIcon />
            </IconButton></Tooltip></Grid>
      </Box>
      <Box m={5}>

        <Grid container spacing={6} >

          {/* <Grid item xs={12} sm={6} md={6}>
                          <Card style={{minwidth:200}}>
                          <CardContent >
                            <Box ml={15}>
                            <Typography variant='h6'><b>Count of users registered : {count}</b></Typography>
                           < Button  color='primary' variant='contained' margin='0px 10px' onClick={sentEmail}><NotificationsIcon/>&nbsp;&nbsp;Notify User</Button>
                            </Box>
                          </CardContent>
                          </Card>
                          </Grid> */}
          {user.map((option) => (
            // <Box mb={3}>
            // <Form key={post.id}>
            <Grid item xs={12} sm={6} md={6}>
              <Card style={{ minwidth: 200,backgroundColor:"#D6EAF8" }}>
                <CardContent>
                  {/* <User id:&nbsp;&nbsp;{post.id}<br></br> */}
                  <b>First Name :</b>&nbsp;&nbsp;{option.firstname}<br></br>
                  <b>Last Name :</b>&nbsp;&nbsp;{option.lastname}<br></br>
                  <b>Email id :</b>&nbsp;&nbsp;{option.email}<br></br>
                </CardContent></Card></Grid>
            // </Form>
            // </Box>
          ))}


          {/* </Formik> */}
          {/* </Card> */}
        </Grid>
        {/* </div>
        </div> */}
        <Snack
              notify={notify}
              setNotify={setNotify}
              />
      </Box><Box mt={20}>
      <Footer /></Box>
      </Grid>

  )
}
export default Reguserpg;