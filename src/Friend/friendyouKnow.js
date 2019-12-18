import React, { Component } from "react";
import fire from "../firebase";
import {
    
  Grid,
  Card , Button , Image, Divider , Loader  , List , Message
  
  } from "semantic-ui-react";

  import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  class FriendYouKnow extends Component {
    constructor(props) {
      super(props);
      this.state = {

        friendYouKnow : [] ,
         keys :[],
        loading : false
      };

      this.sendRequest = this.sendRequest.bind(this);
      this.removeRequest = this.removeRequest.bind(this);


    }


    componentWillMount (){

      this.setState ( { loading : true })

      fire.database()
      .ref(`profileInfo/`)
      .on("value", snapshot => {
        var obj = snapshot.val();
        var list = [];
        var keys = [];
        for (let a in obj) {
          list.push(obj[a]);
          keys.push(a);
        }

      
       
        this.setState({friendYouKnow : list ,  keys : keys , loading :false} )
           
        
    } )

  
  }

  sendRequest = (event , index , key ) => {

    event.preventDefault();

    let pid = localStorage.getItem("ProfileId");
    

    fire.database()
    .ref(`friendrequest/${key}`)
    .push({
    
    timestamp :  Date.now(),
    from : pid

      })
      .then(() => {
       
        let tempKey = this.state.keys ;
        let templist = this.state.friendYouKnow ;
    
        tempKey.splice(index , 1);
        templist.splice(index , 1);
    
        this.setState({keys : tempKey ,friendYouKnow:templist})

      });


  }

  

  removeRequest = (event , index) => {

    event.preventDefault();
    let tempKey = this.state.keys ;
    let templist = this.state.friendYouKnow ;

    tempKey.splice(index , 1);
    templist.splice(index , 1);

    this.setState({keys : tempKey ,friendYouKnow:templist})
  }


  render() {

    

    return (
       <div>
   <Carousel
  swipeable={true}
  draggable={false}
  showDots={false}
  responsive={responsive}
  ssr={false} // means to render carousel on server-side.
  infinite={false}
  keyBoardControl={true}
  containerClass="carousel-container"
  deviceType={this.props.deviceType}
  itemClass="carousel-item-padding-40-px"

>
     {this.state.friendYouKnow.map( ( item,index) => {
       
      return <Card>
      <Card.Content>
        <Image
          floated='right'
          size='small'
          src={item.image}
        />
     <Card.Header> {item.fname }</Card.Header>
        <Card.Meta> New to Socaial Master </Card.Meta>
        <Card.Description>
          {item.about} 
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={(e) => this.sendRequest(e , index , this.state.keys[index]) }>
            Send Request
          </Button>
          <Button basic color='red' onClick={ (e) => this.removeRequest(e ,index)} >
             Remove
          </Button>
        </div>
      </Card.Content>
    </Card>
  
      }) }

    </Carousel>


{this.state.loading ? (
              <Loader style={{ marginTop: "5%" }} active inline="centered" />
            ) : null}

<Message negative>
<Message.Header>
  Friend Request send to X Y Z
</Message.Header>
</Message>



</div> )
    }
   
  }



  export default FriendYouKnow;


