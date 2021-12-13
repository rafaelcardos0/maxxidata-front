import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import flagBR from './assets/images/flag-br.svg';
import flagUS from './assets/images/flag-us.svg';

export const LANGUAGES = {
  pt: { flag: flagBR }, 
  en: { flag: flagUS },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          'Projeto <1>FullStack Challenge</1> desenvolvido por <3>Rafael Cardoso Coelho</3>.': '<1>FullStack Challenge</1> project developed by <3>Rafael Cardoso Coelho</3>.',
          'Bem vindo': 'Welcome',
          'Opções': 'Settings',
          'Salvar': 'Save',
          'Sair': 'Logout',
          'Adicionar': 'Add',
          'Editar': 'Edit',
          'Deletar': 'Delete',
          'Enviar': 'Submit',
          'Ações': 'Actions',

          'Usuários': 'Users',
          'Usuário': 'User',
          'Senha': 'Password',
          'Entrar': 'Sign in',
          'Nome': 'Name',
          'Nome de usuário': 'Username',
          'Ativo': 'Active',
          'Data de criação': 'Creation date',
          
          'Profissional': 'Professional',
          'Profissionais': 'Professionals',
          'Telefone': 'Phone',
          'Situação': 'Status',

          'Tipo de Profissional': 'Professional type',
          'Tipos de Profissional': 'Professional types',
          'Descrição': 'Description',

          'Deseja confirmar a exclusão?': 'Do you want to confirm the deletion?',
          'Cancelar': 'Cancel',
          'Confirmar': 'Confirm',

          'Requisição processada com sucesso': 'The request was successfully processed',
          'Ocorreu um erro ao processar a requisição': 'An error occurred while processing the request',
        }
      },
    },
    fallbackLng: 'pt',

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
