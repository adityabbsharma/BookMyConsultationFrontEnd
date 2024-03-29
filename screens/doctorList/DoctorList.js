import React, { Fragment, useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import '../home/Home.css';
import Modal from '@material-ui/core/Modal';
import '../doctorList/DoctorList.css';
import AppBar from '@material-ui/core/AppBar';
import BookAppointment from './BookAppointment';
import DoctorDetails from './DoctorDetails';
import StarRateIcon from '@material-ui/icons/StarRate';


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
    },
    paperBookAppt: {
        textAlign: "left",
        margin: "15px",
        padding: "20px",
        cursor: "pointer"
    },
    paperViewDetails: {

    }

}));

const DoctorList = (props) => {
    const classes = useStyles();
    const [listOfSpecialities, setListOfSpecialities] = useState([]);
    const [doctorsList, setDoctorsList] = useState([]);
    const [filteredDoctorsList, setFilteredDoctorsList] = useState([]);
    const logInDetails = props.logInDetails;

    useEffect(() => {
        fetch("doctors/speciality", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
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
    const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
    const toggleViewDetailsModal = () => {
        setIsViewDetailsModalOpen(!isViewDetailsModalOpen);
    };

    const [doctorNameForAppointment, setDoctorNameForAppointment] = useState("");
    const [doctorSelectedForApt, setDoctorSelectedForApt] = useState([]);
    const handleBookAppointment = (item) => {
        console.log("Book Apt pressed Outer checking item.id" + item.id);
        setDoctorSelectedForApt(item);
        console.log("item.email " + item.emailId);
        if (props.loggedInFlag) {
            setIsBkAptModalOpen(true);
            console.log("Book Apt pressed");
        }
        else if (!props.loggedInFlag) {
            alert("Login to Book Appointment")
        }
    };
    const handleViewDetails = (item) => {
        setDoctorSelectedForApt(item);
        setIsViewDetailsModalOpen(true);
        console.log("Book Apt pressed");

    }
    const setDoctorForApt = (fName, lName) => {
        let fullName = fName + " " + lName;
        console.log("fullName" + fullName);
        setDoctorNameForAppointment(fullName);
    }

    const displayStarIcon = (ratingStars) => {
        let starRating = [];
        for (let i = 0; i < ratingStars; i++) {
            starRating.push(<StarRateIcon style={{ color: "green" }}></StarRateIcon>);
        }
        return starRating;
    }

    return (
        <Fragment>
            <div className="doctorTabPanelMainContainer">
                <FormControl className={classes.formControl}>
                    <InputLabel>SPECIALITY</InputLabel>
                    <Select
                        onChange={handleSpecialitySelect}
                    >
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
                                    Rating: {displayStarIcon(item.rating)}
                                </Typography>
                                <div style={{ display: "flex", justifyContent: "space-evenly", margin: "10px" }}>
                                    <Button style={{ margin: "10px", height: "30px", width: "200px", backgroundColor: "blueviolet", color: "white" }} onClick={() => { handleBookAppointment(item); setDoctorForApt(item.firstName, item.lastName); }}>Book Appointment</Button>
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
                                    Rating: {displayStarIcon(item.rating)}
                                </Typography>
                                <div style={{ display: "flex", justifyContent: "space-evenly", margin: "10px" }}>
                                    <Button style={{ margin: "10px", height: "30px", width: "200px", backgroundColor: "blueviolet", color: "white" }} onClick={() => { handleBookAppointment(item); setDoctorForApt(item.firstName, item.lastName); }}>Book Appointment</Button>
                                    <Button style={{ margin: "10px", height: "30px", width: "200px", backgroundColor: "green", color: "white" }} onClick={() => { handleViewDetails(item) }}>View Details</Button>
                                </div>

                            </Paper>
                        ))}
                    </div>
                )}
                <Modal
                    open={isBkAptModalOpen}
                    onClose={toggleBkAptModal}
                >
                    <Card id="paper" className={classes.paperStyleLogIn} >
                        <AppBar position="static" style={{ backgroundColor: 'purple', height: "70px", fontSize: "20px", textAlign: "center", textAnchor: "middle", padding: "11px" }}>Book an Appointment</AppBar>
                        <BookAppointment className={classes.paperBookAppt} {...props} logInDetails={logInDetails} toggleBkAptModal={toggleBkAptModal} doctorNameForAppointment={doctorNameForAppointment} doctorSelectedForApt={doctorSelectedForApt}></BookAppointment>
                    </Card>
                </Modal>
                <Modal
                    open={isViewDetailsModalOpen}
                    onClose={toggleViewDetailsModal}
                >
                    <Card id="paperViewDetails" className={classes.paperStyleLogIn} >
                        <AppBar position="static" style={{ backgroundColor: 'purple', height: "70px", fontSize: "20px", textAlign: "center", textAnchor: "middle", padding: "11px" }}>Doctor Details </AppBar>
                        <DoctorDetails {...props} doctor={doctorSelectedForApt}></DoctorDetails>
                    </Card>
                </Modal>

            </div>


        </Fragment>

    )
};
export default DoctorList;