# API Gera Folha Ponto

Esta API tem a finalidade de receber e validar os campos da request da geração da folha ponto, e em caso de os dados serem válidos, publicar uma mensagem na fila do SQS para efetuar o disparo da função Lambda que gera de fato a planilha.

# Executando

1. Renomeie o arquivo `.env_example` para `.env` e configure as variáveis dentro dele. `mv .env_example .env`.
2. Para executar a aplicação utilizando live-reload (nodemon), execute o comando `yarn dev` ou `npm run dev` para executar . Para executar normal, execute o comando `yarn start` ou `npm run start`.
