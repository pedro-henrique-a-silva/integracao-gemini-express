# Projeto de Integração com Gemini AI do Google

Este projeto integra uma aplicação Node.js com a IA Gemini do Google. O objetivo é utilizar o Gemini para analisar imagens e retornar resultados. A aplicação é construída com Express.js e TypeScript, usa o Prisma ORM para persistência de dados, Redis como cache temporário para armazenar as imagens, além de realizar testes automatizados com Jest.

## Funcionalidades

- Recebimento de imagens via requisição no formato base64.
- Leitura das imagens pela IA Gemini e retorno de resultados.
- Armazenamento das imagens no Redis com links temporários para acesso.
- Persistência dos dados no banco de dados via Prisma ORM.
- Testes unitários e de integração com Jest para garantir a integridade da aplicação.

## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- Redis
- Docker
- Jest
- Google Gemini AI

## Requisitos

- Docker instalado na máquina.
- API Key da Google Gemini AI.

## Instalação e Execução

1. Clone o Repositório
```bash
  git clone git@github.com:pedro-henrique-a-silva/integracao-gemini-express.git

```

```bash
  cd integracao-gemini-express
```
2. Configurações Iniciais

> ⚠️ Atenção: Você precisará criar o arquivo .env a partir do .env.exemplo disponível no projeto. Este arquivo contém as variáveis de ambiente necessárias para o funcionamento correto da aplicação, como credenciais de API e configurações de banco de dados.

Você pode fazer isso com o comando abaixo:

```bash
cp .env.exemplo .env
```
Edite o arquivo .env conforme suas necessidades, preenchendo as variáveis como a API Key do Google Gemini.

3. Suba os Containers com Docker

Após a configuração do arquivo .env, basta executar o comando abaixo para iniciar a aplicação com Docker:

```bash
docker-compose up -d
```
Isso iniciará todos os serviços necessários, como o banco de dados MySql e o Redis, juntamente com a aplicação.

> ⚠️ Atenção: O processo de iniciar todos os containers pode demorar um pouco, mas não se preocupe, a API estará funcionando assim que o banco de dados estiver operacional.

4. Acesso à Aplicação

A aplicação estará disponível em http://localhost:3001.


Você pode acompanhar os logs da API através desse comando:

```bash
docker logs --tail 1000 -f backend
```

Quando aparecer no terminal uma mensagem como esta.

```bash
Server is running on http://localhost:3001
```
Então a api está rodando normalmente.

Também é possivel entrar no container para ter acesso ao com o comando abaixo:

```bash
docker exec -it backend sh
```

### Rotas da API

#### Upload de uma Imagem

`POST /upload`

Faz o upload de uma imagem e retorna um link temporário para acessá-la externamente.

#### Confirmar uma Leitura

`PATCH /confirm`

Confirma a leitura de uma imagem enviada para a IA.

#### Listar Leituras

`GET /:customerId/list`

Lista todas as leituras realizadas e armazenadas no banco de dados.

## Testes

Para rodar os testes, execute:

```bash
npm run test
```

> ❗Obervação: Os testes não precisam ser executados dentro do container.

## Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades.

