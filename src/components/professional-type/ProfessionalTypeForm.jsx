import React from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import Page from '../layout/Page';
import Form from '../layout/Form';

const ProfessionalTypeForm = () => {
    const { t } = useTranslation();

    const fields = [
        { label: 'Descrição', name: 'descricao' },
        { label: 'Situação', name: 'situacao', type: 'switch' }
    ];

    const handleSubmit = (data) => {
        const professionalType = {
            descricao: data.descricao,
            situacao: data.situacao
        };
        
        return api.post('professional-types', professionalType)
            .then(response => {
                return response;
            });
    }

    return (
        <Page title={t('Tipo de Profissional')}>
            <Form fields={fields} onSubmit={handleSubmit} />
        </Page>
    );
}

export default ProfessionalTypeForm;