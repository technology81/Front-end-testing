import React,{ useState, useEffect, useReducer,Fragment} from 'react';
import { useHistory } from 'react-router-dom';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import 'date-fns';
//import DateFnsUtils from '@date-io/date-fns';
import { Grid, Paper, TextField, Button,Typography } from '@material-ui/core';
import imgl from './logo.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './help.css';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
//import moment from 'moment';
//import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Homebar from "./Homebar";
import Footer from "./Footer";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import '../App.css';
function profileRegister(myprofile, action) {
    const dataProfile=JSON.parse(localStorage.getItem("myProfile"))
    const info=JSON.parse(localStorage.getItem("myInfo"))

    switch (action.type) {
        case 'field': {
            return {
              ...myprofile,
              [action.fieldName]: action.payload,
            };
          }
          // case 'gender': {
          //   return {
          //     ...myprofile,
          //     [action.fieldName]: action.payload,
          //   };
          // }
      case 'success': {
        return {
        fname: info.firstname,
        lname: info.lastname,
        email: info.email,
        mobile_number: dataProfile.mobile_number,
        dob:dataProfile.dob,
        about:dataProfile.about,
        location:dataProfile.location,
        gender:dataProfile.gender,
        address:dataProfile.address,


        };
      }
      case 'error': {
        return {
          ...myprofile,

        };
      }

      default:
        return myprofile;
    }
  }
  const useStyles=makeStyles(theme=>({
  root:{
    top:theme.spacing(9)
  }
}
  ))

