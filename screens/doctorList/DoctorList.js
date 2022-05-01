import React, { Fragment, useState, useEffect } from 'react';
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
import Button from '@material-ui/core/Button';
import '../home/Home.css';
import Modal from '@material-ui/core/Modal';
import '../doctorList/DoctorList.css';
import AppBar from '@material-ui/core/AppBar';
import BookAppointment from './BookAppointment';


const useStyles = makeStyles((theme) => ({

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
        fontFamily: "Roboto",
        fontWeight: "400",
        lineHeight: 1.5
    },
    paperStyleLogIn: {
        position: 'fixed',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',        
    }
}));

const DoctorList = (props) => {
    const classes = useStyles();
    const [listOfSpecialities, setListOfSpecialities] = useState([]);
    const [doctorsList, setDoctorsList] = useState([]);
    const [filteredDoctorsList, setFilteredDoctorsList] = useState([]);
    // let doctorListJson = [];
    useEffect(() => {
        fetch("http://localhost:8080/doctors/speciality", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            }

        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response);
            setListOfSpecialities(response);
        }).catch(function (error) { console.log(error) });

        fetch(`http://localhost:8080/doctors`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            }
        }).then((response) =>
            response.json()
        ).then((json) => {
            // json.array.forEach(element => {
            //     if(i>10){
            //         break;
            //     }
            //     setDoctorsList({...doctorsList,element});
            // });
            // console.log("json.length"+json.length);
            // console.log("json[0]"+json[0]);
            // for (var key = 0; key < json.length; key++) {
            //     if(key>10){
            //         break;
            //     }
            //     var value = json.array[key];
            //     console.log(key); // This is the key;
            //     console.log(value); // This is the value;
            //     setDoctorsList({...doctorsList,value});
            // }
            // var key=0;
            // json = json.filter((item)=>{
            //     key++;
            //     if(key>10){
            //         console.log("I m inside filter if");  
            //         return false;
            //     }
            //     else{
            //         console.log("I m inside filter else");  
            //         return true;
            //     }        

            // });
            setDoctorsList(json);
        }).catch(function (error) {
            console.log(error)
        });

    }, []);
    const [selectFlag, SetSelectFlag] = useState(false);
    const handleSpecialitySelect = (e) => {
        SetSelectFlag(true);
        let filteredList = doctorsList;
        console.log(doctorsList);
        console.log(e.target.value);
        if (e.target.value === "") {
            console.log("I m null character");
        }
        let doctorSpeciality = e.target.value;
        let filteredListup = filteredList.filter((doctor) => doctor.speciality === doctorSpeciality);
        if (filteredListup == null) {
            console.log("I m null filetredlist");
        }
        console.log(filteredListup);
        if (e.target.value === "") {
            console.log("I m null character");
            setFilteredDoctorsList(doctorsList);
        }
        else {
            setFilteredDoctorsList(filteredListup);
        }

        console.log(filteredDoctorsList);
    }
    const [isBkAptModalOpen, setIsBkAptModalOpen] = useState(false);
    const toggleBkAptModal = () => {
        setIsBkAptModalOpen(!isBkAptModalOpen);
    };
    const [doctorNameForAppointment,setDoctorNameForAppointment] = useState(""); 
    const handleBookAppointment = (fName,lName) => {
        // console.log("Book Apt pressed Outer" + itemId);
        if (!props.loggedInFlag) {
            setIsBkAptModalOpen(true);
            console.log("Book Apt pressed");           
        }
    };
    const setDoctorForApt = (name) =>{
        setDoctorNameForAppointment(name);
    }
    return (
        <Fragment>
            <div className="doctorTabPanelMainContainer">
                <FormControl className={classes.formControl}>
                    <InputLabel>SPECIALITY</InputLabel>
                    <Select
                        onChange={handleSpecialitySelect}
                    >
                        <MenuItem value="">SELECT</MenuItem>
                        {listOfSpecialities.map(item => {
                            return (
                                <MenuItem value={item}>
                                    {item}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                {selectFlag ? (
                    <div>
                        {filteredDoctorsList.map((item) => (
                            <Paper key={item.id} className="paperDoctor">
                                <Typography className="typographyStyle" style={{ margin: "10px" }}>
                                    Doctor Name: {item.firstName} {item.lastName}
                                </Typography>
                                <Typography className="typographyStyle" style={{ marginTop: "20px", marginLeft: "10px" }}>
                                    Speciality: {item.speciality}
                                </Typography>
                                <Typography className="typographyStyle" style={{ margin: "10px" }}>
                                    Rating:*****
                                </Typography>
                                <div style={{ display: "flex", justifyContent: "space-evenly", margin: "10px" }}>
                                    <Button style={{ margin: "10px", height: "30px", width: "200px", backgroundColor: "blueviolet", color: "white" }} onClick={() => {handleBookAppointment(item.id);setDoctorForApt(item.firstName+item.lastName);}}>Book Appointment</Button>
                                    <Button style={{ margin: "10px", height: "30px", width: "200px", backgroundColor: "green", color: "white" }}>View Details</Button>
                                </div>

                            </Paper>
                        ))}

                    </div>
                ) : (
                    <div>
                        {doctorsList.map((item) => (
                            <Paper key={item.id} className="paperDoctor">
                                <Typography className="typographyStyle" style={{ margin: "10px" }}>
                                    Doctor Name: {item.firstName} {item.lastName}
                                </Typography>
                                <Typography className="typographyStyle" style={{ marginTop: "20px", marginLeft: "10px" }}>
                                    Speciality: {item.speciality}
                                </Typography>
                                <Typography className="typographyStyle" style={{ margin: "10px" }}>
                                    Rating:*****
                                </Typography>
                                {/* <p style={{fontSize:"1em"}}>Doctor Name: Ocean Garner</p>
                                <p>Speciality: Pulmonologist</p>
                                <p>Rating:*****</p> */}
                                <div style={{ display: "flex", justifyContent: "space-evenly", margin: "10px" }}>
                                    <Button style={{ margin: "10px", height: "30px", width: "200px", backgroundColor: "blueviolet", color: "white" }} onClick={() => {handleBookAppointment(item.id);setDoctorForApt(`${item.firstName+item.lastName}`);}}>Book Appointment</Button>
                                    <Button style={{ margin: "10px", height: "30px", width: "200px", backgroundColor: "green", color: "white" }}>View Details</Button>
                                </div>

                            </Paper>
                        ))}
                    </div>
                )}
                <Modal
                    open={isBkAptModalOpen}
                    onClose={toggleBkAptModal}
                >
                    <Paper id="paper" className={classes.paperStyleLogIn} >
                    <AppBar position="static" style={{ backgroundColor: 'purple', height: "70px", textAlign: "center", textAnchor: "middle" }}>Book an Appointment</AppBar>
                    <BookAppointment toggleBkAptModal={toggleBkAptModal} doctorNameForAppointment={doctorNameForAppointment}></BookAppointment>
                    </Paper>
                </Modal>

            </div>


        </Fragment>

    )
};
export default DoctorList;