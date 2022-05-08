import { React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import './Register.css';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

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
            marginLeft: '40px'

        },
    },
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
        marginLeft: '38px',
        margin: '-18px',
        flexDirection: 'row'
    }
}));

const Register = ({ handleUserDetailsChange, changeModalHeight, toggleModal }) => {
    const classes = useStyles();
    const history = useHistory();
    changeModalHeight('550px');
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const regDetails = {
            firstName: `${e.target["0"].value}`,
            lastName: `${e.target["1"].value}`,
            dob: `${e.target["2"].value}`,
            mobile: `${e.target["3"].value}`,
            password: `${e.target["4"].value}`,
            emailId: `${e.target["5"].value}`
        }
        console.log("In Register userDetails = " + JSON.stringify(regDetails));
        fetch("users/register", {
            method: 'POST',
            headers: {
                // "Accept": "application/json",        
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(regDetails)
        }).then((rawResponse) => {
            toggleModal();
            history.push("/");
        }).catch(function (error) {
            console.error(error);
        });

    }
    return (

        <form autoComplete="off" onSubmit={handleRegisterSubmit}>
            <FormControl className={classes.root} required>
                <InputLabel htmlFor="firstName" className={classes.MuiInputLabelRegister}>First Name</InputLabel>
                <Input id="firstName" name="firstName" aria-describedby="my-helper-text" type="text" />
            </FormControl>
            <FormControl className={classes.root} required >
                <InputLabel htmlFor="lastName" className={classes.MuiInputLabelRegister} >Last Name</InputLabel>
                <Input id="lastName" name="lastName" aria-describedby="my-helper-text" type="text" />
            </FormControl>
            <FormControl className={classes.root} required >
                <InputLabel htmlFor="dob" className={classes.MuiInputLabelRegisterDate} >Date Of Birth </InputLabel>
                <Input id="dob" name="dob" aria-describedby="my-helper-text" type="date" inputFormat="yyyy-mm-dd" />
            </FormControl>
            <FormControl className={classes.root} required >
                <InputLabel htmlFor="mobile" className={classes.MuiInputLabelRegister} >Mobile</InputLabel>
                <Input id="mobile" name="mobile" aria-describedby="my-helper-text" type="mobile" />
            </FormControl>

            <FormControl className={classes.root} required >
                <InputLabel htmlFor="password" className={classes.MuiInputLabelRegister} >Password</InputLabel>
                <Input id="password" name="password" aria-describedby="my-helper-text" type="password" />
            </FormControl>

            <FormControl className={classes.root} required >
                <InputLabel htmlFor="emailId" className={classes.MuiInputLabelRegister} >Email</InputLabel>
                <Input id="emailId" name="emailId" aria-describedby="my-helper-text" type="email" />
            </FormControl>

            <Button type="submit" id="loginBtn" variant="contained" color="primary">
                Register
            </Button>

        </form>
    )
}
export default Register;