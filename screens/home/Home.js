import { React, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import Header from '../../common/header/Header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Home.css';
import Button from '@material-ui/core/Button';
import DoctorList from '../doctorList/DoctorList';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        fullwidth: "true"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    paperDoctor: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(2),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },       
    },
    typographyStyle: {
        fontSize: "1.5rem",
        fontFamily:"Roboto",
        fontWeight:"400",
        lineHeight: 1.5
    }
}));
const Home = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, value) => {
        setValue(value);
    };
   
    const [loggedInFlag, setLoggedInFlag] = useState(sessionStorage.getItem("access-token") === null ? false : true);
   

    return (

        <div>
            <Header {...props} userDetails={props.userDetails} loggedInFlag={loggedInFlag} setLoggedInFlag={setLoggedInFlag}></Header>
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="DOCTORS" style={{ minWidth: "50%" }} />
                        <Tab label="APPOINTMENT" style={{ minWidth: "50%" }} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <DoctorList></DoctorList>        
                    </TabPanel>
                    <TabPanel value={value} index={1}>Item2 </TabPanel>
                </Grid>

            </div>
        </div>
    )

};

function TabPanel(props) {
    const { children, value, index } = props;
    return (
        value === index && (
            <h1>{children}</h1>
        )
    )
}
export default Home;