'use client';

import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const steps = [
  {
    id: "1",
    message: "Hey, please write your username",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message:
      "Hi   {previousValue}, Our Agents are currently busy. We will get to you back through email",
    trigger: "4",
  },
  {
    id: "4",
    user: true,
    trigger: "5",
    condition: (value: any, { steps }: any) => {
      // Check if the message has already been displayed
      const previousStep = steps[1];
      return previousStep.value !== value;
    },
  },
  {
    id: "5",
    options: [
      { value: 1, label: "Rate Driver" },
      { value: 2, label: "Safety measures" },
    ],
    end: true,
  },
];

// Creating our own theme
const theme = {
  background: "#fff",
  headerBgColor: "#0178d4",
  headerFontSize: "20px",
  botBubbleColor: "#0F3789",
  headerFontColor: "white",
  botFontColor: "white",
  userBubbleColor: "#FF5733",
  userFontColor: "white",
};

// Set some properties of the bot
const config = {
  botAvatar:
    "https://img.freepik.com/free-vector/chat-bot-concept-illustration_114360-5522.jpg?size=626&ext=jpg",
  floating: true,
};

function Chattbot() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ChatBot
          // This appears as the header
          // text for the chat bot
          headerTitle="Sentinel Africa Bot"
          steps={steps}
          {...config}
        />
      </ThemeProvider>
    </div>
  );
}

export default Chattbot;
