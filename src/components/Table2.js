import React, { useEffect } from 'react';
import { makeStyles,Paper } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const imgstyle = {
    margin: '10px 60px'
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: '550px',
      },
      container: {
        minHeight: 320,
        maxHeight:320,
        overflowY:"scroll",
      },
    grid:{
      // backgroundColor:"#F5B041",
      height:"auto"
    },


    media: {
        height: 140,


    }
}));
function createData(name, venue, date,time) {
    return { name, venue, date,time };
  }
  const rows = [
    createData('Animal Shelter','Mumbai','21st August 2021','6:30pm'),
    createData('Green Earth','Chennai','21st August 2021','6:30pm'),
    createData('Oldage Home','Mumbai','21st August 2021','6:30pm'),
    createData('Fund Raising','Mumbai','21st August 2021','6:30pm'),

  ];



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
        <Paper className={classes.root} variant="outlined">
        <center>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
                  <TableHead style={{backgroundColor:"#73C6B6"}}>
                    <TableRow>
                      <TableCell style={{backgroundColor:"#73C6B6"}} align="center" >Event Name</TableCell>
                      <TableCell style={{backgroundColor:"#73C6B6"}} align="center">Venue</TableCell>
                      <TableCell style={{backgroundColor:"#73C6B6"}} align="center">Date</TableCell>
                      <TableCell style={{backgroundColor:"#73C6B6"}} align="center">Time</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {event.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell align="center" >{row.name}</TableCell>
                        <TableCell align="center">{row.venue}</TableCell>
                        <TableCell align="center">{moment(row.start_time).format('MMMM Do YYYY')}</TableCell>
                        <TableCell align="center">{moment(row.start_time).format('h:mm a')}</TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer></center>
        </Paper>







  )
}