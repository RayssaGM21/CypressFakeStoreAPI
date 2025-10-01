## Projeto de Testes Automatizados - Fake Store API

Este projeto tem como objetivo aplicar **testes automatizados de API** utilizando o **Cypress** com abordagem **BDD (Behavior-Driven Development)**, simulando interações com a [Fake Store API](https://fakestoreapi.com).

Os testes estão organizados por funcionalidades e seguem a estrutura **Gherkin** (`Dado`, `Quando`, `Então`) nos testes.

---

### Funcionalidades testadas

Abaixo estão as funcionalidades da Fake Store API cobertas neste projeto:

| Funcionalidade             | Testes implementados                                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Produtos** (`/products`) | - Listagem de todos os produtos<br>- Filtro com `limit` e `sort`<br>- Buscar por ID (válido, inexistente, inválido)<br>- Listar categorias<br>- Listar por categoria<br>- Criar, atualizar e excluir produtos |
| **Carrinhos** (`/carts`)   | - Listar todos os carrinhos<br>- Buscar carrinho por ID<br>- Criar novo carrinho                                                                                                                              |
| **Usuários** (`/users`)    | - Listar todos os usuários<br>- Buscar usuário por ID                                                                                                                                                         |

---

### Tecnologias utilizadas

* [Cypress](https://www.cypress.io/) (versão 15 ou superior recomendada)
* Node.js (versão 20+)
* Fake Store API ([https://fakestoreapi.com](https://fakestoreapi.com))

---

### Como executar os testes

1. Clone o repositório:

   ```bash
   git clone https://github.com/RayssaGM21/CypressFakeStoreAPI.git
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute os testes:

   * Modo interativo:

     ```bash
     npx cypress open
     ```
   * Modo headless (terminal):

     ```bash
     npx cypress run
     ```

---

### Discentes

| Nome do Discente | RA        |
| ---------------- | --------- |
| Maisa Amaral    | 1997058 |
| Rayssa Gomides Marconato   | 2001130 |
| Samara Adorno     | 2001639 |

---

### Matéria

**Teste e Qualidade de Software**