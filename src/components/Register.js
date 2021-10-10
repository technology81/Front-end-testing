import {React,useState,Fragment} from 'react';
 import { useHistory } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import logo from './logo.jpg';
import { Form, Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const Register = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    const headStyle = { margin: 0, fontFamily: 'san-serif', color: 'blue' }
    const marginTop = { margin:'8px 0' }
    const formStyle = { textAlign: 'center' }
    const [success,setSuccess]=useState(false);
    const [mesg,setMesg]=useState('');
    const [open, setOpen] =useState(false);

    /*const [state, setState] = React.useState({
        open: true,
        vertical: 'bottom',
        horizontal: 'center',
      });
    
      const { vertical, horizontal, open } = state;
      const handleClose = () => {
        setState({ ...state, open: false });
      };*/
    
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
                else{
            //    alert("Something went wrong");
                    setOpen(true);
                    setMesg("Something went wrong");

                console.log(error)}
            });

            // setSuccess(false);

    }
    const handleClose = (event, reason) => {
        if(success)
        {
            setOpen(false);
            history.push('/');
        }
        else{
            setOpen(false);
            
        }
    };

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
    return (

        <Grid >
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>

                    <Grid>
                        <img src={logo} alt="logo" width='180' height='100' />
                    </Grid>
                    <h2 style={headStyle} >
                        Register
                    </h2>
                    <Typography variant='caption'>
                        Please fill this form to create an account!
                    </Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form style={formStyle}>

                            <Field as={TextField} fullWidth label='First Name' name='firstname' value={props.values.firstname}
                                required error={props.errors.firstname && props.touched.firstname}
                                onChange={props.handleChange} helperText={<ErrorMessage name='firstname' />} />
                            <Field as={TextField} fullWidth label='Last Name' name='lastname' required error={props.errors.lastname && props.touched.lastname}
                                value={props.values.lastname} onChange={props.handleChange} helperText={<ErrorMessage name='lastname' />} />
                            <Field as={TextField} fullWidth label='Email' type='email' required error={props.errors.email && props.touched.email}
                                name='email' value={props.values.email} onChange={props.handleChange} helperText={<ErrorMessage name='email' />} />
                            <Field as={TextField} fullWidth label='Password' type='password' required error={props.errors.password && props.touched.password}
                                value={props.values.password} onChange={props.handleChange} name='password' helperText={<ErrorMessage name='password' />} />
                            <Field as={TextField} fullWidth label='Confirm Password'type='password' required error={props.errors.confirmpassword && props.touched.confirmpassword}
                                value={props.values.confirmpassword} onChange={props.handleChange} name='confirmpassword' helperText={<ErrorMessage name='confirmpassword' />} />
                            {/* <Button type='submit' variant='contained' color='primary' style={marginTop} align='center'>Register</Button> */}
                            
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={marginTop} fullWidth>{props.isSubmitting ? "Loading" : "Register"}</Button>

                        </Form>
                    )}
                </Formik>
            </Paper>
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

        </Grid>

    );

}

export default Register;