import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
const DoctorDetails = (props) => {

    const doctor = props.doctor;

    return (
      
            <Typography style={{marginLeft:"10px",padding:"10px",fontFamily:"cursive"}}>                
                Dr. {doctor.firstName} {doctor.lastName}<br></br>
                Total Experience: {doctor.totalYearsOfExp} years<br></br>
                Speciality: {doctor.speciality}<br></br>
                Date of Birth: {doctor.dob}<br></br>
                City: {doctor.address.city}<br></br>
                Email: {doctor.emailId}<br></br>
                Mobile: {doctor.mobile}<br></br>
                Rating:
            </Typography>
    
    )

}

export default DoctorDetails;