import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import StarRateIcon from '@material-ui/icons/StarRate';
const DoctorDetails = (props) => {

    const doctor = props.doctor;
    const ratingStars = doctor.rating;
    const starRating = [];
    for (let i = 0; i < ratingStars; i++) {
        starRating.push(i);
    }

    return (
        <div>
            <Typography style={{ marginLeft: "10px", padding: "10px", fontFamily: "cursive" }}>
                Dr. {doctor.firstName} {doctor.lastName}<br></br>
                Total Experience: {doctor.totalYearsOfExp} years<br></br>
                Speciality: {doctor.speciality}<br></br>
                Date of Birth: {doctor.dob}<br></br>
                City: {doctor.address.city}<br></br>
                Email: {doctor.emailId}<br></br>
                Mobile: {doctor.mobile}<br></br>
                Rating: {starRating.map(item => {
                    return (
                        <StarRateIcon style={{ color: "green" }}>
                        </StarRateIcon>
                    );
                })}
            </Typography>

        </div>
    )

}

export default DoctorDetails;