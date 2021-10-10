// import "./chart.css";
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Homebar from "./Homebar";
import Footer from './Footer';

import {Grid, Box, Card,Paper, CardContent,CardActionArea, Button, Typography,  makeStyles, ListItem, ListItemText} from '@material-ui/core';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label
} from "recharts";


import graph from './circlegraph.png';
const PaperStyle={ width:800 }
const useStyles = makeStyles({
  root: {
    // backgroundColor:"#F39C12",


  },
  card2:{
      // width:150,
      // height:180,
      // backgroundImage: `url(${graph})`,
      // opacity:'100%',
      // backgroundPosition:'center',
      color: "white",
       backgroundColor:"#9FE2BF",
       borderRadius: '25px'
      // backgroundSize:'cover',
      // backgroundRepeat:'no-repeat',


      },
      card1:{
      //   width:150,
      // height:180,
        // backgroundImage: `url(${graph})`,
        // opacity:'30%',
        // backgroundPosition:'center',
        color: "white",
        backgroundColor:"#FFBF00",
        borderRadius: '25px'
        // backgroundSize:'cover',
        // backgroundRepeat:'no-repeat',

        },
        card3:{
      //     width:150,
      // height:180,
          // backgroundImage: `url(${graph})`,
          // opacity:'30%',
          // backgroundPosition:'center',
          color: "white",
          backgroundColor:"#FF7F50",
          borderRadius: '25px'
          // backgroundSize:'cover',
          // backgroundRepeat:'no-repeat',

          },
          card4:{
            //     width:150,
            // height:180,
                // backgroundImage: `url(${graph})`,
                // opacity:'30%',
                // backgroundPosition:'center',
                color: "white",
                backgroundColor:"#6495ED",
                borderRadius: '25px'
                // backgroundSize:'cover',
                // backgroundRepeat:'no-repeat',

                },
  }
);

const data = [
  {
    name: "Event A",
    Registered: 12,
    Participated: 6,

  },
  {
    name: "Event B",
    Registered: 15,
    Participated: 9,

  },
  {
    name: "Event C",
    Registered: 8,
    Participated: 7,

  },
  {
    name: "Event D",
    Registered: 12,
    Participated: 9,

  },
  {
    name: "Event E",
    Registered: 16,
    Participated: 13,

  }
];

export default function Chart() {
  const classes = useStyles();
  const [count,setCount]=useState([])

    let future=true
    useEffect(()=>{
        axios.get('http://localhost:8081/account/leader/userAnalyticsCounts')
        .then(res=>{
            console.log(res)
            console.log(res.data)
            // console.log(response.data.Users )
            setCount(res.data)
        })
        .catch(err=>{
            console.log(err)

        })
    },[future]);
  return (
    <Box m={3}>
        <Homebar/>
        <center>
    <Grid container spacing={1} direction="row" margin="0px" padding="0px">
    <Grid item xs={6} margin="0px">

<BarChart
      width={500}
      height={350}
      data={data}
      marginTop={10}
      marginLeft={5}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />

      <YAxis>
      <Label angle={270} position='left' style={{ textAnchor: 'middle',fontSize: '90%', fill: 'skyblue' }} >
       Number of Volunteers
      </Label>
        </YAxis>
      <Tooltip />
      <Legend />
      <Bar dataKey="Participated" fill="#8884d8" />
      <Bar dataKey="Registered" fill="#ffc658" />
    </BarChart>

    </Grid>

    <Grid item xs={6}>
    <Grid container spacing={2} direction="row" >
        <Grid item xs={6}>
            <Card  className={classes.card1}>
            <CardActionArea>
                  <CardContent>

                    <ListItem alignItems='center'>

                      <ListItemText>
                      <center>
                      <Typography gutterBottom variant="h6" component="h1">
                      Total Events
                    </Typography>
                    <Typography gutterBottom variant="h2" component="h3">
                    5
                    </Typography>
                    </center>
                      </ListItemText>
                    </ListItem>

                  </CardContent>
                  </CardActionArea>
            </Card>

        </Grid>
        <Grid item xs={6}>
            <Card  className={classes.card2}>
            <CardActionArea>
                  <CardContent>

                    <ListItem alignItems='center'>

                      <ListItemText>
                      <center>
                      <Typography gutterBottom variant="h6" component="h1">
                       Hours spent
                    </Typography>
                    <Typography gutterBottom variant="h2" component="h3">
                    10
                    </Typography>
                    </center>
                      </ListItemText>
                    </ListItem>

                  </CardContent>
                  </CardActionArea>
            </Card>

        </Grid>
        <Grid item xs={6}>
            <Card  className={classes.card3}>
            <CardActionArea>
                  <CardContent>

                    <ListItem alignItems='center'>

                      <ListItemText>
                      <center>
                      <Typography gutterBottom variant="h6" component="h1">
                      Volunteers Registered
                    </Typography>
                    <Typography gutterBottom variant="h2" component="h3">
                    63
                    </Typography>
                    </center>
                      </ListItemText>
                    </ListItem>

                  </CardContent>
                  </CardActionArea>
            </Card>

        </Grid>
        <Grid item xs={6}>
            <Card  className={classes.card4}>
            <CardActionArea>
                  <CardContent>

                    <ListItem alignItems='center'>

                      <ListItemText>
                      <center>
                      <Typography gutterBottom variant="h6" component="h1">
                      Volunteers Participated
                    </Typography>
                    <Typography gutterBottom variant="h2" component="h3">
                    44
                    </Typography>
                    </center>
                      </ListItemText>
                    </ListItem>

                  </CardContent>
                  </CardActionArea>
            </Card>
    </Grid>
    </Grid>
    </Grid>

    </Grid>
    <Footer/>
    </center>
    </Box>
  );
}