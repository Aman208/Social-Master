import {
    Form,
    Grid,
    Loader,
    List,
    Divider,
    Header,
    Message
  } from "semantic-ui-react";

  import React, { Component } from "react";
  import fire from "../firebase";

  import moment from 'moment';


  class Chat extends Component {
    constructor(props) {
      super(props);
      this.state = {
       
        loading: true,
        msg:"",
        name:"" ,

        list:[] ,
        keys:[]
       
        
      };

      this.postMessage=this.postMessage.bind(this);
    
    
    }


    postMessage = (e) =>
    {     e.preventDefault();
        this.setState({loading :true});

    let timestamp = moment().format("LLL");
    let msgText =  this.state.msg ;
    let userName = this.state.name;
    const { currentUser } = fire.auth();

    fire
    .database()
    .ref(`chat/`)
    .push({
       msgText ,
       timestamp,
       user: currentUser.email , 
       userName

    })
    .then(() => {
      this.setState({
        loading: false
      });
    })
    .catch((e) => console.log(e.message));

    }

    handleChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
      };

      componentWillMount(){

        fire.database()
        .ref(`chat/`)
        .on("value", snapshot => {
          var obj = snapshot.val();
          var list = [];
          var keys = [];
          for (let a in obj) {
            list.push(obj[a]);
            keys.push(a);
          }

          console.log(list);
          this.setState({
            list: list,
            keys: keys,
            loading: false
          });
  
          
        })

     



      }

    render(){
        return(<div>
            <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
          <Grid.Column id="headerContainer"   style={{ backgroundColor: "white" }}>
            
            
             <Form>
        <Form.Input fluid label='Name' name="name" onChange={this.handleChange}  />
          
        <Form.TextArea label='Message' name="msg" onChange={this.handleChange}  />
       
        <Form.Button onClick={this.postMessage} >Send</Form.Button>
      </Form>

      <Divider/>

      { this.state.loading ? <Loader active inline='centered' /> :
       <List size='big'>
      { this.state.list.map((item, index) => (   
    <List.Item>
      <List.Content>
        <List.Header as='a'>{item.user}</List.Header>
        <List.Description>
          {item.msgText} posted on {item.timestamp}
        </List.Description>
    
       
      </List.Content>
      </List.Item> )) }
      </List>}

    
 
      </Grid.Column></Grid>

        </div>)
    }
}


export default Chat;