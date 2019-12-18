
import {
    Button,
    Form,
    Header,
    Image,
    Icon,
    Loader,
    Divider,
    Label,
    Table,
    Transition , Grid
  } from "semantic-ui-react";
  import React, { Component } from "react";
  import fire from "../firebase";
  import "../App.css";
import Navbar from "../Component/Navbar";
  
  class Account extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
        loading: true,
        updateDescription : "",
        updatePicture : "" ,
        updateTitle : "",
        loggedIn: true,
        showSetting: false,
        showEdit: false,
        list: [],
        keys:[],
        score: "",
        modal: null ,


      };
    }
  
    // Auth Change Listener
    componentWillMount = () => {
      fire.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ loggedIn: true, showSetting: true });
          this.account();
        } else {
          this.setState({ loading: false, loggedIn: false });
        }
      });
    };
  
    // Form Handler
    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state)
    };
  
    // Fetch User Data
    account = () => {
      const uid = localStorage.getItem("uid");
      fire
        .database()
        .ref(`feed/${uid}/`)
        .on("value", snapshot => {
          var obj = snapshot.val();
          var list = [];
          var keys = [];
          for (let a in obj) {
            list.push(obj[a]);
            keys.push(a);
          }
          
          this.setState({
            list: list,
            keys: keys,
            loading: false
          });
        });
    };
  
    delete = index => {
   
      const uid = localStorage.getItem("uid");
      fire
        .database()
        .ref(`feed/${uid}/${this.state.keys[index]}`)
        .remove();
    };
  
    edit = (item, index) => {
      
      this.setState({ showEdit: !this.state.showEdit , modal : index ,
         updateTitle :item.title ,
         updateDescription :item.description , 
        updatePicture : item.picture });

        console.log(this.state)
    };
  
    update = (index) => {
      const uid = localStorage.getItem("uid");
  
      this.setState({ loading: true });
      fire
        .database()
        .ref(`feed/${uid}/${this.state.keys[index]}`)
        .update({
          title: this.state.updateTitle,
          description: this.state.updateDescription,
          picture: this.state.updatePicture
        })
        .then(() => {
          this.setState({
            loading: false
          });
        });
    };
  
    render() {

      const listItems = this.state.list.map((item, index) => (
        <div>
          <Table fixed stackable
            style={{ marginTop: "4vh", marginBottom: "0vh" }}
          >
            <Table.Body>
             <Table.Row style={{background:"lightcoral" , color:"black"  }}>
              <Table.Cell width={4} style={{border:"4px solid black" , margin:"10px"}}>
                <Image 
                  rounded fluid
                  id="smallIMG"
                  src={item.picture}
                  verticalAlign="middle"/>
              </Table.Cell>

              <Table.Cell width={2}>
                <h2>{item.title}</h2>
              </Table.Cell>
              <Table.Cell width={2}>
                <h3> Score : {item.score}</h3>
              </Table.Cell>
              <Table.Cell width={2}> <h3>{item.timestamp}</h3></Table.Cell>

              <Table.Cell textAlign="center" width={3}>
              
                <Button size="small" color='blue' onClick={() => this.delete(index)}>
                  <Icon name='close' />
                  DELETE
                </Button> 
                <Divider/>
                {this.state.showSetting ?
                   <Button size="small"color={this.state.showEdit ? "white" : "yellow"}
                    onClick={() => this.edit(item ,index)}>
                  <Button.Content visible>
                  <Icon name='pencil' />
                      {this.state.showEdit
                        ? "DISABLE EDIT"
                        : "ENABLE EDIT"}
                    </Button.Content>
                </Button> : null }

              </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Transition
  visible={this.state.showEdit && this.state.modal === index}
  animation="vertical flip"
  duration={400}
>
  <Form
    style={{
      paddingBottom: "8vh",
      paddingTop: "2vh"
    }}
  >
    <Form.Group widths="equal">
      <Form.Input
        onChange={this.handleChange}
        name="updateTitle"
        label ="New Title"
      />
      <Form.Input
        fluid
        onChange={this.handleChange}
        name="updatePicture"
        label ="New Picture Src"
        required
      />
    </Form.Group>
    <Form.TextArea
      rows={4}
      onChange={this.handleChange}
      name="updateDescription"
      label ="New Description"
    
      required
    />

    <Button as="div" compact
      labelPosition="left"
      size="large"
      onClick={() => this.update(index)}
    >
      <Label as="span" color="black">
        UPDATE
      </Label>
      <Button color="yellow" icon compact>
        <Icon name="pencil" color="black" />
      </Button>
    </Button>
  </Form>
</Transition>
        
       
        </div>
      ));

      return (
        <div >
          <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
          <Grid.Column id="headerContainer"   style={{ backgroundColor: "#123445" }}>

          <Navbar activeItem="account" />

          <div id="headerContainer"
            style={{ marginTop: "0vh", minHeight: "100vh" }}
          >
           
            {this.state.loggedIn ? (
              <div>
                <Header as="h2" style={{ paddingTop: "3vh", marginTop: "0vh" ,color:"white" }}>
                  <Icon name="setting" />
                  <Header.Content>Manage Account</Header.Content>
                </Header>

                <Divider />
  
            
              </div>
            ) : null}
  
            
            {this.state.showSetting ? <div>{listItems}</div> : null}
  
            
            {this.state.loading ? (
              <Loader style={{ marginTop: "5%" }} active inline="centered" />
            ) : null}
          </div>
          </Grid.Column>
          </Grid>
        </div>
      );
    }
  }



       
  
  export default Account;







  