import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton, Paper, Popover, Stack, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import FlashMessage from './FlashMessage';

const TableData = ({ columns, data, onRemove }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const [alert, setAlert] = useState({});

    const parseRowField = (row, field, type) => {
        let parsedValue;
        
        switch (type) {
            case 'object':
                let objectValue = field.split('.').reduce((o, i) => o[i], row);
                parsedValue = `${objectValue}`;
                break;
            case 'boolean': 
                parsedValue = row[field]? <CheckIcon /> : '';  
                break;
            default:
                return `${row[field]}`;
        }
        return parsedValue;
    }

    const handleRemove = (id) => {
        return onRemove(id).then((response) => {
            setAlert({ 
                type: 'success', 
                message: t('Remoção realizada com sucesso')
            })
        }).catch(error => {
            console.log(error.response);
            setAlert({ 
                type: 'error', 
                message: error.response?.data?.message || t('Ocorreu um erro ao processar a requisição')
            });
        });
    }

    return (
        <TableContainer component={Paper}>
            <FlashMessage type={alert.type} message={alert.message} />
            <Table sx={{ minWidth: 600 }}>
                <TableHead>
                    <TableRow>
                        {
                            columns?.map(column => (
                                <TableCell key={column.field} {...column.options}>{t(column.name)}</TableCell>
                            ))
                        }
                        <TableCell align='center' width='115'>{t('Ações')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data?.map((row, i) => (
                            <TableRow key={`row-${i}`}>
                                {
                                    columns.map(column => (
                                        <TableCell key={`row-${i}-${column.field}`} {...column.options}>{parseRowField(row, column.field, column.type)}</TableCell>
                                    ))
                                }
                                <TableCell align='center'>
                                    <Link to={`${location.pathname}/${row.id}`}>
                                        <IconButton size='small' component='span' aria-label={t('Visualizar')}>
                                            <VisibilityOutlined />
                                        </IconButton>
                                    </Link>
                                    <Link to={`${location.pathname}/${row.id}/editar`}>
                                        <IconButton size='small' component='span' aria-label={t('Editar')}>
                                            <EditOutlined />
                                        </IconButton>
                                    </Link>
                                    <RemoveButton row={row} onRemove={handleRemove} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const RemoveButton = ({ row, onRemove }) => {
    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = useState(null);

    const openPopover = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const closePopover = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <IconButton onClick={openPopover} size='small' component='span' aria-label={t('Deletar')}>
                <DeleteOutline />
            </IconButton>
            <Popover anchorEl={anchorEl} open={!!anchorEl} onClose={closePopover} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Box sx={{p: 2}}>
                    <Typography>{t('Deseja confirmar a exclusão?')}</Typography>
                    <Stack spacing={3} justifyContent='center' direction='row' mt={2}>
                        <Button onClick={closePopover} variant='outlined' size='small'>{t('Cancelar')}</Button>
                        <Button onClick={() => onRemove(row.id).then(closePopover()) } variant='contained' size='small' color='error'>{t('Confirmar')}</Button>
                    </Stack>
                </Box>
            </Popover>
        </>
    );
}

export default TableData;