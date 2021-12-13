import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import Page from '../layout/Page';
import Form from '../layout/Form';

const UserFormEdit = ({ disabled }) => {
    const { t } = useTranslation();
    const params = useParams();
    const [user, setUser] = useState(null);

    const fields = [
        { label: 'Nome', name: 'name' },
        { label: 'Nome de usuário', name: 'username' },
        // { label: 'Senha', name: 'password', type: 'password' },
        { label: 'Ativo', name: 'isActive', type: 'switch' }
    ];

    useEffect(() => {        
        api.get(`users/${params.id}`)
            .then(response => {
                setUser(response.data);
            });
    }, [params.id]);

    const handleSubmit = (data) => {
        const user = {
            name: data.name,
            username: data.username,
            isActive: data.isActive
        };

        if (data.password) {
            user.password = data.password;
        }
        
        return api.patch(`users/${params.id}`, user)
            .then(response => {
                return response;
            });
    }

    return (
        <Page title={t('Usuário')}>
            {
                <Form fields={fields} onSubmit={handleSubmit} data={user} disabled={disabled} />
            }
        </Page>
    );
}

export default UserFormEdit;