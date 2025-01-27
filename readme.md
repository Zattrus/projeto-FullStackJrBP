# Sistema de Agendamentos - Reserva BP

Este é o sistema de agendamentos Reserva BP, desenvolvido pensando na facilidade e usabilidade que o usuario terá ao utilizar o sistema.
Foi utilizado as seguintes tecnologias: Node.js, React.js, TypeScript e MongoDB, utilizando Docker para facilitar o setup do banco de dados.

## Pré-requisitos

Antes de começar, certifique-se de que você tenha as seguintes ferramentas instaladas em sua máquina:

1. **[Docker](https://www.docker.com/get-started)**: Necessário para rodar o banco de dados MongoDB.
2. **[Node.js](https://nodejs.org/)**: Ambiente de execução para JavaScript/TypeScript. Recomendo a versão LTS.
3. **[Git](https://git-scm.com/)**: Sistema de controle de versão distribuído.
4. **[yarn](https://yarnpkg.com/)**: Gerenciador de pacotes para o Node.js. Opcional, mas recomendado.
---

## Passo a Passo de Configuração

Siga os passos abaixo para configurar o projeto em sua máquina:

### 1. Instalar o Docker
- Acesse o site oficial do [Docker](https://www.docker.com/get-started) e faça o download da versão adequada para o seu sistema operacional.
- Siga o guia de instalação do Docker.
- Após a instalação, verifique se o Docker está funcionando corretamente executando o seguinte comando no terminal:
  ```bash
  docker --version
  ```
### 2. Instalar o Node.js
- Acesse o site oficial do [Node.js](https://nodejs.org/) e faça o download da versão LTS.
- Siga o guia de instalação do Node.js.
- Após a instalação, verifique se o Node.js e o npm estão funcionando corretamente executando os seguintes comandos no terminal:
  ```bash
  node --version
  npm --version
  ```
### 3. Clonar o repositório
- Clone este repositório para a sua máquina local utilizando o seguinte comando no terminal:
  ```bash
  git clone https://github.com/seu-usuario/reserva-bp.git
  ```
- Navegue até o diretório do projeto:
  ```bash
  cd reserva-bp
  ```
### 4. Instalar as Dependências
- Navegue até o diretório `api` e instale as dependências do servidor:
  ```bash
  cd api
  npm install
  ```
- Navegue até o diretório `front` e instale as dependências do cliente:
  ```bash
  cd front
  npm install
  ```
### Rodando o Projeto
- Volte para o diretório raiz do projeto:
  ```bash
  cd ..
  ```
- No diretório raiz do projeto, suba um container MongoDB com o seguinte comando:
  ```bash
  docker run --name mongoBP -e MONGO_USER=root -e MONGO_PASSWORD=root -p 27017:27017 -d mongo
  ```
- Certifique-se de que o banco de dados está funcionando corretamente.

- Navegue até o diretório `api` e inicie o servidor:
  ```bash
  cd api
  npm run start || yarn start
  ```
- Navegue até o diretório `front` e inicie o cliente:
  ```bash
  cd front
  npm run start || yarn start
  ```
- Acesse a porta que o front ira disponibilizar.

## Observações: 
Caso encontre algum problema, abra uma issue no repositório ou entre em contato. 🚀