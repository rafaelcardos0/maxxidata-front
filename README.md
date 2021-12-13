# FullStack Challenge Frontend

Projeto criado em React com [Create React App](https://github.com/facebook/create-react-app).

## Resumo

Utilizei a biblioteca de componentes [@mui/material](https://mui.com/). Contudo, tentei ao máximo desenvolver componentes reutilizáveis a fim de facilitar o crescimento do sistema, facilitar manutenção, manter consistência entre as telas e evitar repetição de código (ex: `Form` e `TableData`).

#### Autenticação

Autenticação implementada com uso de rotas privadas controladas através de token JWT armazenado em Cookie. Para fins de segurança, o token é destruido caso o usuário tente acessar uma rota na API que não tenha autorização. 

#### Internacionalização (i18n)

Mecanismo de internacionalização (i18n) implementado possibilitando a alteração entre as linguas portuguesa e inglesa. O código pode ser facilmente alterado para adição de novas linguas.

## Configurando e executando o projeto


### Instalando as dependencias: 

Execute o comando: `npm install`

### Configurando conexão com a API

O projeto aponta para uma API que tem seu endereço configurado em variável de ambiente no arquivo `.env`. Um valor padrão já está setado para fins de teste.

### Executando o projeto localmente

Execute o comando:
`npm start`

O ambiente de desenvolvimento será executado no endereço [http://localhost:3000](http://localhost:3000).