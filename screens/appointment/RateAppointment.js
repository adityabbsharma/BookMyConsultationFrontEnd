import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../appointment/Appointment.css';
import StarRateIcon from '@material-ui/icons/StarRate';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    formClass: {
        display: "flex",
        flexDirection: "column"
    },
    buttonClass: {
        margin: "40px",
        height: "30px",
        width: "200px",
        backgroundColor: "blueviolet",
        color: "white"
    }
}));

const RateAppointment = (props) => {
    const classes = useStyles();
    const appId = props.appId;
    const docId = props.docId;
    const toggleRateApptModal = props.toggleRateApptModal;
    const [timeSlotCheck, setTimeSlotCheck] = useState(false);
    const [ratingOfDoctor, setratingOfDoctor] = useState("0");
    const [colorOfStarOne, setColorOfStarOne] = useState("grey");
    const [colorOfStarTwo, setColorOfStarTwo] = useState("grey");
    const [colorOfStarThree, setColorOfStarThree] = useState("grey");
    const [colorOfStarFour, setColorOfStarFour] = useState("grey");
    const [colorOfStarFive, setColorOfStarFive] = useState("grey");
    const resetStarIconColor = () => {
        setColorOfStarOne("grey");
        setColorOfStarTwo("grey");
        setColorOfStarThree("grey");
        setColorOfStarFour("grey");
        setColorOfStarFive("grey");
        setratingOfDoctor("0");
    }
    const clickHandlerOne = () => {
        resetStarIconColor();
        setColorOfStarOne("yellow");
        setratingOfDoctor("1");
        setTimeSlotCheck(true);
    }

    const clickHandlerTwo = () => {
        resetStarIconColor();
        setColorOfStarOne("yellow");
        setColorOfStarTwo("yellow");
        setratingOfDoctor("2");
        setTimeSlotCheck(true);
    }

    const clickHandlerThree = () => {
        resetStarIconColor();
        setColorOfStarOne("yellow");
        setColorOfStarTwo("yellow");
        setColorOfStarThree("yellow");
        setratingOfDoctor("3");
        setTimeSlotCheck(true);
    }

    const clickHandlerFour = () => {
        resetStarIconColor();
        setColorOfStarOne("yellow");
        setColorOfStarTwo("yellow");
        setColorOfStarThree("yellow");
        setColorOfStarFour("yellow");
        setratingOfDoctor("4");
        setTimeSlotCheck(true);
    }

    const clickHandlerFive = () => {
        setColorOfStarOne("yellow");
        setColorOfStarTwo("yellow");
        setColorOfStarThree("yellow");
        setColorOfStarFour("yellow");
        setColorOfStarFive("yellow");
        setratingOfDoctor("5");
        setTimeSlotCheck(true);
    }

    const handleRateAppointmentSubmit = (e) => {
        toggleRateApptModal();
        const ratingBody = {
            "appointmentId": `${appId}`,
            "doctorId": `${docId}`,
            "rating": `${ratingOfDoctor}`,
            "comments": `${e.target["0"].value}`
        }
        fetch("ratings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                authorization:
                    "Bearer " +
                    sessionStorage.getItem("access-token")
            },
            body: JSON.stringify(ratingBody)
        }).then((response) => {
            if (response.status === 200) {
                alert("Rating submitted");
            }
            else {
                throw new Error(response.status);
            }
        }).then((response) => {
            console.log(JSON.stringify(response));
        }).catch(function (error) {
            console.log(error);
        });
    }
    return (
        <form className={classes.formClass} autoComplete="off" onSubmit={handleRateAppointmentSubmit}>
            <FormControl style={{ minHeight: "100px", marginLeft: "40px", width: "200px" }}>
                <TextField
                    id="standard-multiline-static"
                    label="Comments"
                    multiline
                    rows={4}
                />
            </FormControl>
            <FormControl>
                <div style={{ padding: "10px", marginLeft: "30px", cursor: "pointer", width: "120px" }}>
                    <Typography>Rating: </Typography>
                    <StarRateIcon style={{ color: colorOfStarOne }} onClick={clickHandlerOne} ></StarRateIcon>
                    <StarRateIcon style={{ color: colorOfStarTwo }} onClick={clickHandlerTwo}></StarRateIcon>
                    <StarRateIcon style={{ color: colorOfStarThree }} onClick={clickHandlerThree}></StarRateIcon>
                    <StarRateIcon style={{ color: colorOfStarFour }} onClick={clickHandlerFour}></StarRateIcon>
                    <StarRateIcon style={{ color: colorOfStarFive }} onClick={clickHandlerFive}></StarRateIcon>
                </div>
                {!timeSlotCheck && (
                    <FormHelperText>
                        <span style={{ color: "red", marginLeft: "30px" }}>Select a time slot</span>
                    </FormHelperText>
                )}
            </FormControl>

            <Button id="rateBtn" type="submit" className={classes.buttonClass}>
                Rate Appointment
            </Button>
        </form>
    )
}
export default RateAppointment;
