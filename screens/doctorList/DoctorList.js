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
    }
}));

const DoctorList = (props) => {
    const classes = useStyles();
    const [listOfSpecialities, setListOfSpecialities] = useState([]);
    const [doctorsList, setDoctorsList] = useState([]);
    // const [speciality, setSpeciality] = useState("");
    const [filteredDoctorsList, setFilteredDoctorsList] = useState([]);
    let doctorListJson = [];
    useEffect(() => {
        fetch("http://localhost:8080/doctors/speciality", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                // "Cache-Control": "no-cache",  
                // "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me, Authorization, type",
                // 'Access-Control-Allow-Origin': "http://localhost:3000"         
            }

        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response);
            setListOfSpecialities(response);
        }).catch(function (error) { console.log(error) });

        // listOfSpecialities.map((item) => {
        // console.log("item is+"+item);
        fetch(`http://localhost:8080/doctors`, {
            method: "GET",
            // mode: 'no-cors',
            headers: {
                "Accept": "application/json",
                // "Content-Type": "application/json;charset=UTF-8",
                // "Content-Type": "application/json",
                "Content-Type": "application/json",
                // "Cache-Control": "no-cache",
                // "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me, Authorization, type",
                // 'Access-Control-Allow-Origin': "http://localhost:3000"

            }
        }).then((response) =>
            //  console.log(response)
            // json.array.forEach(element => {
            //     console.log(element.address);
            // })
            response.json()
            // for (const [index, element] of response.entries()) {
            //     // const [index, element] = [0, 'a'] on 1st iteration, then [1, 'b'], etc. 
            //     console.log(index, element);
            // }
        ).then((json) => {
            // doctorListJson = json;
            // json.map((doc)=>setDoctorsList([...doctorsList,{doc}]));
            // console.log(json);
            setDoctorsList(json)
            // console.log("i m here + item="+item+"response is"+doctorsList);
            // json.map((object)=>{setDoctorsList((doctorsList)=>[...doctorsList,{object}]);});
            // json.array.forEach(element => {
            //     console.log(element.address);
            // });

        }).catch(function (error) {
            console.log(error)
        });

        // })
    }, []);
    const [selectFlag, SetSelectFlag] = useState(false);
    const handleSpecialitySelect = (e) => {
        // setSpeciality(e.target.value);
        SetSelectFlag(true);
        let filteredList = doctorsList;
        console.log(doctorsList);
        console.log(e.target.value);
        let doctorSpeciality = e.target.value;
        let filteredListup = filteredList.filter((doctor) => doctor.speciality === doctorSpeciality);
        console.log(filteredListup);
        setFilteredDoctorsList(filteredListup);
        console.log(filteredDoctorsList);
    }
    return (
        <Fragment>
            <div className="doctorTabPanelMainContainer">
                <FormControl className={classes.formControl}>
                    <InputLabel>SPECIALITY</InputLabel>
                    <Select
                        // value={speciality}
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
                            <Paper className="paperDoctor">
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
                                    <Button style={{ margin: "10px", height: "30px", width: "200px", backgroundColor: "blueviolet", color: "white" }}>Book Appointment</Button>
                                    <Button style={{ margin: "10px", height: "30px", width: "200px", backgroundColor: "green", color: "white" }}>View Details</Button>
                                </div>

                            </Paper>
                        ))}

                    </div>
                ) : (
                    <div>

                    </div>
                )}

            </div>

        </Fragment>

    )
};
export default DoctorList;