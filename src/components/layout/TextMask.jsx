import React from 'react';
import TextField from '@mui/material/TextField';
import StringMask from 'string-mask';

const TextMask = (props) => {
    const { mask, onChange, ...otherProps } = props;

    const handleChange = (event) => {
        event.target.value = event.target.value.replace(/\D/g, '');
        onChange(event);
    }

    const handleBlur = (event) => {
        event.target.value = StringMask.apply(event.target.value, mask);
        onChange(event);
    }

    const handleFocus = (event) => {
        event.target.value = event.target.value.replace(/\D/g, '');
        onChange(event);
    }

    return (
        <TextField {...otherProps} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} />
    );
}

export default TextMask;