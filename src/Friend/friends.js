import React, { Component } from "react";
import fire from "../firebase";
import {
    
  Grid,
  Card , Button , Image, Divider   , List
  
  } from "semantic-ui-react";



 
  

  import Navbar from '../Component/Navbar'
import FriendYouKnow from "./friendyouKnow";
import FriendRequest from "./friendRequest";
import FriendList from './friendList';
  
 
  
  class Friends extends Component {
    constructor(props) {
      super(props);
      this.state = {

         
        

     


    }}


render() {


    return ( <div style={{ backgroundColor: "#f9f9f9", marginTop: "0vh" }}>
       
    <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
          <Grid.Column id="headerContainer"   style={{ backgroundColor: "#123445" }}>
          <Navbar activeItem="friends"/> 
            
 <h1 style={{color:"white" , marginTop : "10px"}}>Friend Requests</h1> 
     <Divider/>
     <FriendRequest/>
    
     <Divider/>
   
     <h1 style={{color:"white" , marginTop : "10px"}}>Friend You May Know</h1> 
     <Divider/>
    
     <FriendYouKnow/>
     <Divider/>








    <h1 style={{color:"white"}}>Friends</h1>

    <Divider/> 
 
    <FriendList/>


          </Grid.Column>
     </Grid>
        </div>
        )
}
  }

 

export default Friends;
