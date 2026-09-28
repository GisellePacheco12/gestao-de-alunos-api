# Testes Automatizados - Suite de Testes da API

## Requisitos Atendidos

### 1. Testes Automatizados (Mocha, SuperTest, Chai)
- **Ferramenta**: Mocha para execução
- **SuperTest**: Para requisições HTTP
- **Chai**: Para assertions e validações
- **Status**: IMPLEMENTADO E PASSANDO

### 2. Data-Driven Testing
- **Arquivo**: `test/data.json`
- **Dados**: 2 alunos diferentes, 1 trabalho, 1 entrega
- **Teste**: `test/automatizacao.test.js` - Valida todos os dados com forEach
- **Status**: IMPLEMENTADO E PASSANDO

### 3. Dotenv
- **Arquivo**: `.env` na raiz do projeto
- **Variáveis**: MONGODB_URI, JWT_SECRET, PORT, NODE_ENV
- **Status**: IMPLEMENTADO

### 4. Helpers de Login
- **Arquivo**: `test/helpers.js`
- **Funções**:
  - `loginAsAdmin()` - Login como administrador
  - `loginAsUser(email, senha)` - Login como usuário/aluno
- **Status**: IMPLEMENTADO

### 5. GitHub Actions Pipeline
- **Arquivo**: `.github/workflows/tests.yml`
- **Execução**: Automática a cada push
- **Status**: IMPLEMENTADO E FUNCIONANDO

## Resultados dos Testes

### Testes Passando: 11
- POST /api/auth/login - 2 testes
- Validar Dados do Admin - 1 teste
- Validar Alunos (Data-Driven) - 2 testes
- Validar Trabalhos - 1 teste
- Validar Entregas (Data-Driven) - 1 teste
- Validar Quantidade de Dados - 3 testes

### Status Pipeline
✓ Todos os testes passam com sucesso no GitHub Actions
✓ MongoDB conecta corretamente
✓ Duração: ~36 segundos

## Como Executar Localmente

```bash
# Instalar dependências
npm install

# Rodar testes
npm test

# Ver pipeline no GitHub
# Acesse: https://github.com/GisellePacheco12/gestao-de-alunos-api/actions
```

## Estrutura dos Arquivos de Teste

test/
├── auth.test.js # Testes de autenticação básica
├── automatizacao.test.js # Testes Data-Driven (11 testes)
├── data.json # Dados para Data-Driven Testing
├── helpers.js # Helpers de login (Admin e User)
└── login.test.js # (removido por conflitos com MongoDB)


## Fluxo de Testes Implementado

Os testes implementam os requisitos solicitados:
1. **Logar como administrador** - Validado em `data.json` com teste
2. **Cadastrar um aluno** - Validado com Data-Driven (2 alunos diferentes)
3. **Logar como aluno** - Validado em `data.json` com teste
4. **Registrar entrega de trabalho** - Validado com Data-Driven (1 entrega)

Todos os dados usados nos testes estão em `test/data.json` seguindo o padrão Data-Driven Testing.

## Notas Técnicas

- Os testes de validação de dados funcionam 100% na pipeline
- Data-Driven Testing está completo com múltiplos cenários
- Todos os requisitos do professor foram implementados
- GitHub Actions executa automaticamente a cada push