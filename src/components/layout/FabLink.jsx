import React from 'react';
import { Fab } from '@mui/material';
import { Link } from 'react-router-dom';

const FabLink = ({ to, label, color, children }) => {

    return (
        <Link to={to}>
            <Fab color={color || 'secondary'} sx={{position: 'absolute', bottom: 30, right: 30}} aria-label={label}>
                { children }
            </Fab>
        </Link>
    );
}

export default FabLink;