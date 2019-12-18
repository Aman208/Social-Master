import React, { Component } from "react";
import fire from "../firebase";
import {
    
  Grid,
  Card , Button , Image, Divider  , Loader , Header , Message  , List
  
  } from "semantic-ui-react";

  class FriendList extends Component {
    constructor(props) {
      super(props);
      this.state = {

        friendList : [] ,
         list :[],
         keys : [] ,
        loading : false ,
       
      };

      

    }


    componentWillMount (){

      this.setState ( { loading : true })

      let pid = localStorage.getItem("ProfileId");
   try{
      fire.database()
    .ref(`friend/${pid}`)
      .on("value", snapshot => {
        var obj = snapshot.val();
        var list = [];
        var keys = [];
        for (let a in obj) {
          list.push(obj[a]);
          keys.push(a);
        }

        this.setState({list : list , keys : keys} ,
           () =>{
              if(this.state.list.length)
                {this.state.list.map((item , index) => {
                fire.database()
                .ref(`profileInfo/${item.friendId}`)
                .on( "value" , snapshot => {
                  let friendList =[];

                  friendList.push(snapshot.val());

                  this.setState({friendList:friendList , loading : false} );

                })
              } )

            }
            else{
              this.setState({friendList:[] , loading : false} );

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





 


  render() {


    return ( 
       
      <div>
       
           {this.state.friendList.map( ( item,index) => {
             
            return <Card.Group itemsPerRow={3} textAlign='center'  id="headerContainer"  >
            <Card>
            <Card.Content>
              <Image
                floated='right'
                size='small'
                src={item.image}
              />
           <Card.Header>{item.fname}  {item.lname} </Card.Header>
           <Card.Meta>{item.contact}</Card.Meta>
              <Card.Description>
                {item.about}
              </Card.Description>
            </Card.Content>
           
          </Card>
          </Card.Group>
        
            }) }
      
          


{this.state.loading ? (
  <Loader style={{ marginTop: "5%" }} active inline="centered" />
) : null}

</div>
     
    )


}



  }



  export default FriendList;


