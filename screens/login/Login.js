import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import './Login.css';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(5),
            // width: '25ch',
        },
    },
    MuiFormControlroot: {
        margin: "20px",
        padding: "22px"
    },
    MuiInputLabel: {
        transformorigin: 'top left',
        // transform: 'translate(0,1.5px) scale(0.85)',
        top: '-37px',
        left: '0',
        position: 'absolute',
        flexDirection: 'row'
    }
}));

const Login = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const setLoggedInFlag = props.setLoggedInFlag;
    props.changeModalHeight('400px');
    const loginDetails = props.loginDetails;
    const setLogInDetails = props.setLogInDetails;
    const handleLogInDetails = props.handleLogInDetails;
    const logInSubmitHandler = (e) => {
        e.preventDefault();
        console.log(`${e.target["0"].value}` + `${e.target["1"].value}`);
        fetch("auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Authorization:
                    "Basic " +
                    window.btoa(
                        `${e.target["0"].value}` + ":" + `${e.target["1"].value}`
                    )
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    throw new Error(response.statusText);
                }


            }).then((response) => {
                sessionStorage.setItem("access-token", response["accessToken"]);
                console.log("accesstoken after login is" + response["accessToken"]);
                console.log("firstName after login is" + response["firstName"]);
                console.log("userId after login is" + response["id"]);
                handleLogInDetails(response);
                setLoggedInFlag(true);
                props.toggleModal();
                history.push("/");
            }).catch(function (error) {
                console.error(error);
            });

    };
    return (

        <form autoComplete="off" onSubmit={logInSubmitHandler}>
            <FormControl className={classes.root} required >
                <InputLabel htmlFor="email" className={classes.MuiInputLabel}>Enter Email</InputLabel>
                <Input id="email" name="email" aria-describedby="my-helper-text" type="email" />
            </FormControl>
            <FormControl className={classes.root} required >
                <InputLabel htmlFor="password" className={classes.MuiInputLabel} >Enter Password</InputLabel>
                <Input id="password" name="password" aria-describedby="my-helper-text" type="password" />
            </FormControl>
            <Button type="submit" id="loginBtn" variant="contained" color="primary">
                LogIn
            </Button>

        </form>
    )
}
export default Login;