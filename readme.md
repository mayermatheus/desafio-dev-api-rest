# Passos para execução local
Collection: https://www.getpostman.com/collections/f6d77a6f523571759d9d

Instalar as bibliotecas do projeto através do comando abaixo
```
yarn install
```
Criar o arquivo .env na raiz copiando os valores das env's do arquivo .env.example.

Criar o banco de dados chamando bank (Como ponto de **melhoria** poderíamos ter criado esse banco em um script no docker-compose)

Rodar o comando abaixo para executar os testes (Foram implementados apenas os testes de ***integração***)
```
yarn test
```

Para subir o servidor, é necessário executar o comando abaixo: (É necessário preencher os valores no arquivo .env conforme exemplificado no arquivo .env.example)
```
yarn dev
```

Observação: O comando acima irá executar as migrações. Em ambiente de produção não é recomendável essa prática. No caso, deveria ser colocado um step no ci/cd para efetuar a migração e não ficar na responsabilidade da subida do servidor.

Observações:
- Não foi implementado a funcionalidade de deposito.
- Não foi implementado testes unitários
- Não foi implementado a busca da conta pelos parâmetros: número e agência
- Não foi implementado a consulta por extrato (Neste ponto, dependendo do range da consulta, deveria ser implementado uma forma assincrona do envio de dados pelo email por exemplo.)

Pontos de melhorias:
- Retirar a utilização da classe error e utilizar outra estratégia de tratamento de errors. Pois a classe Error do javascript é utilizada para emitir exceções, e como regras de negócios não são exeções, há outras maneiras de realizar essa estratégia.
- Dividir em microservices, visto que há responsabilidades bem divididas, como também a forma de escalar.
- Adicionar testes unitários
- Utilizar o sonar na pipeline para verificar bug's, vulnerabilidades, codigo duplicados e coverage
- Como foi apenas um teste, não foi pensado na questão de autenticação, mas há rotas que sabemos que poderíamos pegar dados do usuário logado no token.
- Adicionar um error handling para não ser preciso repetir código nos services para tratamento de erros de negocio e erros de exceções.
- Utilização do docker e docker-compose para gerenciar as dependencias de infra
# Cenário

A Dock está crescendo e expandindo seus negócios, gerando novas oportunidades de revolucionar o mercado financeiro e criar produtos diferenciados.
Nossa próxima missão é construir uma nova conta digital Dock para nossos clientes utilizarem através de endpoints, onde receberemos requisições em um novo backend que deverá gerenciar as contas e seus portadores (os donos das contas digitais).

# Requisitos

- Deve ser possível criar e remover **portadores**
    - Um **portador** deve conter apenas seu *nome completo* e *CPF*
    - O *CPF* deve ser válido e único no cadastro de **portadores**
- As **contas digital Dock** devem conter as seguintes funcionalidades:
    - A conta deve ser criada utilizando o *CPF* do **portador**
    - Uma conta deve ter seu *saldo*, *número* e *agência* disponíveis para consulta
    - Necessário ter funcionalidade para fazer a *consulta de extrato* da conta *por período*
    - Um **portador** pode fechar a **conta digital Dock** a qualquer instante
    - Executar as operações de *saque* e *depósito*
        - *Depósito* é liberado para todas as *contas ativas* e *desbloqueadas*
        - *Saque* é permitido para todas as *contas ativas* e *desbloqueadas* desde que haja *saldo disponível* e não ultrapasse o limite diário de *2 mil reais*

## Regulação obrigatória

- Precisamos *bloquear* e *desbloquear* a **conta digital Dock** a qualquer momento
- A **conta digital Dock** nunca poderá ter o *saldo negativo*


#  Orientações

Utilize qualquer uma das linguagens de programação:
- Java
- Javascript
- Typescript
- Python
- Kotlin
- Golang

Desenvolva o case seguindo as melhores práticas que julgar necessário, aplique todos os conceitos, se atente a qualidade, utilize toda e qualquer forma de governança de código válido. Vamos considerar toda e qualquer implementação, trecho de código, documentação e/ou intenção compartilhada conosco. Esperamos também que o desafio seja feito dentro do tempo disponibilizado e que esteja condizente com a posição pretendida.

É necessário ter o desafio 100% funcional contendo informações e detalhes sobre: como iniciar a aplicação, interagir com as funcionalidades disponíveis e qualquer outro ponto adicional.

## Diferenciais

- Práticas, padrões e conceitos de microservices será considerado um diferencial para nós por existir uma variedade de produtos e serviços dentro da Dock.
- Temos 100% das nossas aplicações e infraestrutura na nuvem, consideramos um diferencial, caso o desafio seja projeto para ser executado na nuvem.
- Nossos times são autônomos e têm liberdade para definir arquiteturas e soluções. Por este motivo será considerado diferencial toda: arquitetura, design, paradigma e documentação detalhando a sua abordagem.

### Instruções
      1. Faça o fork do desafio;
      2. Crie um repositório privado no seu github para o projeto e adicione como colaborador, os usuários informados no email pelo time de recrutameto ;
      3. Após concluir seu trabalho faça um push; 
      4. Envie um e-mail à pessoa que está mantendo o contato com você durante o processo notificando a finalização do desafio para validação.
