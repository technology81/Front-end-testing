import {React,useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, TextField, Button, Typography, Link } from '@material-ui/core'
//import imgl from './Helping_hands.jpeg';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
//import home from './home';
import logo from './logo.jpg';
import Snack from './Snackbar';


const Login = ({ handleChange }) => {

    const paperStyle={padding :'30px 20px',width:300, margin:"30px auto"}
    const headStyle={margin:0,fontFamily:'san-serif',color:'blue'}
    const btnstyle = { margin: '8px 0' }
    const imgstyle={height:100,width:180}
    //  const [success,setSuccess]=useState(false);
    // const [mesg,setMesg]=useState('');
    const [notify,setNotify]=useState({isOpen:false,mesg:''});
    const initialValues = {
        email: '',
        password: '',
        remember: false
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Enter valid email").required("Required"),
        password: Yup.string().required("Required")
    })
    let history = useHistory();
    const onSubmit = (values, props) => {
        const user={
           email:values.email,
           password:values.password  }
           
           console.log(user)
        
        axios.post("http://localhost:8081/account/login", user)
        .then((response) => {
            var res = response.status;
            console.log(response.data)
            console.log(response.status)
            if (res === 200) {
                const jwt=response.data
                localStorage.setItem('myInfo',JSON.stringify(jwt));
                const dataInfo=JSON.parse(localStorage.getItem("myInfo"))
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
                    isOpen:true,
                    mesg:"Invalid Email or password"
                })
                props.resetForm()
            }
            else{
                setNotify({
                    isOpen:true,
                    mesg:"Something went wrong"
                })
                // alert("Something went wrong")
            //  setSuccess(true);
            //  setMesg("Something went wrong!");
            console.log(error)
        }});
        
        //   setSuccess(false);
          
    }
            
    

      
    
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                <div>
                <img src={logo} style={imgstyle} alt=""/>
                
                </div>
                    <h2 style={headStyle}>Login</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} label='Email Id' name="email" value={props.values.email}
                                placeholder='Enter Email Id' fullWidth required error={props.errors.email && props.touched.email}
                                helperText={<ErrorMessage name="email" /> } onChange={props.handleChange}
                            />
                            <Field as={TextField} label='Password' name="password" error={props.errors.password && props.touched.password}
                                placeholder='Enter password' type='password' fullWidth required value={props.values.password}
                                helperText={<ErrorMessage name="password" />} onChange={props.handleChange}/>
                            
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Login"}</Button>

                        </Form>
                    )}
                </Formik>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     {/*<Link href="Register" onClick={() => handleChange("event", 1)} >
                        Sign Up
                            </Link>*/}
                <a href="Register">Signup</a>
                </Typography>
            </Paper>
            {/* {success ?<Snack mesg={mesg}/>:''} */}
            <Snack
              notify={notify}
              setNotify={setNotify}
              />
           
        </Grid>
    )
}

export default Login