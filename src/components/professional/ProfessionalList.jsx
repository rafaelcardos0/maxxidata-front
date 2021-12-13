import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import Page from '../layout/Page';
import TableData from '../layout/TableData';
import FabLink from '../layout/FabLink';

const ProfessionalList = () => {
    const { t } = useTranslation();

    const columns = [
        { field: 'id', name: t('ID'), options: { width: 30 } },
        { field: 'nome', name: t('Nome') },
        { field: 'telefone', name: t('Telefone') },
        { field: 'professionalType.descricao', type: 'object', name: t('Tipo de Profissional') },
        { field: 'situacao', name: t('Situação'), type: 'boolean', options: { align: 'center' } }
    ];

    const [professionals, setProfessionals] = useState([]);

    useEffect(() => {
        api.get('professionals')
            .then(response => {
                setProfessionals(response.data);
            });
    }, [setProfessionals]);

    const handleRemove = (id) => {
        return api.delete(`professionals/${id}`)
            .then((response) => {
                setProfessionals(professionals.filter(professional => professional.id !== +id));
            });
    }

    return (
        <Page title={t('Profissionais')}>
            <TableData data={professionals} columns={columns} onRemove={handleRemove} />
            <FabLink to='/profissional/novo' label={t('Adicionar')}>
                <AddIcon />
            </FabLink>
        </Page>
    );
}

export default ProfessionalList;