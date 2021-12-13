import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import EditOutlined from '@mui/icons-material/EditOutlined';
import FlashMessage from './FlashMessage';
import TextMask from './TextMask';
import FabLink from './FabLink';

const Form = ({ fields, onSubmit, data, disabled }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [alert, setAlert] = useState({});
    const [formData, setFormData] = useState(fields.reduce((prev, curr) => { prev[curr.name] = ''; return prev; }, {}));

    useEffect(() => {
        if (data) {
            setFormData(data);
            Object.keys(data).forEach(key => {
                let field = document.querySelector(`[name=${key}]`);
                if (field) 
                    field.value = data[key];
            })
        }
    }, [data])

    const handleChange = (event) => {
        if (!disabled) {
            setFormData({ 
                ...formData, 
                [event.target.name]: (event.target.type === 'checkbox')? event.target.checked : event.target.value 
            });
        }
    };

    const parseField = (field) => {
        let parsedField;
        let required = field.hasOwnProperty('required') ? !!field.required : true;

        switch (field.type) {
            case 'switch':
                parsedField = (
                    <FormGroup>
                        <FormControlLabel control={<Switch name={field.name} checked={!!formData[field.name]} onChange={handleChange} />} label={t(field.label)} disabled={disabled} />
                    </FormGroup>
                );
                break;
            case 'select':
                parsedField = (
                    <FormControl fullWidth margin='normal' required={required} value={formData[field.name]}>
                        <InputLabel id={`${field.name}-label`}>{t(field.label)}</InputLabel>
                        <Select label={t(field.label)} fullWidth labelId={`${field.name}-label`} id={field.name} name={field.name} disabled={disabled}>
                            {
                                field.options.map((option) => (
                                    <MenuItem key={option[field.optionValue]} value={option[field.optionValue]}>{option[field.optionLabel]}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                );
                break;
            case 'mask':
                parsedField = (
                    <TextMask mask={field.mask} label={t(field.label)} id={field.name} name={field.name} margin='normal' required={required} value={formData[field.name]} onChange={handleChange} fullWidth disabled={disabled} />
                );
                break;
            case 'password':
                if (disabled) {
                    return '';
                }
            default: 
                parsedField = <TextField type={field.type || 'text'} label={t(field.label)} id={field.name} name={field.name} margin='normal' required={required} fullWidth onChange={handleChange} value={formData[field.name]} disabled={disabled} />;
        }

        return parsedField;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!disabled) {
            onSubmit(formData).then((response) => {
                setAlert({ 
                    type: 'success', 
                    message: t('Requisição processada com sucesso')
                });
                navigate(`/${location.pathname.split('/')[1]}`, { replace: true });
            }).catch(error => {
                setAlert({ 
                    type: 'error', 
                    message: error.response?.data?.message || t('Ocorreu um erro ao processar a requisição')
                });
            });
        }
    }

    return (
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <FlashMessage type={alert.type} message={alert.message} />
            { fields.map(parseField) }
            { !disabled && <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>{t('Salvar')}</Button> }
            { disabled && 
                <FabLink to='editar' label={t('Editar')} color='secondary'>
                    <EditOutlined />
                </FabLink> 
            }
        </Box>
    );
}

export default Form;