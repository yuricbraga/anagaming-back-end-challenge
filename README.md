# Desafio Engenheiro Back-End Pleno

Esta aplicação vai de acordo com o desafio proposto pela Ana Gaming. Duas aplicações que conversam entre si usando RabbitMQ, garantindo modularidade enquanto microsserviços e separando responsabilidades.

## Configuração

As aplicações usam Docker Compose para garantir replicabilidade da stack, independente da máquina a ser utilizada. O arquivo de desenvolvimento (`docker-compose.yaml`) pode ser encontrado na raiz do projeto, com sugestões do autor de configurações para início rápido do desenvolvimento e atualização imediata ao ser editado qualquer arquivo dentro do diretório `./src` de cada aplicação.

Para implantação em produção, é necessário um arquivo `docker-compose-prod.yaml`, que foi configurado para ser ignorado pelo git, para evitar que segredos da companhia sejam compartilhados acidentalmente. Um arquivo `docker-compose-prod-template.yaml` foi incluido, onde deve-se fazer uma cópia e editar as variáveis que contem comentários logo após.

Comandos relevantes:

- Iniciar ambiente de desenvolvimento:
  ```bash
  docker compose up --build
  ```

- Iniciar ambiente de produção:
  ```bash
  docker compose -f docker-compose-prod.yaml up --build
  ```

## Como utilizar

Dado que a aplicação é voltada para back-end, não há uma interface de usuário que possa ser utilizada afim de demonstrar funcionamento. A sugestão do autor é que seja usado o Postman para testar a rota da aplicação `receive` e para averiguar o estado do banco de dados o MongoDB Compass. Segue abaixo um snipped em curl que pode ser importado no Postman.

```bash
curl --location 'localhost:3000/uploadcsv' \
--form 'file=@"caminho do arquivo csv"'
```

## Agradecimentos finais

Obrigado à Ana Gaming pela oportunidade. Não sou um profissional de infraestrutura e poder configurar ambientes usando Docker foi um aprendizado e tanto.