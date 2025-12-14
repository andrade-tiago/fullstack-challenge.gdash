# :crossed_swords: GDASH Junior Full Stack Challenge

Este repositório é destinado à resolução do Desafio para o processo seletivo GDASH 2025/02, disponível [aqui](https://github.com/GDASH-io/desafio-gdash-2025-02).

## :label: Sobre o desafio

O desafio consiste na coleta de dados meteorológicos a partir do consumo de uma API Rest de terceiros (neste caso, a [Open-Meteo](https://open-meteo.com/)) por um serviço em Python. Este serviço, então, deve enviar os dados coletados para um Message Broker — neste caso, uma fila do RabbitMQ.

Após, um serviço em Go consumirá desta fila e enviará os dados para uma API Rest desenvolvida com NestJS, através de uma requisição HTTP.

O serviço em NestJS é o núcleo da aplicação, dividido em dois principais módulos: Usuários, responsável pela gestão dos usuários cadastrados, do qual também deriva o módulo de Autenticação; e Clima, responsável por receber os dados do serviço anterior, disponibilizá-los e oferecer insights gerados por IA. Para todos estes, MongoDB é o banco utilizado para a persistência dos dados.

A aplicação, finalmente, é servida por uma SPA (Single-Page Application), uma aplicação web desenvolvida sobre o React e que apresenta relação direta com a API em NestJS.

Desta forma, temos uma arquitetura baseada em microsserviços, com o Docker e o Docker Compose responsáveis por sustentar toda a infraestrutura.

> Veja o resumo das [principais tecnologias utilizadas](#tecnologias-principais).

## :iphone: Principais funcionalidades

- Dashboard climático: visualização em gráfico e em tabela dos últimos dados clímáticos coletados pelo serviço provedor, além de uma síntese gerada por IA;
- CRUD de usuários: visualização em tabela + paginação dos usuários cadastrados, com as opções de exclusão, atualização e criação de novos usuários. Disponível para usuários administradores;
- Interface responsiva, pensada primariamente para celulares (mobile-first) e facilmente adaptável para telas maiores, como tablets e desktops.

## :cd: Como executar?

### Requisitos

Para rodar todos os 6 serviços que compõem a infraestrutura da aplicação, juntos ou individualmente, você precisará do **Docker** e do **Docker Compose** instalados em sua máquina. Você pode encontrar o conjunto no [site oficial](https://www.docker.com/).

### Executando tudo

Para rodar todos os serviços, copie o repositório para sua máquina e, na pasta raiz, com o terminal de sua preferência, execute o seguinte comando:

```bash
docker compose up -d
```

> [!IMPORTANT]
> Você precisará definir as variáveis de ambiente, conforme o arquivo `.env.example` presente na pasta raiz de cada serviço do diretório `apps`. Na prática, crie um arquivo `.env` junto ao `.env.example` de cada diretório, mas com dados válidos.

Os seguintes serviços estarão acessíveis nas respectivas portas:
- NestJS: `3000`
- Front-end web: `4173`
- Painel de gerenciamento do RabbitMQ: `15672`

Além destas, outras portas estarão ocupadas para a comunicação com:
- MongoDB: `27017`
- RabbitMQ: `5672`

### Executando separadamente

Para executar cada serviço individualmente, basta executar o seguinte comando:

```bash
docker compose up -d <servico> (<servico_2> ... <servico_X>) 
```

Temos os seguintes serviços:
- `weather-data-provider-ms`: serviço em Python;
- `message-consumer-ms`: serviço em Go;
- `api-ms`: NestJS;
- `web-app-ms`: front-end web;
- `rabbitmq`: RabbitMQ; e
- `mongo`: MongoDB.

Ao executar um serviço separadamente, todos os serviços dos quais este depende serão também executados. Por exemplo, digamos que eu queira executar o serviço em Go:

```bash
docker compose up -d message-consumer-ms
```

Automaticamente subirão com ele os serviços:
- `rabbitmq`, do qual ele consome os dados;
- `api-ms`, para onde os dados são enviados; e
- `mongo`, do qual depende `api-ms` para a armazenagem dos dados, gerando, portanto, uma dependência indireta.

### Uso

Para interagir como um usuário final, acesse o front-end em sua rede local, conforme a porta mencionada. Na prática, cole a seguinte URL no navegador de sua preferência:

```
http://localhost:4173/
```

Para acessar a documentação Swagger da API NestJS, acesse:

```
http://localhost:3000/docs
```

Se quiser acessar o painel de controle do RabbitMQ, acesse:

```
http://localhost:15672/
```

### :round_pushpin: Importante: Primeiro Acesso

Para conseguir interagir com a aplicação, você precisará de pelo menos um usuário cadastrado, para então fazer o login.

Para cadastrar o primeiro usuário automaticamente, execute em seu terminal, no diretório raiz da aplicação, o seguinte comando:

```bash
docker compose exec api-ms pnpm run first
```

Este comando utilizará o gerenciador de pacotes do PNPM para executar o script `first`, presente na aplicação NestJS, que estará rodando dentro de um contêiner Docker. O script rodará uma seed que criará o primeiro usuário administrador, caso inexistente. Então, basta fazer o login com as seguintes credenciais:
- E-mail: `admin@email.com`
- Senha: `Admin@1234`

Você deve ver o dashboard climático depois disso. :rocket:

## :gem: Principais tecnologias utilizadas

- Serviços:
   1. Python (provedor de dados);
   2. Go (consumidor da fila);
- Web Rest API (core da aplicação): NodeJS:
   - Core: NestJS, TypeScript
   - ODM: Mongoose;
   - Cliente IA: OpenRouter;
   - Gerenciador de pacotes: PNPM;
   - Validações:
      - Variáveis de ambiente: Zod;
      - DTOs de entrada: `class-validator` e `class-transformer`;
- Autenticação: JWT;
- Banco de dados: MongoDB;
- Mensageria: RabbitMQ;
- Front-end web:
   - Core: React, TypeScript, Vite;
   - Interface/Estilização: `shadcn/ui`, Tailwind CSS;
   - Gerenciamento de estados globais: Context API (nativa);
   - Cliente HTTP: Axios;
   - Roteamento: React Router DOM;
   - Cacheamento das requisições: Tanstack Query (React Query);
   - Gerenciador de pacotes: PNPM;
   - Formulários: React Hook Form;
   - Validações: Zod;
   - Outros: `dayjs`;
- Infraestrutura: Docker, Docker Compose.
