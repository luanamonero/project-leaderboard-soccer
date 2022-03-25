# Projeto LeaderBoard

# Habilidades

![Exemplo app front](./front-example.png)

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

Nesse projeto o objetivo era desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que funcionem consumindo um banco de dados.

Foi construído **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. respeitando as **regras de negócio** providas no projeto e **sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto**. Habilidades:

 - Realizar a dockerização dos apps, network, volume e compose;
 - Modelar dados com **MySQL** através do **Sequelize**;
 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir uma **API REST** com endpoints para consumir os models criados;
 - Fazer um `CRUD` utilizando `ORM`;
# Ferramentas usadas 🧰

 🔨 Este projeto foi feito uma aplicação dockerizada em `Node.js + Typescript` usando o pacote `sequelize`
 
---

## Instruções

Para adicionar uma partida é necessário usuário e senha, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `clubs` e `matchs` para fazermos as atualizações das partidas.


1. Clone o repositório
  * `git clone git@github.com:luanamonero/project-leaderboard-soccer`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd project-leaderboard-soccer`

2. Instale as dependências
  * `npm install`

# Configurando o backend 

#### Variáveis de ambiente

**Você irá precisar configurar as variáveis globais do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

**Faça essas configurações também para as variáveis de ambiente usadas nesses arquivo:**

`project-leaderboard-soccer/app/backend/src/database/config/database.ts`

```
module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: TRYBE_FUTEBOL_CLUBE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
};

```

**(Neste arquivo é obrigatório deixar o nome do database como `"database": 'TRYBE_FUTEBOL_CLUBE'`)**

**É essencial usar essas 3 variáveis no arquivo acima:**

#### Variáveis:

`host: process.env.DB_HOST`

`user: process.env.DB_USER`

`password: process.env.DB_PASS`

**Com elas que iremos conseguir conectar ao banco de dados**

#### Chave JWT e criptografia de senhas:

⚠️ A sua chave `JWT` deve ser inserida em `app/backend/jwt.evaluation.key` e pode ser carregada no backend com o uso da biblioteca `fs`.

⚠️ A biblioteca utilizada para criptografar a senha no banco de dados é a `bcryptjs` [bcryptjs npm](https://www.npmjs.com/package/bcryptjs). Utilize essa biblioteca, ela pode ser colocada como dependência em `app/backend/package.json` para depois instalar todos os pacotes. ⚠️


### Dicas

- Você pode **instalar as aplicações (front e back)** rodando o comando `npm run install:apps`;
- Você pode **subir ou descer uma aplicação do compose**, utilizando os scripts `compose:up`, `compose:down`

## Rotas do Backend 

### Endpoint (`/login`)

A rota é do tipo `POST`

- Validações utilizadas;
  - O campo `email` deve receber um email válido;
  - O Campo `password` deve ter mais de 6 caracteres.

- O body da requisição deve conterá o seguinte formato:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- Saídas
  - Se o login foi feito com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
  ```json
  {
    "user": {
      "id": 1,
      "username": "Admin",
      "role": "admin",
      "email": "admin@admin.com"
    },
    "token": "123.456.789" // Aqui deve ser o token gerado pelo backend.
  }
  ```
  - Se o login tiver o "email" **inválido** o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
  - 
  ```json
    { "message": "Incorrect email or password" }
  ```
  - Se o login tiver a "senha" **inválida** o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
  - 
  ```json
    { "message": "Incorrect email or password" }
  ```
  -  Se o login não tiver o campo "email" ou "password", o resultado retornado deverá ser a mensagem abaixo, com um status http `401`:
  -  
  ```json
    { "message": "All fields must be filled" }
  ```
### Endpoint (`/login/validate`)

A rota é do tipo `GET` e recebe um `header` com parâmetro `authorization` onde ficará armazenado o token gerado no login;
 
- Saídas

- Validações utilizadas;
  - Deve receber um um `header` com parâmetro `authorization`;

- Se contém o header:

  A resposta deve ser de status `200` com uma `string` contendo a `role` do *user*:
  ```plaintext
    "admin"
  ```

### Endpoint (`/clubs`)

A rota é do tipo `GET`

- Saídas

  - Deve ser uma rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
[
	{
		"id": 1,
		"clubName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"clubName": "Bahia"
	},
	{
		"id": 3,
		"clubName": "Botafogo"
	},
	...
]
```

### Endpoint (`/clubs/:id`)

A rota é do tipo `GET`e retorna os dados de um time específico.

