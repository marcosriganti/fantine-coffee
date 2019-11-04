import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const Footer = (props) => {
    return (<Box  bgcolor="primary.main">
                <Container maxWidth="md" >
                    <Box py={2}  color="secondary.main" >
                    <Typography variant="body1" component="p">&copy; Copyright 2018 - 2019 | Fantine | All Rights Reserved</Typography></Box>
                </Container> 
            </Box>)
}
export default Footer