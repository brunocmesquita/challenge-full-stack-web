# Challenge Grupo A - Documentação

## Iniciar a aplicação

Backend: aplicação criada utilizando o Docker.
Para subir o ambiente, é necessário a configuração do arquivo ormconfig.json. Segue um exemplo de configuração abaixo:

```json
{
  "type": "postgres",
  "host": "db",
  "port": 5432,
  "username": "postgres",
  "password": "docker",
  "database": "challenge-api",
  "entities": ["./src/modules/**/typeorm/entities/*.ts"],
  "migrations": ["./src/shared/typeorm/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/typeorm/migrations"
  }
}
```

Ao clonar o projeto, aplicar permissão de execução no script entrypoint.sh.
Para rodar o projeto:

```bash
$ sudo docker-compose up
```

Frontend:

```node
yarn serve

or

npm run serve
```

## Interface Frontend

Para o front, conforme recomendado, foi utilizado o Vue.js. A estilização do client foi criado utilizando o Vuetify.

### Dependências:

- axios

## API

A API, conforme recomendação, foi construída com a utilização do Express. O banco de dados escolhido foi o POSTGRES, com a utilização do Typeorm. Também optei por desenvolver o backend em Typescript.

## Dependências de desenvolvimento:

```json
{
  "@types/cors": "^2.8.12",
  "@types/express": "^4.17.13",
  "@types/node": "^16.11.1",
  "@typescript-eslint/eslint-plugin": "^5.1.0",
  "@typescript-eslint/parser": "^5.1.0",
  "eslint": "^8.0.1",
  "eslint-config-prettier": "6.15.0",
  "eslint-plugin-prettier": "3.2.0",
  "prettier": "^2.4.1",
  "ts-node-dev": "^1.1.8",
  "tsconfig-paths": "^3.11.0",
  "typescript": "^4.4.4"
}
```

## Dependências:

```json
{
  "celebrate": "^15.0.0",
  "cors": "^2.8.5",
  "cpf-cnpj-validator": "^1.0.3",
  "express": "^4.17.1",
  "express-async-errors": "^3.1.1",
  "pg": "^8.7.1",
  "reflect-metadata": "^0.1.13",
  "typeorm": "^0.2.38"
}
```

## O que você melhoraria se tivesse mais tempo

- Melhoraria a qualidade do código no frontend. Separando alguns componentes e desacoplando mais as responsabilidades
- Faria um melhor uso da store no frontend
- Criaria uma camada de autenticação e autorização na api
- Testes unitários
