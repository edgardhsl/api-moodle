<br/>
<p align="center">
  <h1 align="center">api-moodle</h1>

  <h3 align="center">Serviço para consumir mensagens do Apache Kafka e integrar os dados com o Moodle.</h3>

  <p align="center">
    Um serviço consumidor que processa e integra dados com o Moodle.
    <br/>
    <br/>
    <br/>
    <a href="https://github.com/edgardhsl/api-moodle/issues">Report Bug</a>
    .
    <a href="https://github.com/edgardhsl/api-moodle/issues">Request Feature</a>
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/edgardhsl/api-moodle?color=dark-green) ![Forks](https://img.shields.io/github/forks/edgardhsl/api-moodle?style=social) ![Stargazers](https://img.shields.io/github/stars/edgardhsl/api-moodle?style=social) ![Issues](https://img.shields.io/github/issues/edgardhsl/api-moodle) 

## Sumário

* [Sobre o projeto](#sobre-o-projeto)
* [Primeiros passos](#primeiros-passos)
  * [Pré-requisitos](#pré-requisitos)
  * [Instalação](#instalação)
* [Uso da aplicação](#uso-da-aplicação)
* [Contribuição](#contribuição)
* [Autores](#autores)

## Sobre o projeto

Este projeto é um dos três microsserviços que estão sendo desenvolvidos para a disciplina de TCC 2. 

O objetivo deste serviço é consumir dados relacionados a cursos, disciplinas e atividades de tópicos no Apache Kafka, processando e integrando esses dados com o ambiente Moodle.

## Primeiros passos

Abaixo segue as instruções de como executar o projeto em seu ambiente.

### Pré-requisitos

Para que as dependências sejam instaladas, você precisa instalar o npm.

O npm é o gerenciador de pacotes padrão para o ambiente de tempo de execução JavaScript Node.js.

* npm

```sh
npm install npm@latest -g
```

### Instalação

1. Clone the repo

```sh
git clone https://github.com/edgardhsl/api-moodle.git
```

2. Instale as dependências do projeto

```sh
npm install
```

3. Configure os dados do ambiente Moodle no arquivo: `src/app/config/credentials.json`

```JS
{
    "endpoint_url": "http://localhost", // URL do ambiente Moodle
    "token": "862663ea5cc19ac196fa14671aeb3b7a" // Token gerado pela API do Moodle
}
```

4. Configure os dados dos brokers do Apache Kafka no arquivo: `src/app/config/kafka_brokers.json`

```JS
[
    {
        "host": "127.0.0.1",
        "port": "9092"
    }
]
```

## Uso da aplicação

Você pode executar o projeto com o comando abaixo:
`npm run dev`

## Contribuição



### Creating A Pull Request

1. Fazer um Fork do Projeto.
2. Crie sua branch do recurso (`git checkout -b feature/AmazingFeature`)
3. Faça o commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Envie para a sua branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull-Request

## Autores

* **Edgard H. Santos Lopes** - *Graduando em Sistemas de Informação* - [Edgard H. Santos Lopes](https://github.com/edgardhsl) - *Projeto completo*
