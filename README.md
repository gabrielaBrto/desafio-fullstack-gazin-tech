## Instalação de dependências
Após clonar o repositório na raiz do projeto execute os comandos:
* composer install  
* npm install  

## Configurar arquivo env 
Após instalar as dependências necessárias no passo anterior, na raiz do projeto
você ira encontrar um arquivo .env.example que você ira renomear apenas para .env,
nele você ira adicionar o nome da base de dados em: DB_DATABASE

## Gerar chave do projeto 
Após configurar o arquivo .env com o nome da base de dados execute o comando key:generate
para que seja gerada uma chave(APP_KEY) no arquivo .env
* php artisan key:generate  

## Executar migrations
Execute o comando abaixo para criar as tabelas de que irão popular o banco(níveis e desenvolvedores)
* php artisan migrate

## Executar o projeto
Em um terminal execute o comando abaixo para rodar a api
* php artisan serve  

Em outro terminal execute o comando abaixo para rodar a aplicação
* npm run watch  

Após seguir todos estes passos é só abrir o seu navegador e acessar: http://127.0.0.1:8000/
