# WMMoney

**WMMoney** é um sistema financeiro fullstack desenvolvido para registrar débitos e créditos, oferecendo uma API REST robusta com uma interface de usuário interativa.

## Funcionalidades

- **Gerenciamento de Lançamentos**: Registre e categorize receitas e despesas.
- **Dashboard Interativo**: Visualize gráficos e relatórios financeiros.
- **Relatórios em PDF**: Gere relatórios financeiros utilizando JasperReports.

## Tecnologias Utilizadas

### Backend

- **Spring Boot**: Framework principal para a construção da API REST.
- **Spring Data JPA**: Abstração para operações com o banco de dados.
- **Spring Security & OAuth2**: Implementação de autenticação e autorização com tokens JWT.
- **MySQL**: Banco de dados relacional para armazenamento das informações.
- **Maven**: Gerenciador de dependências e automação de build.

### Frontend

- **Angular 2+**: Framework para construção da interface do usuário.
- **PrimeNG**: Biblioteca de componentes UI para Angular.
- **TypeScript**: Superset do JavaScript utilizado no desenvolvimento Angular.
- **HTML & CSS**: Marcação e estilos para a interface.

## Estrutura do Projeto

O repositório está dividido em dois principais diretórios:

- **wmmoney-api**: Contém o código-fonte da API desenvolvida com Spring Boot.
- **wmmoney-ui**: Contém o código-fonte da interface do usuário desenvolvida com Angular.

## Configuração e Execução

### Pré-requisitos

- **Java 8 ou superior**: Necessário para executar a API.
- **Node.js**: Necessário para executar o frontend Angular.
- **MySQL**: Banco de dados para armazenar as informações.

### Backend

1. Clone o repositório:

   ```bash
   git clone https://github.com/williammian/wmmoney.git

2. Navegue até o diretório da API:

   cd wmmoney/wmmoney-api
   
3. Configure o banco de dados MySQL com as credenciais apropriadas.

4. Execute a aplicação Spring Boot:

   mvn spring-boot:run

### Frontend

1. Navegue até o diretório da interface do usuário:

   cd wmmoney/wmmoney-ui

2. Instale as dependências:

   npm install

3. Execute a aplicação Angular:

   ng serve
   
4. Acesse a aplicação no navegador:

   http://localhost:4200

### Licença

   Este projeto está licenciado sob a MIT License.
