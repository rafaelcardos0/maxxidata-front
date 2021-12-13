import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { LANGUAGES } from '../../i18n';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const languageOptions = Object.keys(LANGUAGES);
    const [nextLanguage, setNextLanguage] = useState( (languageOptions.indexOf(+localStorage.getItem('i18nextLng')) + 1) % languageOptions.length);

    const changeLanguage = () => {
        setNextLanguage((nextLanguage + 1) % languageOptions.length);
        i18n.changeLanguage(languageOptions[nextLanguage]);
        localStorage.setItem('i18nextLng', languageOptions[nextLanguage]);
    }

    return (
        <Button onClick={changeLanguage}>
            <img src={LANGUAGES[languageOptions[nextLanguage]].flag} height={18} alt={languageOptions[nextLanguage]} />
        </Button>
    );
}

export default LanguageSelector;