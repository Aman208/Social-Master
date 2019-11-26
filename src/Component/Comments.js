import React, { Component } from "react";
import moment from "moment";
import fire from '../firebase'


import {
  Button,
  Container,
  Icon,
  Image,
  Comment,
  Header,
  Grid,
  Loader,
  Divider,
 
  Form ,
 
} from "semantic-ui-react";
import "../App.css";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      loading : true ,
      commentList : [] ,
      commentKeys : [] 

      
    };

    this.handleChange =  this.handleChange.bind(this);
    this.newComment = this.newComment.bind(this);
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillMount = () => 
    {
         console.log(this.props.key2);
     fire.database()
        .ref(`/feed/${this.props.key1}/${this.props.key2}/comment`)
        .on("value", snapshot => {
          var obj = snapshot.val();
          console.log(obj);
          var list = [];
          var keys = [];
          for (let a in obj) {
           list.push(obj[a]);
            keys.push(a);
          }

          console.log(list);
          this.setState({
            commentList: list,
            commentKeys: keys,
            loading: false
          });
  
          
        });
  
        
    };

  newComment = e =>{

    this.setState({loading :true});

    let timestamp = moment().format("LLL");
    let commentText =  this.state.text ;
    const { currentUser } = fire.auth();

    fire
    .database()
    .ref(`feed/${this.props.key1}/${this.props.key2}/comment`)
    .push({
       commentText ,
       timestamp,
       user: currentUser.email
    })
    .then(() => {
      this.setState({
        loading: false
      });
    })
    .catch((e) => alert("Some Error Occur"))

  };


   render()
   { 
     
       
    return(<div>
<Comment.Group>
<Header as='h3' dividing>
Comments
</Header>

 {this.state.loading ? <Loader active inline='centered' /> : <div>

  { this.state.commentList.map((item, index) => (       
    <Comment>
   <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
   <Comment.Content>
   <Comment.Author as='a'>{item.user}</Comment.Author>
    
   <Comment.Metadata>
   { moment( moment(item.timestamp ,"LLL" ).format('YYYY-MM-DD') ).fromNow()}
   </Comment.Metadata>
   <Comment.Text>{item.commentText}</Comment.Text>
  
  </Comment.Content>
      </Comment>
     )) } </div> 

  }


<Form reply >
<Form.TextArea name="text"  rows={2} onChange={this.handleChange} />
<Button fluid content='Add Comment' labelPosition='left' icon='edit' primary  onClick={this.newComment}/>
</Form>
</Comment.Group>
       
   </div>
   )


   }

}

export default Comments;
