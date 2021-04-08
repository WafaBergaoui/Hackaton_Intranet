import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
function CustomChatbot(props) {
  const config = {
    width: "300px",
    height: "400px",
    floating: true
  };
  const steps = [
    {
      id: "Greet",
      message: "Hello, Welcome to DNA INTRANET !",
      trigger: "Ask Name"
    },
    {
      id: "Ask Name",
      message: "How Can I help You?",
      trigger: "Waiting user input for name"
    },
    {
      id: "Waiting user input for name",
      user: true,
      trigger: "Asking options to details"
    },
    {
      id: "Asking options to details",
      message: "For further HR details please contact send us your enquiry to manel.attar@dna-ga.com",
      trigger: "Ask raise"
    },
    {
      id: "Ask raise",
      message: "are you interested in a salary raise?",
      trigger: "Waiting user reply for a raise"
    },
    {
      id: "Waiting user reply for a raise",
      user: true,
      trigger: "Asking options to raise"
    },
    {
      id: "Asking options to raise",
      message: "For further details please contact CEO at bilel.cherif@adnagency.ch ",
      trigger: "Done"
    },
    {
      id: "Done",
      message: "Have a great day !!",
      end: true
    }
 ];
 const theme = {
  background: "white",
  fontFamily: "Arial, Helvetica, sans-serif",
  headerBgColor: "#ED6762",
  headerFontColor: "#fff",
  headerFontSize: "25px",
  botBubbleColor: "#FCB515",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4C4C4C"
 };
 
 return (
  <ThemeProvider theme={theme}>
     <ChatBot steps={steps} {...config} />
  </ThemeProvider>
 );
}
export default CustomChatbot;