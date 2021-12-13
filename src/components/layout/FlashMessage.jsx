import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const FlashMessage = ({ message, type }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [message])

    const handleCloseAlert = () => {
        setOpen(false);
    }

    return (
        <Snackbar open={open} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
            <Alert severity={type} sx={{ width: '100%' }}>{t(message)}</Alert>
        </Snackbar>
    )
}

export default FlashMessage;