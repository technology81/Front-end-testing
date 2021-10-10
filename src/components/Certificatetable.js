import React,{ useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {Route, useHistory } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import axios from 'axios';
import { IconButton, Box, Tooltip, Button,Paper,Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Snack from './Snackbar';


const imgstyle = {
  margin: '10px 60px'
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '550px',
        marginLeft:'20px',

      },
      container: {
        minHeight: 300,
        maxHeight:300,
        overflowY:"scroll",

      },
  menuButton: {
    marginLeft: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
}));
function createData(name,venue,date,send) {
    return {name,venue,date,send };
  }

  const rows = [
    createData('Environment Protection','Mumbai','21st August 2021','send'),
    createData('Helping the orphans','Chennai','21st August 2021','send'),
    createData('Protecing Earth','Thane','21st August 2021','send'),
    createData('Food Campaign','Mumbai','21st August 2021','send'),
    createData('Raise for Poor','Pune','21st August 2021','send'),

  ];



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


	export default function ButtonAppBar() {

  const [auth] = React.useState(true);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [value, setValue] = React.useState(0);
  const [pevent, setPevent] = useState([]);
  const dataInfo=JSON.parse(localStorage.getItem("myInfo"))
  const [notify, setNotify] = React.useState({ isOpen: false, mesg: '' });


  useEffect(()=>{

   {

   axios.get('http://localhost:8081/account/events/pastEvents')
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


const history = useHistory();
const [success,setSuccess]=useState(false);
const [mesg,setMesg]=useState('');



const handleRegistration=(eventid,e)=>{


  axios.post(`http://localhost:8081/account/leader/sendCertificates/${eventid}`)
  .then((response) => {
      var res=response.status
      console.log(response)
      console.log(response.status)
      if (res === 200) {
          setSuccess(true);
          setMesg(response.data.message);
          setNotify({
            isOpen: true,
            mesg: "Certificate Send Successfully!"
        })
      }
  })
  .catch((error) => {
      if (error.response.status === 400) {
          // console.log(error.response.data.message);
          // alert("Already registered ")
          // setSuccess(false);
          setSuccess(true);
          setNotify({
            isOpen: true,
            mesg: "Something Went Wrong"
        })


      }
      else
      // setSuccess(false);
      console.log(error)
      setSuccess(true);
      setMesg(error);


  });
  // setSuccess(false);

};


  return (


    // <Paper className={classes.root} variant="outlined">
      <Grid container>
                  <Grid item xs={4} md={10}>
        <center>

      <TableContainer className={classes.container}  component={Paper} style={{marginLeft:'10%'}} >
        <Table stickyHeader aria-label="sticky table">
                  <TableHead style={{backgroundColor:"#73C6B6"}}>
                    <TableRow>
                      <TableCell style={{backgroundColor:"#73C6B6"}} align="center">Event Name</TableCell>
                      <TableCell style={{backgroundColor:"#73C6B6"}} align="center">Venue</TableCell>
                      <TableCell style={{backgroundColor:"#73C6B6"}} align="center">Date</TableCell>
                      <TableCell style={{backgroundColor:"#73C6B6"}} align="center">Send Certificates</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pevent.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.venue}</TableCell>
                        <TableCell align="center">{moment(row.start_time).format('MMMM Do YYYY')}</TableCell>
                        <TableCell align="center"> <Button type='submit' disabled={row.isSubmitting}   variant="contained" color="primary" onClick={e=>handleRegistration(row.event_id,e)}  > Send
                        </Button></TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer></center>
             </Grid>
             <Snack
                notify={notify}
                setNotify={setNotify}
            />
             </Grid>
        // </Paper>





  )
}