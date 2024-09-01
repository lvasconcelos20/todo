# To-Do App com FastAPI e React

Este é um aplicativo de To-Do que permite aos usuários criar, gerenciar e concluir tarefas. O sistema foi desenvolvido com um backend em FastAPI e um frontend em React, proporcionando uma interface moderna e responsiva.

## Funcionalidades

1. **Sistema de Autenticação**
   - Os usuários podem se registrar e fazer login no sistema.
   - A autenticação é gerenciada através de JSON Web Tokens (JWT) para garantir segurança nas sessões.

2. **Formulário de Criação de To-Do (Modal)**
   - Um modal interativo permite a criação de novas tarefas.
   - Cada tarefa (To-Do) inclui um título e uma descrição.
   - É possível marcar as tarefas como concluídas utilizando uma checkbox.
   - As tarefas podem ser deletadas a qualquer momento.

3. **Identificação do Usuário**
   - O nome do usuário logado é exibido na interface, facilitando a identificação da conta ativa.

## Tecnologias Utilizadas

### Backend
- **FastAPI (Python)**: Framework utilizado para construção da API.
- **SQLite**: Banco de dados utilizado para armazenar as informações do aplicativo.
- **Tortoise ORM**: Ferramenta de mapeamento objeto-relacional utilizada para interagir com o banco de dados.
- **JWT (JSON Web Tokens)**: Implementado para autenticação de usuários e gerenciamento de sessões.

### Frontend
- **React**: Biblioteca JavaScript utilizada para construção da interface do usuário.
- **Typescript**: Linguagem utilizada para garantir a tipagem estática e melhorar a qualidade do código.
- **Styled-components**: Biblioteca para estilização dos componentes, permitindo o uso de CSS em JavaScript de forma eficiente e modular.

## Como Executar o Projeto

### Backend

1. Clone o repositório e navegue até o diretório `server`.
2. Instale as dependências necessárias:
   ```bash
   pip install -r requirements.txt
