import { Container } from '@mui/material';
import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useEffect } from 'react';
// import { blueGrey } from '@mui/material/colors';
const continents = [
    { continent: 'Asia' },
    { continent: 'Africa' },
    { continent: 'NorthAmerica' },
    { continent: 'South America' },
    { continent: 'Antarctica' },
    { continent: 'Europe' },
    { continent: 'Australia' }
];

export default function WorldTimeApi() {
    const [city, SetCity] = useState('');
    const [continent, SetContinent] = useState('');
    const [loading, SetLoading] = useState(true);
    const [error, SetError] = useState(null);
    const [datetime, SetDateTime] = useState(null);
    const [toggle, SetToggle] = useState(false);
    const [msg, SetMsg] = useState('');
    const handleCityChange = (event) => {
        SetCity(event.target.value);
        SetToggle(false);
    }

    const handleContinentChange = (event) => {
        SetContinent(event.target.value);
        SetToggle(false);
    }


    const handleClick = (e) => {
        if (city.length > 0 && continent.length > 0) {
            SetToggle(true);
            console.log(datetime)

            SetMsg('');
        } else {
            SetToggle(false);
            SetMsg("Please Enter the required fields.");
        }
    }


    useEffect(() => {
        // console.log("inside useEffect");
        let intervalId;
        const fetchData = async () => {
            // console.log("inside fetchData")
            try {
                const response = await fetch(`https://worldtimeapi.org/api/timezone/${continent}/${city}`);
                if (!response.ok) {
                    throw new Error(" Kindly put right details - " + response.status);
                }
                else {
                    const jsonData = await response.json();
                    SetDateTime(jsonData.datetime);
                    SetError(null);
                }
            } catch (error) {
                SetDateTime(null);
                SetError(error.message);
            } finally {
                SetLoading(false);
            };
        }
        if (city !== "") {
            fetchData();
            intervalId = setInterval(fetchData, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };



    }, [city, continent]);

    return (
        <>
            <Container spacing={1}  >
                <center>
                    <br />
                    <Card sx={{ maxWidth: 900 }}>
                        <CardActionArea>

                            <CardContent sx={{ bgcolor: '#eedd82' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    World Date&Time
                                </Typography>
                                <Typography variant="body4" color="text.info">
                                    My project is a web application that provides real-time date and time information based on user input of continent and city. Using the World Time API, the application fetches and displays the accurate date and time for the specified location. The displayed time updates continuously until the user enters a new continent and city.

                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card> <br /><br />
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField onChange={handleContinentChange} required margin="normal"
                            id="outlined-select-currency"
                            select
                            label="Select"
                            // defaultValue="Asia"
                            helperText="Please select continent"
                            value={continent}
                        >
                            {continents.map((option) => (
                                <MenuItem key={option.continent} value={option.continent}>
                                    {option.continent}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br />

                        <TextField onChange={handleCityChange} value={city}
                            required label="Select"
                            id="outlined-basic" helperText="Please enter the city which is present in the continent"
                            variant="outlined" />
                    </Box>

                    <br />
                    <Divider variant="middle" />
                    <br />
                    <Button variant="outlined" onClick={handleClick}>Submit</Button>
                    <br /> <br />{msg}<br />
                    {toggle && (loading ? <Skeleton
                        sx={{ bgcolor: '#94c3c5' }}
                        variant="h3" animation="wave" width={500}
                    /> : <h3>{datetime}</h3>)}

                    <br />
                    {toggle && (error && <h3> There is some problem in loading the data : {error}</h3>)}
                    <br />
                    <Divider variant="middle" />
                </center>
            </Container>
        </>
    );
}
