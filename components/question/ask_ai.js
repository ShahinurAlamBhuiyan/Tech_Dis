'use client'
import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Ask_AI = ({ question }) => {
  const [aiResponseMessage, setAiResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(question);
  const htmlContent = question.body;
  // Create a temporary div element to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  // Extract the text content
  const textContent = tempDiv.textContent || tempDiv.innerText;

  const fetchedSelectedQuestion = async () => {
    setIsLoading(true);
    const res = await fetch("/api/ai/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: question.title+ " " + textContent
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      setAiResponseMessage(data);
      if (data.content) {
        handleOpen();
        setIsLoading(false);
      }
    }
  };


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

//

  return (
    <div>
      <div className='flex  justify-center items-center'>
        <Button disabled={isLoading} onClick={fetchedSelectedQuestion}>Ask A.I.</Button>
        {isLoading && <p>loading...</p>}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}
            style={{ width: '600px' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             <h2 className=' font-bold'> {question.title}</h2>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ width: 'full', overflow: 'scroll', height: '400px' }}>
              {aiResponseMessage.content}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  )
}
// ...

export default Ask_AI