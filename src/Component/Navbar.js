import React, { Component } from 'react'
import { Input, Menu  , Dimmer, Loader, Icon} from 'semantic-ui-react'
import {
    Link
  } from "react-router-dom";

  import fire from '../firebase';
  import './navcss.css';

export default class Navbar extends Component {
   
    constructor(props){
        super(props);
        this.state = {    msg: "Logout", activeItem : 'home'  
    }

    this.handleItemClick = this.handleItemClick.bind(this);
    this.logout = this.logout.bind(this);
    }

    componentWillMount(){
          this.setState({  activeItem : this.props.activeItem });
    }


  logout =  () =>
  { 
     fire.auth().signOut().then(()=> {

     

      this.setState({msg : "Login"});
       
      }).catch(function(error) { 
        alert("Logout Error");
      });
    }

  


  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {

    const { activeItem , msg } = this.state;

    return (
      <Menu inverted>
        <Menu.Item as={ Link }
          name="home"
          color='green'
          to ='/'
          active={activeItem === 'home'}
          ><Icon name='home'/>Home</Menu.Item>
      
        <Menu.Item as={Link}
          name='messages'
          color='green'
           to='/'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        ><Icon name='handshake'/>Messages</Menu.Item>

        <Menu.Item as={ Link }
          name='friends'
          color='green'
          to="/"
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        ><Icon name='handshake'/>friends</Menu.Item>


        <Menu.Item as={ Link }
          name='profile'
          color='green'
          to="/profile"
          active={activeItem === 'profile'}
       
        ><Icon name='user'/>Profile</Menu.Item>

        <Menu.Item as={Link }
          name='account'
          color='green'
          to='/account'
          active={activeItem === 'account'}
        
        ><Icon name='edit'/>Account</Menu.Item>


        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item>
          <img src='https://react.semantic-ui.com/logo.png' />
        </Menu.Item>
          <Menu.Item  as={Link }
            name={this.state.msg}
            active={activeItem === 'logout'}
            to='/login'
            onClick={this.logout}
          ><Icon name='log out'/>Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
