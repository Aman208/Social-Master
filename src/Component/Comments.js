import React, { Component } from "react";
import moment from "moment";
import fire from '../firebase'


import {
  Button,
  Container,
  Input,
  Image,
  Comment,
  Header,
  Grid,
  Loader,
  Divider,
 
  Form, 
  FormTextArea,
 
} from "semantic-ui-react";
import "../App.css";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    commentList:[]
    , loading:false 
    };

    this.handleChange =  this.handleChange.bind(this);
    this.newComment = this.newComment.bind(this);
  }

  newComment = e =>{

      this.setState({loading :true});
  
      let timestamp = moment().format("LLL");
      let commentText =  this.state.text ;
      const { currentUser } = fire.auth();
    
      let { key1 , key2 } = this.props;
 
      fire
      .database()
      .ref(`feed/${key1}/${key2}/comment`)
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
  
  

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
 
   render()
   { 
     let { list } = this.props;
    
  
    
       
    return(<div >
<Comment.Group>
<Header as='h3' dividing>Comments</Header>


  <div style={{ overflow:"auto" }}>
   {   Object.values(list).map((item, index) => (       
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
     )) }  

</div>
<Form >
<Form.TextArea   name="text" onChange={this.handleChange} />
<Button fluid content='Add Comment' icon='edit' primary  onClick={this.newComment}/>
</Form>
</Comment.Group>
       
   </div>
   )


   }

}

export default Comments;



//