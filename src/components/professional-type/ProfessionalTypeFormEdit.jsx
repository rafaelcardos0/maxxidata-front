import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import Page from '../layout/Page';
import Form from '../layout/Form';

const ProfessionalTypeFormEdit = ({ disabled }) => {
    const { t } = useTranslation();
    const params = useParams();
    const [professionalType, setProfessionalType] = useState(null);

    const fields = [
        { label: 'Descrição', name: 'descricao' },
        { label: 'Situação', name: 'situacao', type: 'switch' }
    ];

    useEffect(() => {
        api.get(`professional-types/${params.id}`)
            .then(response => {
                setProfessionalType(response.data);
            });
    }, [params.id]);

    const handleSubmit = (data) => {
        const professionalType = {
            descricao: data.descricao,
            situacao: data.situacao
        };
        
        return api.patch(`professional-types/${params.id}`, professionalType)
            .then(response => {
                return response;
            });
    }

    return (
        <Page title={t('Tipo de Profissional')}>
            <Form fields={fields} onSubmit={handleSubmit} data={professionalType} disabled={disabled} />
        </Page>
    );
}

export default ProfessionalTypeFormEdit;