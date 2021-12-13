import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import Page from '../layout/Page';
import TableData from '../layout/TableData';
import FabLink from '../layout/FabLink';

const UserList = () => {
    const { t } = useTranslation();

    const columns = [
        { field: 'id', name: t('ID'), options: { width: 30 } },
        { field: 'name', name: t('Nome') },
        { field: 'username', name: t('Usuário') },
        { field: 'createdAt', name: t('Data de criação') },
        { field: 'isActive', name: t('Ativo'), type: 'boolean', options: { align: 'center' } }
    ];

    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('users')
            .then(response => {
                setUsers(response.data);
            });
    }, [setUsers]);

    const handleRemove = (id) => {
        return api.delete(`users/${id}`)
            .then((response) => {
                setUsers(users.filter(user => user.id !== +id));
                return response;
            });
    }

    return (
        <Page title={t('Usuários')}>
            <TableData data={users} columns={columns} onRemove={handleRemove} />
            <FabLink to='/usuario/novo' label={t('Adicionar')}>
                <AddIcon />
            </FabLink>
        </Page>
    );
}

export default UserList;