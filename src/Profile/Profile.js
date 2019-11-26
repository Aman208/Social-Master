import React, { Component } from "react";
import fire from "../firebase";
import {
    
  Grid,
  
  } from "semantic-ui-react";

  import './profile.css'
  

  import Navbar from '../Component/Navbar'


 
  
  class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {};

    }

  

render() {
    return (<div>

     
      <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
          <Grid.Column id="headerContainer"   style={{ backgroundColor: "#123445" }}>
          <Navbar activeItem="profile"/> 
          <User/>

          </Grid.Column>
          

          {/* <User/> */}
     </Grid>
        </div>
        )
}
  }

  const User = () =>
{
    return <div id="main1">  
          <div className="user-container">
          <h1 className="title">Profile</h1>
          
          
          <div className="user-profile">
          <div class="avatar-container">
      <img src="https://images.pexels.com/photos/756453/pexels-photo-756453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Photo" class="avatar" />
    </div>

            <h2 className="user-name">this.state.userName</h2>
            <h5 className="user-email">this.state.userEmail</h5>
            
          </div>
  </div>
  </div>

  }
  

export default Profile;
