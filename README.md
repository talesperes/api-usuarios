# API RESTful

## Sobre

Projeto desenvolvido para a Paketá Academy, utilizando NodeJS e Express afim de criar uma API RESTful para cadastro de usuários em um banco de dados MongoDB.

## Scripts

Basta rodar o script abaixo para subir a aplicação local na sua maquina na porta 8080:

```
npm start
```

## Requisições

#### Recupera todos usuários cadastrados / insere um novo usuário [GET | POST]
```
/api/v1/users
```
#### Recupera/deleta um usuário pelo CPF [GET | DELETE]

```
/api/v1/users/:cpf
```
#### Realiza login para gerar token de autenticação [POST]

```
/api/v1/login
```