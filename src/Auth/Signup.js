import {
    Form,
    Grid,
    Loader,
    Divider,
    Modal ,
    Header ,
    Message,
  } from "semantic-ui-react";

  import { Route,
    Link,
    BrowserRouter as Router , 
    Switch} from 'react-router-dom'

  import React, { Component } from "react";
  import fire from "../firebase";
  import "../App.css";



  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]
  
  class Signup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user : "",  
        email: "",
        password: "",
        reEnterpassword:"",
        loading: true,
        error: false,
        loggedIn: false,
        errMsg : ""
      };
    }
  
    
    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
    };
  
    
    componentDidMount = () => {
      fire.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ loading: false, loggedIn: true });
        } else {
          this.setState({ loading: false, loggedIn: false });
        }
      });
    };
  
    signup = e => {
      this.setState({ loading: true, error: false });
      e.preventDefault();

      let {password , reEnterpassword} = this.state;

    if(password != reEnterpassword)
    {
      this.setState({ error : true , errMsg : "Password Not Match !"  , loading : false}); 
    }
    else{

      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {
          let {currentUser} =  fire.auth();
          this.setState({ loading: false });
          localStorage.setItem("email", this.state.email);
          localStorage.setItem("uid" , currentUser.uid);
          this.props.history.push("/profileinfo");
        })
        .catch(error => {
          this.setState({ error: true, loading: false , errMsg: "Already Registed" });
        });

      } 
    };
  
    render() {
      return (
        <Grid style={{ backgroundColor: "#f9f9f9", marginTop: "0vh", minHeight: '95vh' }}>
          <Grid.Column id="headerContainer" >
  
           
            <div>
            <h2 style={{ marginTop: "20vh" }}>
              Join Social Master
            </h2>
            <p >
              The best way to discover trends and express yourself.
            </p>
            </div>
            
  
            {!this.state.loggedIn ? (
              <Form id="loginForm"
                style={{
                  maxWidth: 450 ,
                   textAlign: "center" 
                }}
              >
                <br />
  
                {this.state.error ? (
                    <Message negative>
                      <Message.Header>
                       {this.state.errMsg}
                      </Message.Header>
                    </Message>
                ) : null}

                <br />
              
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  type="text"
                  onChange={this.handleChange}
                  placeholder="Email"
                  name="email"
                  autoComplete="username"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  onChange={this.handleChange}
                  placeholder="Password"
                  name="password"
                  autoComplete="current-password"
                  type="password"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  onChange={this.handleChange}
                  placeholder="ReEnter Password"
                  name="reEnterpassword"
                  autoComplete="current-password"
                  type="password"
                />
              
                <div className="ui buttons fluid">
                  <button onClick={this.signup} className="ui button green">
                    Sign up for Social Master
                  </button>
                </div>
  
                <Divider hidden clearing />
                <p>
                  Your password must not contain spaces, special characters, or
                  emojis. By continuing you agree to our{" "}
                  <a href="#">terms of services</a>.
                </p>
              </Form>
            ) : null}

  
            {this.state.loggedIn ? (
              <p style={{ marginTop: "2%" }}>What are you looking for?</p>
            ) : null}
  
            {this.state.loading ? (
              <Loader style={{ marginTop: "5%" }} active inline="centered" />
            ) : null}


          </Grid.Column>
        </Grid>
      );
    }
  }
  
  export default Signup;