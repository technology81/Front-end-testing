import { React, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button, makeStyles, Box, Card, CardContent, Link } from '@material-ui/core';
import logo from './logobg.png';
import { Form, Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import background from './background.jpeg';
import background1 from './bg4.jpeg';

const Register = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    const headStyle = { margin: 0, fontFamily: 'san-serif', color: 'blue' }
    const marginTop = { margin: '8px 0' }
    const formStyle = { textAlign: 'center' }
    const [success, setSuccess] = useState(false);
    const [mesg, setMesg] = useState('');
    const [open, setOpen] = useState(false);



    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: ''
    }


    let history = useHistory();
    const onSubmit = (values, props) => {
        const user = {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password
        }

        console.log(user)
        axios.post("http://localhost:8081/account/register", user)
            .then((response) => {
                var res = response.status;
                console.log(response.data)
                console.log(response.status)
                if (res === 200) {
                    //alert("Registered successfully")
                    setSuccess(true);
                    setMesg(response.data.message);
                    setOpen(true);
                    // history.push('/');
                }

            })
            .catch((error) => {
                if (error.response.status === 400) {
                    console.log(error.response.data.message);
                    //  alert("Email already exist")
                    setOpen(true);
                    setMesg(error.response.data.message);
                    props.resetForm()
                }
                else {
                    //    alert("Something went wrong");
                    setOpen(true);
                    setMesg("Something went wrong");

                    console.log(error)
                }
            });

        // setSuccess(false);

    }
    const handleClose = (event, reason) => {
        if (success) {
            setOpen(false);
            history.push('/');
        }
        else {
            setOpen(false);

        }
    };
    const Login = () => {
        history.push('/');
    };

    const useStyles = makeStyles({
        card: {
            height: '410px',
            backgroundImage: `url(${background1})`,
            opacity: '120%',
            // marginTop : '30px' ,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }
        , grid: {
            width: "550px",
            height: "400px",
            position: 'center',
            borderRadius: '20px',
            marginTop : '20px' ,
            backgroundColor: '#f3f0ff'

        }

        , box: {
            alignItems: 'center',
            justify: 'center',
            direction: 'column',
            borderRadius: '20px',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)',
            position: 'relative',
            overflow: 'hidden',
            borderSizing: 'border-box',
        }
        , buttonr: {
                      width: '115px',
                      borderRadius: '20px',
                      border: '1px solid #FFFFFF',
                      backgroundColor: "#ECE5E2",
                      color: '#199bf1',
                      fontWeight: 'bold',
                      letterSpacing: '1px',
                      marginTop: '22px',
                      '&:hover': {
                          backgroundColor: "#9B8583 ",
                      }

        }
        , buttons: {
            borderRadius: '20px',
            border: '1px solid #2E2EFE',
            backgroundColor: "#199bf1",
            color: '#FFFFFF',
            //fontSize: '12px',
            //fontWeight: 'bold',
            //padding: '12px 45px',
            letterSpacing: '1px',
            marginTop: '20px',
            '&:hover': {
                backgroundColor: "#5858FA",
            }

        }
    });
    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            //.min(2, "Its too short")
            .required("Required"),
        lastname: Yup.string().required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        password: Yup.string()
            .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character")
            .required("Required"),
        confirmpassword: Yup.string().required("Please confirm your password")
            .when("password", {
                is: password => (password && password.length > 0 ? true : false),
                then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match")
            })
    }
    )

    const classes = useStyles();



    return (

        <Box  >

            <Box ml={33} mr={30} align='right ' >
                <Grid container spacing={3} align="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <Card style={{ minwidth: 200 }} className={classes.grid}>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={6} className={classes.card}>
                                        <br></br>
                                        <h3 style={{ color: "#ECE5E2", marginTop: '20px' }} >Join Us and Make Difference in Lives...</h3>
                                        <br></br>
                                        <p style={{ color: "#ECE5E2" }} >Already a member?</p>

                                        <p style={{ color: "#ECE5E2" }}>Sign in and see what's new since your last visit</p>
                                        <br />
                                        <center>
                                            <Button type='submit' variant="contained"  className={classes.buttonr}
                                                onClick={Login}>Login</Button>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6} className={classes.grid}>
                                        <center>
                                            <Typography variant='h5' style={{ color: "#2E2EFE" }} >Register</Typography>
                                        </center>
                                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                            {(props) => (
                                                <Form>
                                                    <Field as={TextField} fullWidth label='First Name' name='firstname' value={props.values.firstname}
                                                        required error={props.errors.firstname && props.touched.firstname}
                                                        onChange={props.handleChange} helperText={<ErrorMessage name='firstname' />} />
                                                    <Field as={TextField} fullWidth label='Last Name' name='lastname' required error={props.errors.lastname && props.touched.lastname}
                                                        value={props.values.lastname} onChange={props.handleChange} helperText={<ErrorMessage name='lastname' />} />
                                                    <Field as={TextField} fullWidth label='Email Id' type='email' required error={props.errors.email && props.touched.email}
                                                        name='email' value={props.values.email} onChange={props.handleChange} helperText={<ErrorMessage name='email' />} />
                                                    <Field as={TextField} fullWidth label='Password' type='password' required error={props.errors.password && props.touched.password}
                                                        value={props.values.password} onChange={props.handleChange} name='password' helperText={<ErrorMessage name='password' />} />
                                                    <Field as={TextField} fullWidth label='Confirm Password' type='password' required error={props.errors.confirmpassword && props.touched.confirmpassword}
                                                        value={props.values.confirmpassword} onChange={props.handleChange} name='confirmpassword' helperText={<ErrorMessage name='confirmpassword' />} />
                                                    {/* <Button type='submit' variant='contained' color='primary' style={marginTop} align='center'>Register</Button> */}
                                                    <center>
                                                        <Button type='submit' variant="contained" disabled={props.isSubmitting}
                                                            className={classes.buttons} >{props.isSubmitting ? "Loading" : "Register"}</Button>
                                                    </center>
                                                </Form>
                                            )}
                                        </Formik>
                                        <Snackbar
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
                                        <br></br>




                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>





                </Grid>

            </Box>


        </Box>

    )
}

export default Register