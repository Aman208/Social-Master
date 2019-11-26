
import React, { Component } from "react";
import fire from "../firebase";
import {
    Button,
  Container,
  Card,
  Icon,
  Image,
  Grid,
  Loader,
  Divider,
  Label,
  Form
  } from "semantic-ui-react";

  import { Route,
    Link,
    BrowserRouter as Router , 
    Switch} from 'react-router-dom';
    
    import moment from 'moment';

  
  class FeedList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        list: [],
        keys: []
        
      };

      this.upvote =this.upvote.bind(this);
      this.downvote = this.downvote.bind(this);
      this.up = this.up.bind(this);
      this.down = this.down.bind(this);
     

    }
    componentDidMount = () => 
    {
     fire.database()
        .ref(`/feed/`)
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

  

   
    upvote = (nestedIndex, index) => {
        fire
          .database()
          .ref(
            `/feed/${this.state.keys[index]}/${
              Object.keys(this.state.list[index])[nestedIndex]
            }`
          )
          .once("value", snapshot => {
            var obj = snapshot.val().score;
            this.setState({ score: obj }, () => this.up(nestedIndex, index));
          });
      };
    
      up = (nestedIndex, index) => {
        fire
          .database()
          .ref(
            `/feed/${this.state.keys[index]}/${
              Object.keys(this.state.list[index])[nestedIndex]
            }`
          )
          .update({
            score: this.state.score + 1
          });
      };
    
      downvote =(nestedIndex, index)=>{
        fire
          .database()
          .ref(
            `/feed/${this.state.keys[index]}/${
              Object.keys(this.state.list[index])[nestedIndex]
            }`
          )
          .once("value", snapshot => {
            var obj = snapshot.val().score;
            this.setState({ score: obj }, () => this.down(nestedIndex, index));
          });
      };
    
      down = (nestedIndex, index) => {
        fire
          .database()
          .ref(
            `/feed/${this.state.keys[index]}/${
              Object.keys(this.state.list[index])[nestedIndex]
            }`
          )
          .update({
            score: this.state.score - 1
          });
      };

    render()
    { return(<div  >
        {this.state.loading ? (
              <div>
                <Loader style={{ marginTop: "25%" }} active inline="centered" />
              </div>
            ) : null}
            <div id="headerContainer" style={{width:"75%"}}>
            <Card.Group itemsPerRow={3} textAlign='center'  >
              { this.state.list.map((item, index) =>
           Object.values(item).map((nestedItem, nestedIndex) => (
            <Card   >
            <Link to={{
                  pathname: `/showpost/id=${this.state.keys[index]}/id2=${Object.keys(this.state.list[index])[nestedIndex]}`
                   }} >  <Image fluid id="mainIMG" src={nestedItem.picture} />
            </Link>
              <Card.Content>
                <Label as="p" color="white" size="large" ribbon>
                  Score : {nestedItem.score}
                </Label>
                <Card.Header style={{ paddingTop: "2vh" }}>
                  {nestedItem.title}
                </Card.Header>
                <Card.Description>{nestedItem.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <p>
                  <Icon name="user" style={{ marginRight: "5%" }} />
                  by {nestedItem.user}
                </p>
                <Divider />
                <p>
                  <Icon name="clock" style={{ marginRight: "5%" }} />
                  { moment( moment(nestedItem.timestamp ,"LLL" ).format('YYYY-MM-DD') ).fromNow()}
                </p>
                {this.props.loggedIn ? (
                  <div>
                    <Divider />
                    <div className="ui buttons fluid">
                      <button
                        icon
                        onClick={() => this.upvote(nestedIndex, index)}
                        className="ui button compact green"
                        style={{ paddingTop: "1vh", paddingBottom: "1vh" }}
                      >
                        <Icon name="angle up" />
                      </button>
                      <button
                        icon
                        onClick={() => this.downvote(nestedIndex, index)}
                        className="ui compact button black"
                        style={{ paddingTop: "1vh", paddingBottom: "1vh" }}
                      >
                        <Icon name="angle down" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </Card.Content>
            </Card>
             )) )
           }

     </Card.Group>
     </div>

       
         
     
    </div>)

    }
    
  }
    

    export default FeedList ;

