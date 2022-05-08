import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import './BookAppointment.css';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(5),
            border: 0,
            margin: '10px',
            display: 'inline-flex',
            padding: '0px',
            position: 'relative',
            minwidth: '0px',
            flexDirection: 'column',
            verticalAlign: 'top',
            marginLeft: '40px',


        },
    },
    MuiInputLabelRegister: {
        transformorigin: 'top left',
        top: '18px',
        left: '0',
        position: 'absolute',
        marginLeft: '38px',
        margin: '-18px',
        flexDirection: 'row'
    },
    MuiInputLabelRegisterDate: {
        transform: 'translate(0,1.5px) scale(0.85)',
        top: '18px',
        left: '0px',
        position: 'absolute',
        marginLeft: '38px',
        margin: '-18px',
        flexDirection: 'row'
    },
    formControl: {
        margin: theme.spacing(1),
        margin: "20px",
        width: "220px"
    },
    paperBookAppt: {
        textAlign: "left",
        margin: "15px",
        padding: "20px",
        cursor: "pointer"
    }
}));

const BookAppointment = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const toggleBkAptModal = props.toggleBkAptModal;
    const doctorNameForAppointment = props.doctorNameForAppointment;
    const doctorSelectedForApt = props.doctorSelectedForApt;
    const logInDetails = props.logInDetails;
    const [timeSlots, SetTimeSlots] = useState(["10AM-11AM",
        "11AM-12AM",
        "12AM-01PM",
        "05PM-06PM",
        "06PM-07PM",
        "07PM-08PM",
        "08PM-09PM"]);
    const current = new Date();
    const monthString = (current.getMonth() + 1) > 9 ? `${current.getMonth() + 1}` : `0${current.getMonth() + 1}`;
    const dateString = (current.getDate()) > 9 ? `${current.getDate()}` : `0${current.getDate()}`
    const date = `${current.getFullYear()}-${monthString}-${dateString}`;
    const [currentDate, SetCurrentDate] = useState(date);
    const [apptDate, setApptDate] = useState("");
    const [timeSlotCheck, setTimeSlotCheck] = useState(false);

    const handleBookAppointmentSubmit = (e) => {
        e.preventDefault();
        console.log("doctorNameForAppointment" + doctorNameForAppointment);
        console.log("currentdate is " + currentDate);
        console.log("logInDetails.emailId=" + logInDetails.emailId);
        fetch("appointments", {
            method: "POST",
            headers: {
                // "Accept": "application/json",
                // "Content-Type": "application/json;charset=UTF-8",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                authorization:
                    "Bearer " +
                    sessionStorage.getItem("access-token")
            },
            body: JSON.stringify({
                doctorId: `${doctorSelectedForApt.id}`,
                doctorName: `${doctorNameForAppointment}`,
                userId: `${logInDetails.emailId}`,
                userName: `${logInDetails.firstName}`,
                userEmailId: `${logInDetails.emailId}`,
                timeSlot: `${e.target["2"].value}`,
                appointmentDate: `${e.target["1"].value}`,
                createdDate: `${currentDate}`,
                symptoms: `${e.target["3"].value}`,
                priorMedicalHistory: `${e.target["4"].value}`,
                status: "ACTIVE"
            })
        }).then((response) => {
            if (response.status === 201) {
                console.log(e.target["2"].value);
                toggleBkAptModal();
                history.push("/");
            }
            else if (response.status === 400) {
                alert("Either the slot is already booked or not available");
            }
        }).catch(function (error) {
            console.error(error);
        });


    }
    return (
        <form className={classes.paperBookAppt} autoComplete="off" onSubmit={handleBookAppointmentSubmit}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <FormControl style={{ minHeight: "200px", display: "flex", flexDirection: "column" }}>
                    <TextField style={{ margin: "30px", width: "200px" }} required disabled label="Doctor Name" defaultValue={doctorNameForAppointment} />
                    <FormControl className={classes.root} style={{ marginleft: "initial" }} required >
                        <InputLabel htmlFor="doa" className={classes.MuiInputLabelRegisterDate} >Date Of Appointment </InputLabel>
                        <Input style={{ marginleft: "40px", marginRight: "21px", }} id="doa" name="doa" type="date" inputFormat="yyyy-mm-dd" defaultValue={`${currentDate}`} />
                    </FormControl>

                    <FormControl className={classes.formControl} required>
                        <InputLabel className={classes.MuiInputLabelRegister}>Time Slot</InputLabel>
                        <Select
                            onChange={(e) => setTimeSlotCheck(true)}
                            style={{ marginLeft: "20px" }}>
                            {timeSlots.map(item => {
                                return (
                                    <MenuItem value={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {!timeSlotCheck && (
                            <FormHelperText>
                                <span style={{ color: "red", marginLeft: "30px" }}>Select a time slot</span>
                            </FormHelperText>
                        )}
                    </FormControl>
                </FormControl>
                <FormControl style={{ minHeight: "200px", marginLeft: "40px" }}>
                    <TextField
                        id="standard-multiline-static"
                        label="Medical History"
                        multiline
                        rows={4}
                        style={{ margintop: "10px", margin: "20px" }}
                    />
                    <TextField
                        id="standard-multiline-static"
                        label="Symptoms"
                        multiline
                        rows={4}
                        style={{ margin: "20px" }}
                    />
                </FormControl>
            </div>
            <div style={{ display: "flex", marginLeft: "-18px" }}>
                <Button type="submit" id="loginBtnBkApt" variant="contained" color="primary">
                    Book Appointment
                </Button>
            </div>

        </form>

    )
}
export default BookAppointment;