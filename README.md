# Teste técnico com Playwright, para o site Saucedemo - Luiz Luna.

Aqui estou implementando testes E2E para o site SauceDemo, usando Playwright e TypeScript (Para melhor tipagem e segurança).

Alguns pontos identificados:

1. Como estamos testando um site totalmente estático, sem requisições de backend, não utilizei o timeout dentro dos testes, e nem verificações de newtwork(200, 400, 500, delay na requisição).

2. Utilizei data-testids como boa prática, pois tem menos chances de sofrerem alterações.

### Estrutura usada, seguindo os requesitos:

-   **Page Objects**: Encapsulamento de páginas para reusabilidade
-   **Testes E2E**: Cobertura completa de fluxos principais
-   **Dados Estáticos**: Centralização de dados de teste

### Cenários de testes, que foram cobertos, de acordo com a estrutura do site:

1. **Autenticação/Login**

    - Login com diferentes tipos de usuário
    - Login forçando erro e campos vázios

2. **Inventory/Página de produtos**

    - Ordenação por nome
    - Ordenação por preço
    - Ver se o produto abre e a rota muda, se o usuário clica nele

3. **Carrinho de Compras/Cart**
    - Adicionar e remover itens do carrinho.
    - Continuar navegação após carrinho.
    - Completar o checkout.
    - Erro no formulário e checkout.
    - Ver se os itens continuam no carrinho, após logout do usuário.

## Como executar os testes? É bem simples:

1. **Instalação de dependências**:

    npm install

2. **Executar testes**:

    npm test || npx playwright test

    OBS: Caso queria rodar os teste de um case só , é só especificar a rota. Exemplo: npx playwright test tests/e2e/login.spec.ts

3. **Ver relatório**:

    npm run show-report

## Relatórios gerados automaticamente

-   Screenshots automáticos em falhas
-   Relatório HTML detalhado
-   Traces para debug
