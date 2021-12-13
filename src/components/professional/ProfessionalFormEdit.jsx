import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import Page from '../layout/Page';
import Form from '../layout/Form';

const ProfessionalFormEdit = ({ disabled }) => {
    const { t } = useTranslation();
    const params = useParams();
    const [professional, setProfessional] = useState(null);
    
    const [types, setTypes] = useState([]);
    const fields = [
        { label: 'Nome', name: 'nome' },
        { label: 'Tipo de Profissional', name: 'tipo', type: 'select', options: types, optionValue: 'id', optionLabel: 'descricao' },
        { label: 'Telefone', name: 'telefone', type: 'mask', mask: '(00) 00000-0000' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Ativo', name: 'ativo', type: 'switch' }
    ];

    useEffect(() => {
        api.get('professional-types')
            .then(response => {
                setTypes(response.data);
                api.get(`professionals/${params.id}`)
                    .then(response => {
                        setProfessional(response.data);
                    });
            });
    }, [params.id])

    const handleSubmit = (data) => {
        const professional = {
            nome: data.nome,
            telefone: data.telefone,
            email: data.email,
            tipoDeProfissional: +data.tipo,
            situacao: data.situacao,
        };

        
        return api.patch(`professionals/${params.id}`, professional)
            .then(response => {
                return response;
            });
    }

    return (
        <Page title={t('Profissional')}>
            <Form fields={fields} onSubmit={handleSubmit} data={professional} disabled={disabled} />
        </Page>
    );
}

export default ProfessionalFormEdit;