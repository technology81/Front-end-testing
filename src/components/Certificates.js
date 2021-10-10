import React,{ useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Route, useHistory } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import axios from 'axios';
import CardContent from '@material-ui/core/CardContent';
import {useState} from 'react';
import { IconButton, Box, Tooltip, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import HHicon from './logo.jpg';
import Homebar from "./Homebar";
import Footer from './Footer';
import Snack from './Snackbar';

const imgstyle = {
  margin: '10px 60px'
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  menuButton: {
    marginLeft: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    // keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));



	export default function ButtonAppBar() {

  const [auth] = React.useState(true);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [value, setValue] = React.useState(0);
  const [pevent, setPevent] = useState([]);
 
  const [notify, setNotify] = React.useState({ isOpen: false, mesg: '' });


  useEffect(()=>{

   {

   axios.get('http://localhost:8081/account/events/getEventsList/false/Weekend event')
  .then((response) => {


   console.log(response.data)
   var id=response.data[0].event_id;

   setPevent(response.data)

   })
 };
}, [])

  const classes = useStyles();


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleclose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);};


 /*
    let history = useHistory();
  const home = () => {

    history.push('/home');
  };
  let history = useHistory();
  const login = () => {
    setAnchorEl(null);
    history.push('/login');
  };
*/



const history = useHistory();
const [success,setSuccess]=useState(false);
const [mesg,setMesg]=useState('');
const [disable, setDisable] = React.useState(false);

const handleRegistration=(eventid,e)=>{

  setDisable(true)
  axios.post(`http://localhost:8081/account/leader/sendCertificates/1`)
  .then((response) => {
      var res=response.status
      console.log(response)
      console.log(response.status)
      if (res === 200) {
          setSuccess(true);
          setMesg(response.data.message);
        //  alert("Certificate Sent Successfully!")
         setNotify({
                        isOpen: true,
                        mesg: "Certificate Sent successfully!"
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
          setSuccess(true);
          setMesg(error.response.data.message);


      }
      else{
        setNotify({
          isOpen: true,
          mesg: "Something Went Wrong!"
      })
      }
      // setSuccess(false);
      console.log(error)
      setSuccess(true);
      setMesg(error);


  });
  // setSuccess(false);

};


  return (


    <Box  mb={10}>

    <Box m={5}>
    
      <br></br>
      <center>

               <Typography variant='h5' style={{color:"textSecondary"}} >Certificates</Typography>
                </center>
       <br></br>
        <Grid container  spacing={4} >


                {pevent.map((option) => (

                    <Grid item xs={12} sm={6} md={6}>
                      <Card style={{minwidth:200}}>
                      <CardContent style={{backgroundColor:"#D6EAF8"}}>
                      <center><b>{option.name}</b><br/><br/></center>



                     <b>Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</b>&nbsp;&nbsp;{option.event_type}<br></br>
                     <b>Venue &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>&nbsp;&nbsp;{option.venue}<br></br>
                     <b>Description &nbsp;:</b>&nbsp;&nbsp;{option.description}<br></br>
                     <b>Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>&nbsp;&nbsp;{moment(option.start_time).format('MMMM Do YYYY')}<br></br>
                     <br></br>
                     <Button type='submit'   variant="contained" color="primary" onClick={e=>handleRegistration(option.event_id,e)} disabled={disable} > Send Certificates
                     </Button>

                      </CardContent></Card></Grid>

                ))}



        </Grid>
        <Snack
                notify={notify}
                setNotify={setNotify}
            />

  </Box>

</Box>

  )
}