const Profile=()=>{
    const paperStyle={padding :'20px 20px',width:800, height:550, margin:"30px auto"}
    const headStyle={margin:0,fontFamily:'san-serif',color:'blue'}
    const btnstyle = { margin:'10px auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%'}
    const imgstyle={height:100,width:180}
    const gridStyle={backgroundColor: '#Faf0e6',height:630 ,margin:"0px 0px",padding :'0px 0px'}
    const dataInfo=JSON.parse(localStorage.getItem("myInfo"))
    const classes=useStyles();
    const initialValues = {
        fname: dataInfo.firstname,
        lname: dataInfo.lastname,
        email: dataInfo.email,
        mobile_number: '',
        dob: {Date},
        about:'',
        location:'',
        gender:'',
        address:'',
    }

    // const [dob,setDob]=useState(null)
    // const handleDateChange=(date)=>{
    //     setDob(moment(date).format("YYYY-MM-DD"))
    // }
 //const[gender,setGender]=useState('')
    const data=JSON.parse(localStorage.getItem("myInfo"))
    const id=data.id

    const [myprofile, setMyprofile] = useReducer(profileRegister, initialValues);
    const { email,mobile_number,about,location,address,gender,dob } = myprofile;
    const [success,setSuccess]=useState(false);
    const [mesg,setMesg]=useState('');
    const [open, setOpen] =useState(false);
    useEffect(()=>{

        axios.get(`http://localhost:8081/account/getProfile/${id}`)
        .then(res=>{
            console.log(res)
            const pro=res.data
           localStorage.setItem('myProfile',JSON.stringify(pro))
           setMyprofile({ type: 'success' })
        })
        .catch(err=>{
            console.log(err)
            setMyprofile({ type: 'error' })

        })
    },[id])

    let history = useHistory();
    const onSubmit = async (e) => {
        e.preventDefault();
        const user = {

            email,
            mobile_number,
            dob,
            about,
            gender,
            location,
            address
        };

        console.log(user)
        axios.post("http://localhost:8081/account/saveProfile", user)
        .then((response) => {
            var res = response.status;

            console.log(response.status)
            if (res === 200) {
                // alert("Profile Updated")
                // history.push('/apphome');
                    setSuccess(true);
                    setMesg("Profile Updated!");
                    setOpen(true);
            }

        })
        .catch((error) => {
            if (error.response.status === 400) {
                console.log(error.response.data.message);
                // alert("Error ")
                    setOpen(true);
                    setMesg(error.response.data.message);


            }
            else{
                // alert("Something went wrong")
                   setOpen(true);
                    setMesg("Something went wrong");}
            console.log(error)
        });

    }
    const handleClose = (event, reason) => {
      if(success)
      {
          setOpen(false);
          history.push('/apphome');
      }
      else{
          setOpen(false);

      }
  };

        const validationSchema = Yup.object().shape({

             mobile_number: Yup.string()
               //.matches(/^\+(?:[0-9] ?){6,14}[0-9]$/,"Enter a valid number").required("Required"),
           //.matches(/^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
               .matches(/^[7-9]\d{9}$/
              ,"Enter valid phone number") .required("Required"),
             about: Yup.string().required("Required"),
             dob: Yup.date().required("Required"),
             location: Yup.string().required("Required"),
             address: Yup.string().required("Required"),

                })

                const info1=JSON.parse(localStorage.getItem("myInfo"))
    return(
        <Grid style={gridStyle}>
        <Homebar/>

        <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
            {/* <div>
            <img src={imgl} style={imgstyle} alt=""/>

            </div> */}
                <Typography variant='h6' color="textSecondary" align="center">Profile</Typography>
            </Grid>
            <br/>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(props) => (
                    <Form>
                    <div class="container">
                   <Grid container spacing={2}>
                        <Grid item xs={6}>
                                <Field as={TextField} variant='outlined' label='First Name' name="fname" disabled value={info1.firstname}  required/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field as={TextField} variant='outlined' label='Last Name' name="lname" disabled value={info1.lastname}  required />
                        </Grid>

                        <Grid item xs={6}>
                            <Field as={TextField} variant='outlined' label='Email Id' name="email" disabled value={info1.email}

                              required/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field as={TextField} variant='outlined' label='Mobile Number' name="mobile_number" required  value={mobile_number}
                            error={props.errors.mobile_number && props.touched.mobile_number} onInput={props.handleChange}
                            pattern="[789]{1}[0-9]{9}"
                            onChange={e=>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'mobile_number',
                                  payload: e.currentTarget.value,
                                })

                              }
                              helperText={<ErrorMessage name="mobile_number" />}/>
                        </Grid>



                        <Grid item xs={6}>
                        <DatePickerComponent name="dob" value={dob} format="yyyy/MM/dd"
                        placeholder="Date of Birth" width="180px" required
                        error={props.errors.dob && props.touched.dob}  onInput={props.handleChange}
                        onChange={(e) =>
                          {console.log(e.target.value)
                          setMyprofile({
                              type: 'field',
                              fieldName: 'dob',

                              payload: e.target.value,
                            })
                         } }>
                        </DatePickerComponent>

                        </Grid>
                        <Grid item xs={6}>
                            <Field as={TextField} variant='outlined' label='About volunteer'  name="about" required value={about}
                            error={props.errors.about && props.touched.about}  onInput={props.handleChange}
                            onChange={(e) =>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'about',
                                  payload: e.currentTarget.value,
                                })
                              } helperText={<ErrorMessage name="about" />}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Field as={TextField} variant='outlined' label='Location' name="location" required value={location}
                            error={props.errors.location && props.touched.location}   onInput={props.handleChange}
                            onChange={(e) =>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'location',
                                  payload: e.currentTarget.value,
                                })
                              } helperText={<ErrorMessage name="location" />}/>
                        </Grid>
                        <Grid item xs={6}>
                            <label>Gender</label><br></br>
                            <input type="radio" label="Male"checked={gender==="Male"} value="Male"  name="gender"

                            onChange={(e) =>
                              setMyprofile({
                                type: 'field',
                                fieldName: 'gender',
                                payload: e.currentTarget.value,
                              })
                            } />Male
                            <input type="radio" label="Female"checked={gender==="Female"} value="Female" value="Female"
                            onChange={(e) =>
                              setMyprofile({
                                type: 'field',
                                fieldName: 'gender',
                                payload: e.currentTarget.value,
                              })
                            } />Female
                        </Grid>
                        <Grid item xs={12}>
                            <Field as={TextField} variant='outlined' label='Address' name="address" required fullWidth value={address}
                            error={props.errors.address && props.touched.address} required   onInput={props.handleChange}
                            onChange={(e) =>
                              setMyprofile({
                                  type: 'field',
                                  fieldName: 'address',
                                  payload: e.currentTarget.value,
                                })
                              } helperText={<ErrorMessage name="address" />}/>
                        </Grid>



                        </Grid>
                        </div>
                        <Button type='submit' color='primary' variant="contained" onClick={onSubmit}
                            style={btnstyle} disabled={props.isSubmitting}
                            fullWidth>{props.isSubmitting ? "Loading" : "Submit"}</Button>

                    </Form>
                )}
            </Formik>

        </Paper>
        <Snackbar
        className={classes.root}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={mesg}
        action={
          <Fragment>

            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
        />

        <Footer/>
    </Grid>
)

}
    
export default Profile;