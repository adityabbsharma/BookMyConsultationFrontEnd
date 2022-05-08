import React, { Fragment, useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../appointment/Appointment.css';
import Modal from '@material-ui/core/Modal';
import RateAppointment from './RateAppointment';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        margin: "5px"

    },
    buttonClass: {
        margin: "10px",
        height: "30px",
        width: "200px",
        backgroundColor: "blueviolet",
        color: "white"
    },
    paperStyleLogIn: {
        position: 'fixed',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)'       
    },
    paperBookAppt: {
        // textAlign:"left",
        // margin:"15px",
        // padding:"5px",
        // cursor:"pointer"
    }
}));

const Appointment = (props) => {
    const classes = useStyles();
    const [logInDetailsSessionStorage, setlogInDetailsSessionStorage] = useState(JSON.parse(sessionStorage.getItem("logInDetailsSessionStorage")));
    
    const [appointments, setAppointments] = useState([]);
    const [isAppointmentExist, setIsAppointmentExist] = useState(false);
    const loggedInFlag = props.loggedInFlag;    
    const [isRateApptModalOpen, setisRateApptModalOpen] = useState(false);
    const [appId, setappId] = useState("");
    const [docId, setdocId] = useState("");
    const toggleRateApptModal = () => {
        setisRateApptModalOpen(!isRateApptModalOpen);
    }
    const handleRateAppt = (item) => {       
        setappId(item.appointmentId);
        setdocId(item.doctorId);
        toggleRateApptModal();
    }
    const logInDetails = props.logInDetails;
    useEffect(() => {
        if (loggedInFlag) {            
            const url = `users/${logInDetailsSessionStorage.emailAddress}/appointments`;
            console.log("url = " + url);
            fetch(url, {
                method: "GET",
                headers: {                    
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    authorization:
                        "Bearer " +
                        sessionStorage.getItem("access-token")
                }
            }).then((response) => {                
                return response.json();                          
            }).then((response) => {
                setAppointments(response);
                setIsAppointmentExist(true);
                console.log("Inside fetch");
                console.table(appointments);
            }).catch(function (error) {
                console.log(error);
            }).finally(() => {
                // console.log("Inside finally appointments[0].appointmentId="+appointments['0']?.appointmentId);

            });
        }

    }, [])
    if (appointments === null) {
        return <p>Loading appointments</p>
    }
    return (
        <Fragment>
            <p> Booked Appointments</p>
            {loggedInFlag ? (
                <Fragment>                    
                    {appointments.map((item) => (
                        <Paper key={item.appointmentId} className={classes.paper} variant="outlined" elevation={3}>
                            <Typography>
                                Dr. {item?.doctorName}<br></br>
                                Symptoms: {item?.symptoms}<br></br>
                                Prior Medical History: {item?.priorMedicalHistory}<br></br>
                            </Typography>
                            <Button id="rateBtn" onClick={() => { handleRateAppt(item) }} className={classes.buttonClass}>
                                Rate Appointment
                            </Button>
                        </Paper>
                    ))}                   

                </Fragment>) : (
                <div style={{ display: "flex", alignContent: "center" }}>
                    {/* {console.log("logInDetailsSessionStorage.emailId=" + logInDetailsSessionStorage.emailAddress)} */}
                    <p>Login to see Appointments</p>
                </div>)}
            <Modal
                open={isRateApptModalOpen}
                onClose={toggleRateApptModal}
            >
                <Card id="paperAppointment" className={classes.paperStyleLogIn} >
                    <AppBar position="static" style={{ backgroundColor: 'purple', height: "70px", fontSize: "20px", textAlign: "center", textAnchor: "middle", padding: "11px" }}>Rate an Appointment</AppBar>
                    <RateAppointment  {...props} appId={appId} docId={docId} logInDetails={logInDetails} toggleRateApptModal={toggleRateApptModal}></RateAppointment>
                </Card>
            </Modal>

        </Fragment>

    )
}

export default Appointment;