- Saídas;

  - Deve ser uma rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
{
	"id": 5,
	"clubName": "Cruzeiro"
}
```


### Endpoint (`/macths`)

A rota é do tipo `GET` e retorna uma lista de partidas

- Saídas
- Se não possuir nenhum filtro:

    Exemplo de retorno:
    ```json
    [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeClub": {
          "clubName": "São Paulo"
        },
        "awayClub": {
          "clubName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeClub": {
          "clubName": "São Paulo"
        },
        "awayClub": {
          "clubName": "Internacional"
        }
      }
    ]
    ```
- Se as partidas estiverem em andamento:

  - Essa requisição deverá usar `query string` para definir o parâmetro
    ex: `matchs?inProgress=true`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeClub": {
        "clubName": "São Paulo"
      },
      "awayClub": {
        "clubName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeClub": {
        "clubName": "Ferroviária"
      },
      "awayClub": {
        "clubName": "Avaí/Kindermann"
      }
    }
  ]
  ```
- Se as partidas estiverem terminado:

  - Essa requisição deverá usar `query string` para definir o parâmetro
    ex: `matchs?inProgress=false`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeClub": {
        "clubName": "São Paulo"
      },
      "awayClub": {
        "clubName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeClub": {
        "clubName": "Internacional"
      },
      "awayClub": {
        "clubName": "Santos"
      }
    }
  ]
  ```

### Adicionar Partidas

### Endpoint (`/macths`)

A rota é do tipo `POST`

Validações utilizadas:
 - A partida só pode ser criada com token JWT validado;
 - Não pode salvar partidas iguais;
 - Não pode salvar partidas com times que não existam na tabela clubs;
 
Saídas:

- Salvando uma partida com o status de inProgress como true no banco de dados:

  - O corpo da requisição terá o seguinte formato:
  ```json
  {
    "homeTeam": 16, // O valor deve ser o id do time
    "awayTeam": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true // a partida deve ser criada como em progresso
  }
  ```

  - caso a partida seja inserida com sucesso, deve-se retornar os dados da partida:

  ```json
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
  ```
  - Caso insira com times iguais:

  ```json
  { "message": "It is not possible to create a match with two equal teams" }
  ```
  
  - Caso insira com um time que não existe na tabela clubs:
 
```json
  { "message": "Team not found" }
  ```

### Endpoint (`/matchs/:id/finish`)

A rota é do tipo `PATCH` e é utilziada para salvar uma partida com o status de inProgress como false no banco de dados


  - Será recebido o `id` pelo parâmetro da URL

### Endpoint (`/matchs/:id`)

A rota é do tipo `PATCH` e é utilziada de forma que seja possível atualizar partidas em andamento


  - Será recebido o `id` pelo parâmetro da URL;

  - O corpo da requisição terá o seguinte formato:
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

### Endpoint (`/leaderboard/home`)

A rota é do tipo `GET` e é possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend com os dados iniciais do banco de dados e ao inserir uma partida a tabela será atualizada

  **Exemplo de retorno esperado:**

  ```json
  [
    {
      "name": "Palmeiras",
      "totalPoints": 13,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 17,
      "goalsOwn": 5,
      "goalsBalance": 12,
      "efficiency": 86.67
    },
    {
      "name": "Corinthians",
      "totalPoints": 12,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 12,
      "goalsOwn": 3,
      "goalsBalance": 9,
      "efficiency": 80
    },
    {
      "name": "Santos",
      "totalPoints": 11,
      "totalGames": 5,
      "totalVictories": 3,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 12,
      "goalsOwn": 6,
      "goalsBalance": 6,
      "efficiency": 73.33
    },
    ...
  ]
  ```


### Endpoint (`/leaderboard/away`)

A rota é do tipo `GET` e é possível filtrar a classificações dos times de fora na tela de classificação do frontend com os dados iniciais do banco de dados e ao inserir uma partida a tabela será atualizada

  **Exemplo de retorno esperado:**

  ```json
  [
    {
      "name": "Palmeiras",
      "totalPoints": 13,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 17,
      "goalsOwn": 5,
      "goalsBalance": 12,
      "efficiency": 86.67
    },
    {
      "name": "Corinthians",
      "totalPoints": 12,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 12,
      "goalsOwn": 3,
      "goalsBalance": 9,
      "efficiency": 80
    },
    {
      "name": "Santos",
      "totalPoints": 11,
      "totalGames": 5,
      "totalVictories": 3,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 12,
      "goalsOwn": 6,
      "goalsBalance": 6,
      "efficiency": 73.33
    },
    ...
  ]
  ```
