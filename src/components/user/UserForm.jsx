import React from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import Page from '../layout/Page';
import Form from '../layout/Form';

const UserForm = () => {
    const { t } = useTranslation();

    const fields = [
        { label: 'Nome', name: 'name' },
        { label: 'Nome de usuário', name: 'username' },
        { label: 'Senha', name: 'password', type: 'password', required: false },
        { label: 'Ativo', name: 'isActive', type: 'switch' }
    ];

    const handleSubmit = (data) => {
        const user = {
            name: data.name,
            username: data.username,
            password: data.password,
            isActive: data.isActive
        };
        
        return api.post('users', user)
            .then(response => {
                return response;
            });
    }

    return (
        <Page title={t('Usuário')}>
            <Form fields={fields} onSubmit={handleSubmit} />
        </Page>
    );
}

export default UserForm;