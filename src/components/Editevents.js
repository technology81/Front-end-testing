import React, { useState, useEffect, useReducer, Fragment } from 'react';
import { Grid, Paper, Box, Button, Card, CardContent, Select, NativeSelect, MenuItem, InputLabel, FormControl, FormHelperText, Tooltip, Typography, TextField, AppBar, IconButton, Toolbar, makeStyles } from '@material-ui/core';
import { ArrowBack, Home, Menu } from '@material-ui/icons';
import { Formik, Form, Field, ErrorMesage } from 'formik';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Homebar from "./Homebar";
import Footer from './Footer';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import Snack from './Snackbar';
//import Dropdown from 'react-dropdown';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import es from 'date-fns/locale/es';
import moment from 'moment';
import axios from 'axios';

function editPage(edit, action) {
  const dataInfo = JSON.parse(localStorage.getItem("myEdit"))
  // const info=JSON.parse(localStorage.getItem("myInfo"))

  switch (action.type) {
    case 'field': {
      return {
        ...edit,
        [action.fieldName]: action.payload,
      };
    }

    case 'success': {
      return {
        event_id: dataInfo.event_id,
        name: dataInfo.name,
        event_type: "Weekend event",
        description: dataInfo.description,
        venue: dataInfo.venue,
        start_time: moment(dataInfo.start_time).format("YYYY-MM-DDThh:mm"),
        end_time: moment(dataInfo.end_time).format("YYYY-MM-DDThh:mm"),


      };
    }
    case 'error': {
      return {
        ...edit,

      };
    }

    default:
      return edit;
  }
}
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
const EditEvents = (props) => {
  // const paperStyle = { padding: '10px 25px', height: 'auto', width: 'auto', margin: '20px 25px', border: ' black' }
  // const gridStyle = { margin: 'auto auto', padding: 'auto auto' }
  // const headStyle = { margin: '0', fontFamily: 'sans-serif', color: '#8A2BE2' }
  // const btnStyle = { margin: '15px 15px' }
  // const logoStyle = { height: 98, width: 128 }
  // const iconStyle = {height:45, width:45}
  // const dataEvent1=JSON.parse(localStorage.getItem("myEvent"))
  const dataInfo1 = JSON.parse(localStorage.getItem("myEdit"))
  const marginTop = { marginTop: '10px', marginBottom: '8px', width: '100px' }
  const initialValues = {
    event_id: " ",
    name: " ",
    event_type: "Weekend event",
    description: " ",
    venue: " ",
    start_time: " ",
    end_time: " "
  }
  const [notify, setNotify] = React.useState({ isOpen: false, mesg: '' });
  const [wevent, setWevent] = useState([])
  const [edit, setEdit] = useReducer(editPage, initialValues);
  const { event_id, name, venue, description, start_time, end_time, event_type } = edit;
  const event = "Weekend event"
  const [eventId, setEventId] = React.useState();
  const { editp, setEditp } = props;
  const formStyle = { textAlign: 'center' }
  //const future=true
  const handleClose = () => {
    setEditp({
      openEdit: false
    });

  };
  React.useEffect(() => {
    axios.get('http://localhost:8081/account/events/getEventsList/true/Weekend event')
      //('http://localhost:8081/account/events/getEvents/'.concat('/isFutureEvent').concat('event'))
      //(`http://localhost:8081/account/events/getEventsList/isFutureEvent${future}/eventTypes${event}`)
      .then(response => {
        console.log(response)
        console.log(response.data[0].event_id)
        setWevent(response.data)

      })
      .catch(err => {
        console.log(err)


      })
  }, [event])

  const handleChange = (event) => {
    // setEventName(event.target.value);
    const evid = event.target.value;
    localStorage.setItem('editeventId', JSON.stringify(evid));
    const editid = JSON.parse(localStorage.getItem("editeventId"));
    axios.get(`http://localhost:8081/account/events/${editid}`)
      .then(response => {
        console.log(response)
        console.log(response.data);
        const pro = response.data
        localStorage.setItem('myEdit', JSON.stringify(pro))
        setEdit({ type: 'success' })

      })
      .catch(err => {
        console.log(err)
        setEdit({ type: 'error' })


      })
  };




  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {

      event_id,
      name,
      event_type,
      description,
      venue,
      start_time,
      end_time
    }

    axios.post("http://localhost:8081/account/admin/updateEvents", user)
      .then((response) => {
        var res = response.status;

        console.log(response.status)
        if (res === 200) {
          setNotify({
            isOpen: true,
            mesg: "Saved Changes Successfully!"
          })

          // history.push('/apphome');
          // setSuccess(true);
          // setMesg("Profile Updated!");
          // setOpen(true);
        }

      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log(error.response.data.message);
          setNotify({
            isOpen: true,
            mesg: "Something Went Wrong!"
          })
          // setOpen(true);
          // setMesg(error.response.data.message);


        }
        else {
          setNotify({
            isOpen: true,
            mesg: "Something Went Wrong!"
          })
          //    setOpen(true);
          //     setMesg("Something went wrong");}
          console.log(error)
        }
      });
  }


  // const options = [
  //     { value: 'weekendevents', label: 'Weekend Events' },
  //     { value: 'webinarforNGOs', label: 'Webinar for NGOs' },
  //     { value: 'foodforthought', label: 'Food for Thought' },
  //     { value: 'artsandcraft', label: 'Arts & Craft' },
  //   ];
  //   const dataEvent=JSON.parse(localStorage.getItem("myEvent"))
  // console.log(dataEvent)
  // console.log(dataEvent[0].name)

  // const classes = useStyles();

  return (

    <Fragment>
      <Dialog
        // fullWidth={true}
        width='xl'
        
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >    <center>
          <DialogTitle id="past-event-dialog-title">Edit Events</DialogTitle>
          {/* <Paper elevation={20} style={paperStyle}> */}</center>
        <DialogContent >


          <Grid  >
            {/* <Paper style={paperStyle} elevation={2}> */}

            {/* <Box ml={3} mb={3} mt={4}> */}
            {/* <FormControl alignItems="center" variant="outlined" style={{ minWidth: 200, height: 80 }}>
                <InputLabel id="demo-simple-select-outlined-label">Event Name</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-event-name"
                  label="Event Name"
                  value={eventId}
                  onChange={handleChange}

                  MenuProps={MenuProps}
                >
                  {wevent.map((eve) => (
                    <MenuItem key={eve.event_id} value={eve.event_id} >
                      {eve.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Find event by type</FormHelperText> */}
            {/* <br />
              </FormControl> */}
            {/* </Box> */}
            <Box>
              <Grid container style={{ width: '200' }} >
                {/* {wevent.map((post)=>( */}
                <Grid item xs={12} >
                  {/* <Card  style={{width:'800'}}> */}

                  {/* <CardContent style={{ textAlign: "center" }}> */}

                  {/* <Grid container spacing={2}> */}
                  <Grid >
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                      {(props) => (
                        <Form style={formStyle}>
                          {/* <div class="container"> */}
                          <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <FormControl alignItems="center" variant="outlined" style={{ minWidth: 200, height: 80 }}>
                              <InputLabel id="demo-simple-select-outlined-label">Event Name</InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-event-name"
                                label="Event Name"
                                value={eventId}
                                onChange={handleChange}

                                MenuProps={MenuProps}
                              >
                                {wevent.map((eve) => (
                                  <MenuItem key={eve.event_id} value={eve.event_id} >
                                    {eve.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              {/* <FormHelperText>Find event by name</FormHelperText> */}
                              </FormControl></Grid>
                              <Grid item xs={6}>
                                <Field as={TextField} variant="outlined" label='Event name' disabled value={name} name="name" required style={{ marginLeft: '-20px' }} />
                              </Grid>
                              <Grid item xs={6}>
                                <Field as={TextField} variant="outlined" label='Event id' name="event_id" disabled value={event_id} required />
                              </Grid>

                              <Grid item xs={6}>
                                <Field as={TextField} variant="outlined" label='Venue' name="venue" onInput={props.handleChange} value={venue} style={{ marginLeft: '-20px' }}
                                  onChange={e =>
                                    setEdit({
                                      type: 'field',
                                      fieldName: 'venue',
                                      payload: e.currentTarget.value,
                                    })

                                  }
                                  required />
                              </Grid>
                              <Grid item xs={6}>
                                <Field as={TextField} variant="outlined" label="Start time" name='start_time' value={start_time}  style={{ marginLeft: '30px' }}
                                  type="datetime-local"
                                  defaultValue="2021-08-24T10:30" min="2021-08-24"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  required placeholder="Start_time"
                                  onInput={props.handleChange}
                                  onChange={(e) => {
                                    console.log(e.target.value)
                                    setEdit({
                                      type: 'field',
                                      fieldName: 'start_time',
                                      payload: e.target.value,
                                    })
                                  }}


                                />
                              </Grid>

                              <Grid item xs={6}>
                                <Field as={TextField} variant="outlined" label="End time" name='end_time' value={end_time} style={{ marginLeft: '20px' }}
                                  type="datetime-local"
                                  defaultValue="2021-08-24T10:30" min="2021-08-24"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  required placeholder="end Time"
                                  onInput={props.handleChange}
                                  onChange={(e) => {
                                    console.log(e.target.value)
                                    setEdit({
                                      type: 'field',
                                      fieldName: 'end_time',

                                      payload: e.target.value,
                                    })
                                  }
                                  }


                                />
                              </Grid>


                              <Grid item xs={12}>
                                <Field as={TextField} variant="outlined" label='Description' name="description" required value={description} style={{ marginLeft: '15px', width: '500px' }}
                                  required onInput={props.handleChange}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(e) =>
                                    setEdit({
                                      type: 'field',
                                      fieldName: 'description',
                                      payload: e.currentTarget.value,
                                    })}
                                />
                              </Grid>



                                  </Grid>
                            {/* </div> */}

                            <Box ml={30}>
                              <Button type='submit' color='primary' disabled={props.isSubmitting}
                                style={marginTop} onClick={onSubmit}>{props.isSubmitting ? "Loading" : "Edit"}</Button>
                              <Button onClick={handleClose} color="primary" >
                                Close
                              </Button>
                            </Box>
                              </Form>
                            )}
                          </Formik>
                        {/* </Grid> */}
                      </Grid>

                    {/* </CardContent>

                  </Card> */}
                  </Grid>

                  {/* ))} */}

                </Grid>
            </Box>
              {/* </Paper> */}
              <Snack
                notify={notify}
                setNotify={setNotify}
              />
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>


      )
}


      export default EditEvents;