import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, TextField, Button, Typography, Link, makeStyles, CardContent, Card, Box } from '@material-ui/core'
//import imgl from './Helping_hands.jpeg';
import { Formik , Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import Snack from './Snackbar';
import logo from './logobg.png';

// import background from './background.jpeg';
import background1 from './bg4.jpeg';
// import background2new from './background2new.jpeg';
// import wkndevnt1 from './explore.jpeg';

const Login = ({ handleChange }) => {

    const paperStyle = { padding: '30px 20px', width: 300, margin: "30px auto" }
    const headStyle = { margin: 0, fontFamily: 'san-serif', color: 'blue' }
    const gridStyle = { margin: '3px auto', padding: '5px auto' }
    const btnstyle = { margin: '8px 0', backgroundColor: '#F9261B' }
    const imgstyle = { height: 100, width: 180 }
    //  const [success,setSuccess]=useState(false);
    // const [mesg,setMesg]=useState('');
    const [notify, setNotify] = useState({ isOpen: false, mesg: '' });
    const initialValues = {
        email: '',
        password: '',
        remember: false
    }
    const useStyles = makeStyles({
        card: {
            height: '410px',
            backgroundImage: `url(${background1})`,
            opacity: '120%',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            //display:'flex'
            //filter:'brightness(260%)'
        }
        , grid: {
            width: "550px",
            height: "400px",
            position: 'center',
            borderRadius: '20px',
            marginTop : '30px' ,
//            marginRight: "20px",
            backgroundColor: '#f3f0ff'

        }
        , box: {
            alignItems: 'center',
            justify: 'center',
            direction: 'column',
            marginRight: '20px',
            //display:'flex',
            //marginLeft:'50%',
            //position:'absolute'
            borderRadius: '20px',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)',
            position: 'relative',
            overflow: 'hidden',
            borderSizing: 'border-box'
        }
        , buttonr: {

            borderRadius: '20px',
            border: '1px solid #FFFFFF',
            backgroundColor: "#ECE5E2",
            color: '#199bf1',
            //fontSize: '12px',
            fontWeight: 'bold',
            //padding: '12px 45px',
            letterSpacing: '1px',
            marginTop: '20px',
            '&:hover': {
                backgroundColor: "#9B8583 ",
            }

        }
        , buttons: {
            width: '115px',
            borderRadius: '20px',
            border: '1px solid #2E2EFE',
            backgroundColor: "#199bf1",
            color: '#FFFFFF',
            //fontSize: '12px',
            //fontWeight: 'bold',
            //padding: '12px 45px',
            letterSpacing: '1px',
            marginTop: '12px',
            '&:hover': {
                backgroundColor: "#5858FA",
            }

        }
    });
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Enter valid email").required("Required"),
        password: Yup.string().required("Required")
    })
    let history = useHistory();
    const onSubmit = (values, props) => {
        const user = {
            email: values.email,
            password: values.password
        }

        console.log(user)

        axios.post("http://localhost:8081/account/login", user)
            .then((response) => {
                var res = response.status;
                console.log(response.data)
                console.log(response.status)
                if (res === 200) {
                    const jwt = response.data
                    localStorage.setItem('myInfo', JSON.stringify(jwt));
                    const dataInfo = JSON.parse(localStorage.getItem("myInfo"))
                    console.log(dataInfo.email)
                    history.push('/apphome');
                }

            })
            .catch((error) => {
                if (error.response.status === 403) {
                    console.log(error.response.data);
                    //setSuccess(true);
                    // alert("Invalid email or Password ")
                    //
                    setNotify({
                        isOpen: true,
                        mesg: "Invalid Email or password"
                    })
                    props.resetForm()
                }
                else {
                    setNotify({
                        isOpen: true,
                        mesg: "Something went wrong"
                    })
                    // alert("Something went wrong")
                    //  setSuccess(true);
                    //  setMesg("Something went wrong!");
                    console.log(error)
                }
            });

        //   setSuccess(false);

    }

    //const classes = useStyles();
    const Register = () => {
        history.push('/SlideshowReg');
    };

    const classes = useStyles();



    return (

        <Box  >

            {/* <Box align="center">
                <img src={logo} alt="logo" width='200' height='150' />
            </Box> */}

            <Box ml={33} mr={30} align='right'>
                <Grid container spacing={3} align="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <Card style={{ minwidth: 200 }} className={classes.grid}>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={6} className={classes.card}>
                                        <br></br>
                                        <h3 style={{ color: "#ECE5E2", marginTop: '10px' }} >Join Us and Make Difference in Lives...</h3>
                                        <br></br>
                                        <p style={{ color: "#ECE5E2" }} >Not yet a member?</p>

                                        <p style={{ color: "#ECE5E2" }}>Sign up and discover what we can do for you</p>

                                        <center>
                                            <Button type='submit' variant="contained" className={classes.buttonr}
                                                onClick={Register}>Register</Button>
                                        </center>
                                    </Grid>
                                    <Grid item xs={6} className={classes.grid}>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <center>
                                            <Typography variant='h5' style={{ color: "#2E2EFE" }} >Login</Typography>
                                        </center>
                                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                            {(props) => (
                                                <Form>
                                                    <Field as={TextField} label='Email Id' name="email" value={props.values.email}
                                                        placeholder='Enter Email Id' fullWidth required error={props.errors.email && props.touched.email}
                                                        helperText={<ErrorMessage name="email" />} onChange={props.handleChange}
                                                    />
                                                    <Field as={TextField} label='Password' name="password" error={props.errors.password && props.touched.password}
                                                        placeholder='Enter password' type='password' fullWidth required value={props.values.password}
                                                        helperText={<ErrorMessage name="password" />} onChange={props.handleChange} />
                                                    <br></br>
                                                    <br></br>
                                                    <center>
                                                        <Button type='submit' variant="contained" disabled={props.isSubmitting}
                                                            className={classes.buttons} >{props.isSubmitting ? "Loading" : "Login"}</Button>
                                                    </center>
                                                </Form>
                                            )}
                                        </Formik>
                                        <br></br>
                                        {/* <center>
                                            <Typography >
                                                <Link href="#" style={{ color: "#2E2EFE" }}>
                                                    Forgot password ?
                                                </Link>
                                            </Typography>
                                        </center> */}

                                        {/* {success ?<Snack mesg={mesg}/>:''} */}
                                        <Snack
                                            notify={notify}
                                            setNotify={setNotify}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>





                </Grid>
                <Snack
                    notify={notify}
                    setNotify={setNotify}
                />
            </Box>


        </Box>

    )
}

export default Login