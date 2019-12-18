import { Route,
    Link,
    BrowserRouter as Router , 
    Switch} from 'react-router-dom'

import {
    Form,
    Grid,
    Loader,
    Divider,
    Header,
    Message
  } from "semantic-ui-react";

  import React, { Component } from "react";
  import fire from "../firebase";
  import "../App.css";
  
  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        loading: true,
        error: false,
        loggedIn: true,
        remember: false
      };

      this.login = this.login.bind(this);
    }
  
    
    componentDidMount = () => {
      fire.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ loading: false, loggedIn: true });
        } else {
          this.setState({ loading: false, loggedIn: false });
        }
      });
    };
  
    login = (event) => {
      this.setState({ loading: true, error: false });
      event.preventDefault();
      fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {

          let {currentUser} = fire.auth();
          this.setState({ loading: false });

          
          
          localStorage.setItem("email", this.state.email);
          localStorage.setItem("uid" , currentUser.uid);


          this.props.history.push("/");
        })
        .catch(error => {
          this.setState({ error: true, loading: false });
        });
    };
    
    // Form Handle
    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    render() {
      return (
        <Grid  columns="equal"
          style={{
            backgroundColor: "#f9f9f9",
            marginTop: "0vh",
            minHeight: "95vh"
            
          }}
        >
          <Grid.Column id="headerContainer">
            {!this.state.loggedIn ? (
              <Header style={{ marginTop: "20vh", textAlign: "center" }} as="h2">
                <Header.Content> Log in to your account </Header.Content>
              </Header>
            ) : null}
            {!this.state.loggedIn ? (
              <Form
                id="loginForm"
                style={{
                  maxWidth: 450
                }}
              >
                <br />
                {this.state.error ? (
                  <div>
                    <Message negative>
                      <Message.Header>
                        Please double-check and try again
                      </Message.Header>
                      <p>The password you entered did not match our records.</p>
                    </Message>
                  </div>
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
                <div class="ui buttons fluid">
                  <button onClick={this.login} class="ui button green">
                    Log in
                  </button>
                </div>
                <Divider hidden clearing />
                New to Social Master? <a ><Link to="/signup" >Create an account</Link></a>
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
  
  export default Login;