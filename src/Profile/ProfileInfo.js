import React, { Component } from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import moment from "moment";
import fire from '../firebase';


const options = [
    { key: 'm',value: 'male', text: 'Male'  },
    { key: 'f', value: 'female' , text: 'Female' },
    { key: 'o', value: 'other' , text: 'Other' },
  ]

class ProfileInfo extends Component {
    
    constructor(props){
        super(props);

        this.state= {
                   fname: null , 
                   lname: null,
                   about : null,
                   contact :null ,
                   dd : 1,
                   mm : 4,
                   yyyy : 1999,
                   gender : null,
                   chk: false ,
                   image:"",
        loading : false ,
        msg: ""
            
            };

              
                this.handleChange = this.handleChange.bind(this);
                this.submit = this.submit.bind(this);
    }

    submit =  (e) =>{

        this.setState({loading : true});

        e.preventDefault();
    
        let fname = this.state.fname;
        let lname = this.state.lname;
        let image = this.state.image;
        let Dob = `${this.state.dd}-${this.state.mm}-${this.state.yyyy}`;
        let timestamp = moment().format("LLL");
        let contact = this.state.contact;
        let  gender = this.state.gender;
        let about = this.state.about ;
        let chk = this.state.chk ;
        const currentUser  = localStorage.getItem("email");

        console.log(moment(Dob, "DD-MM-YYYY").isValid());

        if(moment(Dob, "DD-MM-YYYY").isValid() && chk === true )
        {fire
          .database()
          .ref(`profileInfo/`)
          .push({
            fname ,
            lname,
            image ,
            Dob ,
            timestamp,
            user: currentUser,
            contact ,
            about ,
            gender
          })
          .then((res) => {

            this.setState({
              loading: false , msg : "Successful Done"
            });

            localStorage.setItem("ProfileId" , res.key );

            localStorage.setItem("name", this.state.fname + this.state.lname);

            this.props.history.push("/");
          });
    }
    else{

        this.setState({
            loading: false , msg : " Fill the form carefully "
          });

    }
     
    }

    handleChange = e => {

      this.setState( { [e.target.name] : e.target.value } );

     
      console.log(this.state);
    };

    handleCheck = e => {
        this.setState({ chk : !this.state.chk });
        
      };

      handleDropDownChange = (e, { value  , name}) => {
         e.preventDefault();
        this.setState({  [name] :  value})
        console.log(this.state);
       
       }


  render() {
    return (  <div style={{ backgroundColor: "#f9f9f9",
    marginRight: "10vh", marginLeft: "10vh",padding:"5px", marginTop:"5vh" , height:'auto' }}>
       <h1 style={{color:"red"}} > ADD Profile Info </h1>
         
    {this.state.loading ? <Dimmer active>
      <Loader />
    </Dimmer> : null }


      <Form>
        <Form.Group widths='equal'>
        <Form.Input fluid label='First name' name = "fname" type="text"
            onChange={this.handleChange} required /> 
          <Form.Input fluid label='Last name'  name = "lname" type="text"
            onChange={this.handleChange}/>

            <Form.Select
            fluid
            label='Gender'
            options={options}
            placeholder='Gender'
            name='gender'
            onChange={this.handleDropDownChange}
          />
        </Form.Group>

        <h3>Date OF Birth</h3>
      
        <Form.Group widths='equal' style={{width:"33%"}} >
        
          <Form.Input fluid label='DD'  type='number' placeholder='DD' name="dd" onChange={this.handleChange} />
          <Form.Input fluid label='MM'  type='number' placeholder='MM' name="mm" onChange={this.handleChange} />
          <Form.Input fluid label='YYYY'  type='number' placeholder='YYYY' name="yyyy" onChange={this.handleChange}/>


        </Form.Group>
        <h3>Contact</h3>
        <Form.Group widths='equal'  style={{width:"33%" , marginLeft:"5px"}} >
            
         <Input label='+91'  placeholder='XXX'  type="number" name="contact" onChange={this.handleChange}/>

        
        </Form.Group>

        <Input label='Picture' type='text'  name="image" onChange={this.handleChange}/>
        
        <Form.TextArea label='About' name="about" placeholder='Tell us more about you...'onChange={this.handleChange} />
        <Form.Checkbox label='I agree to the Terms and Conditions' name="chk" onChange={this.handleCheck}/>
        <Form.Button type="submit" onClick={this.submit} >Submit</Form.Button>
          
      </Form>

      <br/>

      <h2>{this.state.msg}</h2>
      
      </div>
    )
  }
}

export default ProfileInfo;
