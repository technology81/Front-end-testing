import './slideshow.css';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import { Carousel } from 'react-bootstrap';
import { blueGrey } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Footer from './Footer';
import SignIn from './Signin';
import SignUp from './Signup';
//import SignContainer from './SignInUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import cs1 from './cs1.jpg';
import cs2 from './cs2.jpg';
import cs3 from './cs3.jpg';

const useStyles = makeStyles({

  card: {
    paddingTop: '5px',
    height: '300px',
    width: '1180px',
//    margin: 'auto',
    marginLeft: "40px",
      marginRight: "40px",
    backgroundColor: "#E5E7E9",

    '&:hover': {
      backgroundColor: "#AEB6BF",
    }
  },
});

function SlideshowReg(){


  const classes = useStyles();

  const [index, setIndex] = useState(0);


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="Slideshow">
      <Navbar />

      <br />
      <Grid container className={classes.root} spacing={3}>
      <Grid item xs={4}>
        <Carousel fade activeIndex={index} onSelect={handleSelect} >
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src={cs1}
              alt="Waste Collection"
            />
            <Carousel.Caption>
              <h3>Waste Collection Program</h3>

            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src={cs3}
              alt="Food Distribution Event"
            />
            <Carousel.Caption>
              <h3>Food Distribution Event</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src={cs2}
              alt="Clean Environment"
            />
            <Carousel.Caption>
              <h3>Clean Environment Program</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

      </Grid>
      {/* <br />
        <br /> */}

      <Grid item xs={4}>
        <SignUp />
      </Grid>
      </Grid>


      <br />
      <br />

      <Card style={{ marginTop: '30px' ,marginRight:"10px",padding:'10px',borderRadius:'20px'}} className={classes.card}>
        <Grid container spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <CardContent>

            <Typography component="div">
              <Box fontFamily="Display" fontSize="h4.fontSize" style={{ color: "#11052C" }}>
                About Volunteering
              </Box>

              <Box fontFamily="cursive" style={{ color: "orange" }}>
                <i><b>Making differences in lives...</b></i>
              </Box>

              <br />
              <p>
                Offering a variety of volunteer opportunities is one way to ensure that employees or community members find at least one thing in which they’d feel comfortable participating. People choose to volunteer for a variety of reasons. For some it offers the chance to give something back to the community or make a difference to the people around them. For others it provides an opportunity to develop new skills
                or build on existing experience and knowledge.

                <br />

                Volunteering allows you to connect to your community and make it a better place. ... And volunteering is a two-way street: It can benefit you and your family as much as the cause you choose to help. Dedicating your time as a volunteer helps you make new friends, expand your network, and boost your social skills.
              </p>


            </Typography>

          </CardContent>

        </Grid>


      </Card>
      <br />
      <Footer />
      <Button>Learn More</Button>
    </div>

  );
}

export default SlideshowReg;