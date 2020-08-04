import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Widget, addResponseMessage } from 'react-chat-widget';
import { Affix,Button} from 'antd';
import 'react-chat-widget/lib/styles.css';
class Question extends Component {
  state={
    bottom:10,
    erroor:""
  }
  componentDidMount() {
   addResponseMessage("Welcome to JobFinder!");
 }

handleNewUserMessage = (newMessage) => {
  fetch('/api/admin/message',{
    method: "post",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },body:JSON.stringify({email:"",message:newMessage})
  })
  .then(res=>res.json())
  .then(res=>{this.setState({error:res.error||""})
})
  
  // Now send the message throught the backend API
  addResponseMessage("We will get back to you soon.. ");
}
 setBottom=(no)=>{
   this.setState({bottom:no})
 }
  render() {
     
      return (
<Affix style={{ position: 'absolute',  right: 10 }} offsetBottom={this.state.bottom}>
<Widget
 subtitle="Ask Any Question"
          handleNewUserMessage={this.handleNewUserMessage}
        />
        {/* <Button type="primary"  onClick={() => this.setBottom(this.state.bottom+10)}>
          Chat Box   
        </Button> */}
      </Affix>      );
    }
  }
  


  
  export default withRouter(Question);