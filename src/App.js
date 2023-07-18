import React from "react";
import WorldTimeApi from "./components/WorldTimeApi";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


function App() {
  return (
    <div>
        <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <Box sx={{ bgcolor: '#ecf2d5', height: '120vh' }} >
      <WorldTimeApi />
        </Box>
     
    </Container>
  </React.Fragment>
     
    </div>
  );
}

export default App;
