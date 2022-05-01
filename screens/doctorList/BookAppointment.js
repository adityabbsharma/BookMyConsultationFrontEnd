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
            // width: '25ch',
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
    // MuiFormControlrootRegister:{        
    //     border: 0,
    //     margin: '-16px',
    //     display: 'inline-flex',
    //     padding: '0px',
    //     position: 'relative',
    //     minwidth: '0px',
    //     flexDirection: 'column',
    //     verticalAlign: 'top',
    //     marginLeft: '40px'
    // },    
    MuiInputLabelRegister: {
        transformorigin: 'top left',
        // transform: 'translate(0,1.5px) scale(0.85)',
        top: '18px',
        left: '0',
        position: 'absolute',
        marginLeft: '38px',
        margin: '-18px',
        flexDirection: 'row'
    },
    MuiInputLabelRegisterDate: {
        // transformorigin: 'top left',
        transform: 'translate(0,1.5px) scale(0.85)',
        top: '18px',
        left: '0',
        position: 'absolute',
        marginLeft: '30px',
        margin: '-18px',
        flexDirection: 'row'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: "30px",
    }
}));

const BookAppointment = ({ toggleBkAptModal, doctorNameForAppointment }) => {
    const classes = useStyles();
    const history = useHistory();

    const handleBookAppointmentSubmit = (e) => {
        e.preventDefault();
        console.log("doctorNameForAppointment" + doctorNameForAppointment);
        // to Write 
        toggleBkAptModal();
        history.push("/");

    }
    const [timeSlots, SetTimeSlots] = useState(["10AM-11AM",
        "11AM-12AM",
        "12AM-01PM",
        "05PM-06PM",
        "06PM-07PM",
        "07PM-08PM",
        "08PM-09PM"])
    return (

        <form style={{ display:"flex",flexWrap:"wrap"}} autoComplete="off" onSubmit={handleBookAppointmentSubmit}>
            <div style={{ display:"flex",flexWrap:"wrap"}}>
                <FormControl style={{minHeight:"200px"}}>
                    <TextField style={{ margin: "30px" }} required disabled label="Doctor Name" defaultValue={doctorNameForAppointment} />

                    <FormControl className={classes.root} required >
                        <InputLabel htmlFor="doa" className={classes.MuiInputLabelRegisterDate} >Date Of Appointment </InputLabel>
                        <Input id="doa" name="doa" type="date" inputFormat="yyyy-mm-dd" />
                    </FormControl>
                    <FormControl className={classes.formControl} required>
                        <InputLabel className={classes.MuiInputLabelRegister}>Time Slot</InputLabel>
                        <Select
                            // onChange={handleSpecialitySelect}
                            style={{ marginLeft: "30px" }}                >
                            <MenuItem value="">SELECT</MenuItem>
                            {timeSlots.map(item => {
                                return (
                                    <MenuItem value={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </FormControl>
                <FormControl style={{minHeight:"200px"}}>
                    <TextField style={{ margin: "30px" }} required disabled label="Doctor Name" defaultValue={doctorNameForAppointment} />

                    <FormControl className={classes.root} required >
                        <InputLabel htmlFor="doa" className={classes.MuiInputLabelRegisterDate} >Date Of Appointment </InputLabel>
                        <Input id="doa" name="doa" type="date" inputFormat="yyyy-mm-dd" />
                    </FormControl>
                    <FormControl className={classes.formControl} required>
                        <InputLabel className={classes.MuiInputLabelRegister}>Time Slot</InputLabel>
                        <Select
                            // onChange={handleSpecialitySelect}
                            style={{ marginLeft: "30px" }}                >
                            <MenuItem value="">SELECT</MenuItem>
                            {timeSlots.map(item => {
                                return (
                                    <MenuItem value={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </FormControl>
            </div>




            <Button type="submit" id="loginBtn" variant="contained" color="primary">
                Register
            </Button>

        </form>



    )
}
export default BookAppointment;