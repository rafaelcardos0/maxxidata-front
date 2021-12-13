import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import Page from '../layout/Page';
import TableData from '../layout/TableData';
import FabLink from '../layout/FabLink';

const ProfessionalTypeList = () => {
    const { t } = useTranslation();

    const columns = [
        { field: 'id', name: t('ID'), options: { width: 30 } },
        { field: 'descricao', name: t('Descrição') },
        { field: 'situacao', name: t('Situação'), type: 'boolean', options: { align: 'center' } }
    ];

    const [professionalTypes, setProfessionalTypes] = useState([]);

    useEffect(() => {
        api.get('professional-types')
            .then(response => {
                setProfessionalTypes(response.data);
            });
    }, [setProfessionalTypes]);

    const handleRemove = (id) => {
        return api.delete(`professional-types/${id}`)
            .then((response) => {
                setProfessionalTypes(professionalTypes.filter(professionalType => professionalType.id !== +id));
            });
    }

    return (
        <Page title={t('Tipos de Profissional')}>
            <TableData data={professionalTypes} columns={columns} onRemove={handleRemove} />
            <FabLink to='/tipo-de-profissional/novo' label={t('Adicionar')}>
                <AddIcon />
            </FabLink>
        </Page>
    );
}

export default ProfessionalTypeList;