import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Header.css';
import pic from '../../assets/logo.jpeg';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from '../../screens/login/Login.js';
import Register from '../../screens/register/Register.js';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paperStyleLogIn: {
        position: 'fixed',
        top: '42%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
}));

const Header = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const loggedInFlag = props.loggedInFlag;
    const setLoggedInFlag = props.setLoggedInFlag;
    const [modalValue, setModalValue] = React.useState(0);
    const [modalHeight, setModalHeight] = React.useState();
    const setLogInDetails = props.setLogInDetails;
    const handleLogInDetails = props.handleLogInDetails;

    const handleChange = (event, modalValue) => {
        setModalValue(modalValue);
    }
    const changeModalHeight = (modalHt) => {
        console.log(`modalHeight changing from ${modalHeight}`);
        setModalHeight(modalHt);
        console.log(`modalHeight changing to ${modalHeight}`);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleOpen = () => {
        setIsModalOpen(true);
        console.log("In handleopen accstoken is= " + sessionStorage.getItem("access-token"));
        console.log("modalIsOpen=" + isModalOpen);

    };
    const handleLogOut = () => {
        console.log("In handleLogot accstoken is= " + sessionStorage.getItem("access-token"));
        fetch("auth/logout", {
            method: "POST",
            headers: {
                // "Accept": "application/json",
                // "Content-Type": "application/json;charset=UTF-8",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                authorization:
                    "Bearer " +
                    sessionStorage.getItem("access-token")
            }
        }).catch(function (error) {
            console.error(error);
        });
        sessionStorage.removeItem("access-token");
        props.setLoggedInFlag(false);
        sessionStorage.setItem("logInDetailsSessionStorage", JSON.stringify(""));
        history.push("/");
        setIsModalOpen(false);
    }

    return (

        <div>
            <div>
                <AppBar position="static" style={{ backgroundColor: 'purple', height: "70px" }}>
                    <Toolbar>
                        <img src={pic} alt="not displayed" style={{ height: "35px", backgroundColor: "#ff7f7f" }}></img>
                        <Typography variant="h6" className={classes.title} style={{ padding: "11px" }}>
                            Doctor Finder
                        </Typography>
                        {
                            loggedInFlag ? (<Button color="blue" variant="h4" id="logOutBtn" onClick={handleLogOut}>LogOut</Button>) :
                                (<Button color="blue" variant="h4" id="logInBtn" onClick={handleOpen} >Login</Button>)
                        }
                    </Toolbar>
                </AppBar>
                <Modal
                    open={isModalOpen}
                    onClose={toggleModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Paper id="paperHeader" className={classes.paperStyleLogIn} style={{ height: `${modalHeight}` }}>
                        <AppBar position="static" style={{ backgroundColor: 'purple', height: "70px", textAlign: "center", textAnchor: "middle" }}>AUTHENTICATION</AppBar>
                        <Tabs
                            value={modalValue}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="LOGIN" style={{ minWidth: "50%" }} />
                            <Tab label="REGISTER" style={{ minWidth: "50%" }} />
                        </Tabs>
                        <TabPanel value={modalValue} index={0}><Login {...props} setLoggedInFlag={setLoggedInFlag} toggleModal={toggleModal} setLogInDetails={setLogInDetails} handleLogInDetails={handleLogInDetails} changeModalHeight={changeModalHeight}></Login></TabPanel>
                        <TabPanel value={modalValue} index={1}>
                            <Register {...props} toggleModal={toggleModal} userDetails={props.userDetails} changeModalHeight={changeModalHeight}></Register>
                        </TabPanel>
                    </Paper>
                </Modal>
            </div>

        </div>
    );
}
function TabPanel(props) {
    const { children, value, index } = props;
    return (
        value === index && (
            <h1>{children}</h1>
        )
    )
}
export default Header;