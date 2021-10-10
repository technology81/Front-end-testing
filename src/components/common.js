// mobile_number: Yup. string(). matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[ 0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            //  'Enter a valid mobile number').required("Required"),
            import React,{ useState, useEffect, useReducer } from 'react';
            import { useHistory } from 'react-router-dom';
            import 'date-fns';
            import DateFnsUtils from '@date-io/date-fns';
            import { Grid, Paper, TextField, Button } from '@material-ui/core';
            import imgl from './Helping_hands.jpeg';
            import { Formik, Form, Field, ErrorMessage } from 'formik';
            import * as Yup from 'yup';
            import axios from 'axios';
            import './help.css';
            import moment from 'moment';
            import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
            
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
            
            const Profile=()=>{
                const paperStyle={padding :'20px 20px',width:800, height:580, margin:"30px auto"}
                const headStyle={margin:0,fontFamily:'san-serif',color:'blue'}
                const btnstyle = { margin:'10px auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%'}
                const imgstyle={height:100,width:180}
                const dataInfo=JSON.parse(localStorage.getItem("myInfo"))
                const initialValues = {
                    fname: dataInfo.firstname,
                    lname: dataInfo.lastname,
                    email: dataInfo.email,
                    mobile_number: '',
                    dob: '',
                    about:'',
                    location:'',
                    gender:'',
                    address:'',
                }
               
                const [dob,setDob]=useState(null)
                const handleDateChange=(date)=>{
                    setDob(moment(date).format("YYYY-MM-DD"))
                }
             //const[gender,setGender]=useState('')
                const data=JSON.parse(localStorage.getItem("myInfo"))
                const id=data.id
                
                const [myprofile, setMyprofile] = useReducer(profileRegister, initialValues);
                const { email,mobile_number,about,location,address,gender } = myprofile;
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
                            alert("Profile Updated")
                            history.push('/home');
                        }
            
                    })
                    .catch((error) => {
                        if (error.response.status === 400) {
                            console.log(error.response.data.message);
                            alert("Error ")
            
                            
                        }
                        else
                            alert("Something went wrong")
                        console.log(error)
                    });
                    
                }
                    
                    const validationSchema = Yup.object().shape({
                        
                        mobile_number: Yup. string(). matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[ 0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                         'Enter a valid mobile number').required("Required"),
                         about: Yup.string().required("Required"),
                         //dob: Yup.date().required("Required"),
                         location: Yup.string().required("Required"),
                         address: Yup.string().required("Required"),
                       
                            })
                    
                    
                return(
                    <Grid>
                    <Paper elevation={20} style={paperStyle}>
                        <Grid align='center'>
                        <div>
                        <img src={imgl} style={imgstyle} alt=""/>
                        
                        </div>
                            <h2 style={headStyle}>Profile</h2>
                        </Grid>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {(props) => (
                                <Form>
                                <div class="container">
                               <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                            <Field as={TextField}  label='First Name' name="fname"   required/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field as={TextField}  label='Last Name' name="lname"   required />
                                    </Grid>
                                
                                    <Grid item xs={6}>
                                        <Field as={TextField} label='Email Id' name="email" value={email}
                                        onChange={(e) =>
                                          setMyprofile({
                                              type: 'field',
                                              fieldName: 'email',
                                              payload: e.currentTarget.value,
                                            })
                                          }
                                          required/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field as={TextField} label='Mobile Number' name="mobile_number" required value={mobile_number}
                                        onChange={(e) =>
                                          setMyprofile({
                                              type: 'field',
                                              fieldName: 'mobile_number',
                                              payload: e.currentTarget.value,
                                            })
                                          } helperText={<ErrorMessage name="mobile_number" />}/>
                                    </Grid>
                                    
                                    
                                    
                                    <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker format="yyyy/MM/dd" label="Date of birth" value={dob} name="dob"
                                    onChange={handleDateChange} />
                                    </MuiPickersUtilsProvider>
                                    
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field as={TextField} label='About volunteer'  name="about" required value={about} 
                                        onChange={(e) =>
                                          setMyprofile({
                                              type: 'field',
                                              fieldName: 'about',
                                              payload: e.currentTarget.value,
                                            })
                                          } helperText={<ErrorMessage name="about" />}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field as={TextField} label='Location' name="location" required value={location} 
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
                                        <Field as={TextField} label='Address' name="address" required fullWidth value={address}
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
                                        style={btnstyle}>Submit</Button>
                                    
                                </Form>
                            )}
                        </Formik>
                       
                    </Paper>
                </Grid>
            )
            
            }
                
            export default Profile;
            
                        