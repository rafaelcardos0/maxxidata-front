import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Page from './Page';

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <Page title={t('Bem vindo')}>
            <Typography><Trans>Projeto <a href='https://github.com/Maxxidata/fullstack-challenge/blob/master/README.md'>FullStack Challenge</a> desenvolvido por <b>Rafael Cardoso Coelho</b>.</Trans></Typography>
        </Page>
    );
}

export default HomePage;