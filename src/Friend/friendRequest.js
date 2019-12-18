import React, { Component } from "react";
import fire from "../firebase";
import {
    
  Grid,
  Card , Button , Image, Divider  , Loader , Header , Message  , List
  
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

  class FriendRequest extends Component {
    constructor(props) {
      super(props);
      this.state = {

        friendrequest : [] ,
         list :[],
        loading : false ,
        error : false
      };

      this.acceptRequest = this.acceptRequest.bind(this);
      this.declineRequest = this.declineRequest.bind(this);
      this.declineRequest2 = this.declineRequest2 .bind(this);

    }


    componentWillMount (){

      this.setState ( { loading : true })

      let pid = localStorage.getItem("ProfileId");
   try{
      fire.database()
    .ref(`friendrequest/${pid}`)
      .on("value", snapshot => {
        var obj = snapshot.val();
        var list = [];
        var keys = [];
        for (let a in obj) {
          list.push(obj[a]);
          keys.push(a);
        }

        this.setState({friendrequest : list , keys : keys} ,
           () =>{
              if(this.state.friendrequest.length)
                {this.state.friendrequest.map((item , index) => {
                fire.database()
                .ref(`profileInfo/${item.from}`)
                .on( "value" , snapshot => {
                  let list =[];

                  list.push(snapshot.val());

                  this.setState({list:list , loading : false} );

                })
              } )

            }
            else{
              this.setState({list:[] , loading : false} );

            }
           } 
          
           )

          

    })

    
  }
  catch ( e)
  {
    console.log(e.message);
    this.setState({error:true , loading : false});

  }
  
}





  acceptRequest = (e  , index) => {
     
    e.preventDefault();

    let pid = localStorage.getItem("ProfileId");

    fire.database()
    .ref(`friend/${pid}`)
    .push({
    
     timestamp :  Date.now(),
     friendId : this.state.friendrequest[index].from

      })
      .then((e) => {
       
        this.declineRequest2( index );

      })
      .catch( err => console.log(err.message));


  }

  declineRequest2 = (index) =>{


    let pid = localStorage.getItem("ProfileId");
    let templist = this.state.list ;
    let tempfr = this.state.friendrequest;
    let tempkey = this.state.keys;

    let i = index;
    
      fire
        .database()
        .ref(`friendrequest/${pid}/${this.state.keys[i]}`)
        .remove()
        .then( ( ) =>{
          templist.splice(index , 1);
          tempkey.slice(index , 1);
          tempfr.slice(index , 1);
          this.setState({list:templist , keys : tempkey , friendrequest : tempfr} );})
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });  

    
  }

  

  declineRequest =(e , index) => {
  
    e.preventDefault();

    let pid = localStorage.getItem("ProfileId");
    let templist = this.state.list ;
    let tempfr = this.state.friendrequest;
    let tempkey = this.state.keys;

    let i = index;
    
      fire
        .database()
        .ref(`friendrequest/${pid}/${this.state.keys[i]}`)
        .remove()
        .then( ( ) =>{
          templist.splice(index , 1);
          tempkey.slice(index , 1);
          tempfr.slice(index , 1);
          this.setState({list:templist , keys : tempkey , friendrequest : tempfr} );})
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });  

        
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
           {this.state.list.map( ( item,index) => {
             
            return <Card>
            <Card.Content>
              <Image
                floated='right'
                size='small'
                src={item.image}
              />
           <Card.Header>{item.fname}  {item.lname} </Card.Header>
              <Card.Meta>New Member</Card.Meta>
              <Card.Description>
                Steve wants to add you to the <strong>best friends</strong> List
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='green' onClick={(e) => this.acceptRequest(e , index)}>
                  Approve
                </Button>
                <Button basic color='red' onClick={(e)=> this.declineRequest(e , index)} >
                  Decline
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
Friend Request Responded
</Message.Header>
</Message>
</div>
     
    )


}



  }



  export default FriendRequest;


