import {React,useState} from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Controller = (props) => {
  const baseUrl = "/api/v1/";
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    mobile: "",
    password: "",
    emailId: ""
  });
  const handleUserDetailsChange = (regDetails) =>{   
    setUserDetails(regDetails);
    console.log(userDetails);
  }
  

  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} userDetails={userDetails} handleUserDetailsChange={handleUserDetailsChange} />}
        />
      </div>
    </Router>
  );
};

export default Controller;
