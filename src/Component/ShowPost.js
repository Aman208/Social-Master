import React ,{Component} from 'react'
import moment from "moment";
import fire from '../firebase'

import {
  Button,
  Container,
  Card,
  Header,
  Image,
  Grid,
  Loader,
  Icon,
  Dimmer,
  Divider,
  Form ,
  Comment,
  GridColumn
} from "semantic-ui-react";



import Comments from './Comments';

var qs = require('querystringify');




class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = { key1:"" , key2:"" ,  loading :true,

        details : {  description:"" ,
            picture:"" ,
            score : 0 ,
            timestamp : "" ,
            title : "" ,
            user : ""
        } 
         
    
    };
     this.Details = this.Details.bind(this);
     this.back = this.back.bind(this);
    
      }

      Details =  (nestedId, id) => {
          fire
          .database()
          .ref(
            `/feed/${id}/${nestedId}`
          )
          .once("value", snapshot => {
            var obj = snapshot.val();
            var y = moment(obj.timestamp ,"LLL" ).format('YYYY-MM-DD');
            var x  =   moment(y).fromNow();

            this.setState(  {...this.state , loading:false,  details : { description : obj.description ,
             score : obj.score , timestamp : x  , 
            title : obj.title , user : obj.user , picture:obj.picture}})
            
          });

      };


    back = () =>
    {
        this.props.history.push("/");
    }

    
   
      
   componentWillMount (){


    var {id} = qs.parse(this.props.match.params.id); 
    var {id2} = qs.parse(this.props.match.params.id2); 
   
    this.Details(id2 , id);
  
    this.setState({ key1: id , key2: id2  ,loading :false});


   }



    render() {
       return <div >
         {this.state.loading ? 
      <Loader>Loading</Loader>
     : <Grid  style={{ marginTop: "0vh", minHeight: "100vh"  }}>
         <Grid.Column id="headerContainer"   style={{ backgroundColor: "#123445" }}>

      

            <Header as="h2" style={{ paddingTop: "3vh", marginTop: "0vh" ,color:"white" }}>
                  <Icon name="image" />
                  <Header.Content>{this.state.details.title}</Header.Content>
                </Header>

                <Divider />
         
         <Grid columns={2} style={{margin : "5px" , background:"lightcoral"}}>
          <Grid.Column  width={10} style={{ padding: "8%" ,border : "3px solid blue"}}  >
          <Image src={this.state.details.picture} fluid />
          </Grid.Column>

          <GridColumn   width ={5} style={{ border : "3px solid blue"}}  >
          <Card.Group>
          <Card fluid color='red' >
          <Card.Content>
          <Card.Header>{this.state.details.user}</Card.Header>
          <Card.Meta>
          
          <span className='date'> Posted , {this.state.details.timestamp}</span>
          </Card.Meta>
          </Card.Content>
          </Card>
          <Card fluid color='red' >
          <Card.Content>
          <Card.Header>{this.state.details.title}</Card.Header>
          <Card.Description>
           {this.state.details.description}
          </Card.Description>
          </Card.Content>
          </Card>
           <Card fluid >
           <Card.Content >
           <a>
          <Icon name='fire' />
          {this.state.details.score} Fires
          </a>
          </Card.Content>
          
          <Card.Content extra>                   
                <Button
                  icon labelPosition='right'
                  color='blue'
                 // onClick={() => upvote(this.state.key2 , this.state.key1)}
                  style={{ paddingTop: "1vh", paddingBottom: "1vh" }}
                > Upvote 
                  <Icon color="green" name="thumbs up" />
                </Button>
                <Button
                  icon labelPosition='right'
                  color='blue'
                  // onClick={() => downvote(this.state.key2 , this.state.key1)}
                  style={{ paddingTop: "1vh", paddingBottom: "1vh" }}
                >  Downvote
                  <Icon color="red" name="thumbs down" />
                </Button>
                </Card.Content> 
                </Card>
              </Card.Group>

              <Divider/>

              <Comments key1={this.state.key1} key2={this.state.key2} />



      </GridColumn>
      </Grid>
      <Button positive onClick={this.back} > Back</Button>
      </Grid.Column>
      </Grid>}
  </div>
    }
  }

  export default Welcome;