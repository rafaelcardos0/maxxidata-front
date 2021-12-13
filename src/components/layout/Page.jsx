import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Page = (props) => {

    return (
        <Container component='main' maxWidth='md'>
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <Typography component='h2' variant='h5' mb={3} mt={4} fontWeight='bold'>{props.title}</Typography>
                {props.children}
            </Box>
        </Container>
    )
}

export default Page;