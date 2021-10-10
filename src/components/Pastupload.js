import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Grid, Box, IconButton, Tooltip } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import PublishSharpIcon from '@material-ui/icons/PublishSharp';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Snack from './Snackbar';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',

  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,

  },
  formControlLabel: {
    marginTop: theme.spacing(1),
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

export default function Pastupload(props) {
  const [notify,setNotify]=React.useState({isOpen:false,mesg:''});
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);
  const classes = useStyles();
  // const [open, setOpen] = React.useState(true);
  const [eventName, setEventName] = React.useState();
  const event = 'past';
  const [pevent, setPevent] = React.useState([])
  const { past, setPast } = props;
  const hiddenFileInput = React.useRef(null);
  // const evid=null;
  React.useEffect(() => {
    axios.get('http://localhost:8081/account/events/getEventsList/false/Weekend event')

      .then(res => {
        console.log(res)
        console.log(res.data[0].event_id)
        setPevent(res.data)

      })
      .catch(err => {
        console.log(err)

      })
  }, [event])
  const handleChange = (event) => {
    // setEventName(event.target.value);
    const evid=event.target.value;
    localStorage.setItem('eventId', JSON.stringify(evid));


  };


  const handleClose = () => {
    setPast({
      isOp: false
    });
    setFileName(null);
  };
  // React.useEffect(() => {
  //   if (!(past.isOpen)) {
  //     setEventName(eventName);
  //   }
  // }, [eventName, past.isOpen]);


  const handleSubmit = () => {
    // setPast({

    //   isOpen: false
    // });



    const fd = new FormData();
    const file = JSON.parse(localStorage.getItem("files"));
    fd.append('file', selectedFile);
    console.log({selectedFile})
    // console.log({fileName})
    const dataId = JSON.parse(localStorage.getItem("eventId"));

    const config={headers:{
      'content-type':'multipart/form-data'
    }}
    console.log(dataId );
    // axios.post(`http://localhost:8081/account/admin/addImage/${dataId}`,fd,{
    //   headers:{
    //  "Content-Type":"multipart/form-data"}
    // })
    axios({
      url:`http://localhost:8081/account/admin/addImage/${dataId}`,
      method:'post',
      data:fd,
      config
    })
    .then(res => {
      console.log(res)
      if (res.status === 200) {
        // alert("Remainders sent successfully")
        setNotify({
                  isOpen:true,
                  mesg:"Image Added successfully!"
              })
              setFileName(null);
      }

    })
    .catch(err => {
      console.log(err)
      setNotify({
        isOpen:true,
        mesg:"Something went wrong!"
    })

    })


  };


  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    localStorage.setItem('files', JSON.stringify(event.target.files[0]));
    setFileName(event.target.files[0].name);
    console.log({fileName})
  }
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  return (
    <React.Fragment>

      <Dialog
        fullWidth={true}

        open={past.isOp}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="past-event-dialog-title">Upload Past Event Photos</DialogTitle>
        <DialogContent>
         
          <Grid
          container
          direction="row"
          // justifyContent="center"
          alignItems="center"
        >
          <FormControl className={classes.formControl}>

            <InputLabel id="demo-event-name-label">Event Name</InputLabel>
            <Select
              labelId="demo-event-name-label"
              id="demo-event-name"

              value={eventName}
              onChange={handleChange}

              MenuProps={MenuProps}
            >
              {pevent.map((eve) => (
                <MenuItem key={eve.event_id} value={eve.event_id} >
                  {eve.name}
                </MenuItem>
              ))}
            </Select>


          </FormControl>
          {/* </Grid> 
          <Grid item xs> */}
          {/* <input type="file" onChange={fileSelectedHandler} />   </Grid>  </Grid> */}
          <Button onClick={handleClick}  color="primary" variant="contained" style={{marginLeft:100,marginTop:25}}>Upload Image<PublishSharpIcon/></Button>
          &nbsp;&nbsp;{fileName}
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={fileSelectedHandler}
            style={{ display: 'none' }} /></Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
        <Snack
              notify={notify}
              setNotify={setNotify}
              />
      </Dialog>



    </React.Fragment>

  );
}