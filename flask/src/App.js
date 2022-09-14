import React, { useEffect, useState } from "react"
import axios from "axios"
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styled from "styled-components"


const FormContainer = styled.div`
  height:100vh;
  width: 100%;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-family: sans-serif;
`

function App() {

  const [data, setData] = useState([{}])
  const [conversation, setConversation] = useState("")
  const [disableSubmit, setDisableSubmit] = useState(false)

  const handleConversationChange = (event) => {
    setConversation(event.target.value)
  }

  function handleSubmit(){
    setDisableSubmit(true);
    const options = {
      method: "get",
      url: 'http://localhost:5000/conversation',
      params: {conversation: conversation}
    }
    axios.request(options).then((res)=>{
      setData(res.data)
      setDisableSubmit(false);
    }).catch((error)=>{
        const error_raw = error.response.data
        const error_clean = error_raw.substring(
          error_raw.indexOf("<p>") + 3, 
          error_raw.lastIndexOf("</p>")
        );
        alert(error_clean);
        setDisableSubmit(false);
      }
    )
  }

  function handleClear(){
    setConversation("")
  }

  return (
    <FormContainer>
      <Stack
        width={6/10}
        spacing = {2}
      >
        <h2 style={{margin:0, display:"block"}}>
          {typeof data.sentences === "undefined" ? "Conversation Analysis: Two Longest Sentences": "Longest Sentence: "}
          <span style={{fontWeight: 400}}>
            {typeof data.sentences === "undefined" ? " ":data.sentences[0]}
          </span>
          <br/>
          <br/>
          {typeof data.sentences === "undefined" ? " ": "2nd Longest Sentence: "}
          <span style={{fontWeight: 400}}>
            {typeof data.sentences === "undefined" ? "Enter Conversation:":data.sentences[1]}
          </span>
        </h2>
        <TextareaAutosize
          onChange={handleConversationChange}
          minRows={10}
          value={conversation}
        >

        </TextareaAutosize>
        <Stack
          direction={"row"}
          spacing = {2}
        >
          <Button
            variant="contained"
            style={{maxWidth:"10%"}}
            onClick={()=>handleSubmit()}
            disabled ={disableSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            style={{maxWidth:"20%"}}
            onClick={()=>handleClear()}
            color = {"inherit"}
          >
            Clear Input
          </Button>
        </Stack>
      </Stack>
    </FormContainer>
  );
}

export default App;
