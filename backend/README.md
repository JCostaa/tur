# Backend - Sistema Tur

Backend do Sistema Tur implementado com TypeORM, seguindo uma arquitetura em camadas com separação clara de responsabilidades.

## Arquitetura

### Estrutura de Pastas

```
src/
├── config/          # Configurações (banco de dados, etc.)
├── controllers/     # Controladores que chamam os services
├── entities/        # Entidades do TypeORM
├── middleware/      # Middlewares (autenticação, etc.)
├── routes/          # Definição das rotas
├── services/        # Lógicas de negócio isoladas
└── utils/           # Utilitários
```

### Camadas da Aplicação

1. **Routes** - Definição das rotas HTTP
2. **Controllers** - Recebem requisições e chamam os services
3. **Services** - Contêm toda a lógica de negócio
4. **Entities** - Modelos de dados do TypeORM
5. **Middleware** - Autenticação e autorização

## Tecnologias Utilizadas

- **TypeORM** - ORM para gerenciamento do banco de dados
- **Express.js** - Framework web
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **Multer** - Upload de arquivos
- **Express Validator** - Validação de dados

## Entidades

### User
- Gerenciamento de usuários
- Autenticação e autorização
- Relacionamento com arquivos

### Content
- Conteúdo dinâmico do site
- Tipos de conteúdo
- Status ativo/inativo

### Menu
- Estrutura de navegação
- Suporte a hierarquia (parent/child)
- Ordenação personalizada

### Setting
- Configurações do sistema
- Chave-valor
- Tipos de configuração

### File
- Gerenciamento de arquivos
- Upload e download
- Relacionamento com usuários

## Services

### UserService
- Autenticação e validação de tokens
- CRUD de usuários
- Hash de senhas

### ContentService
- Gerenciamento de conteúdo
- Busca e filtros
- Toggle de status

### MenuService
- Estrutura hierárquica
- Reordenação
- Árvore de menu

### SettingService
- Configurações como objeto
- Atualização em lote
- Filtros por tipo

### FileService
- Upload e download
- Estatísticas
- Busca por tipo/usuário

## Rotas

### Autenticação (`/api/auth`)
- `POST /login` - Login
- `POST /register` - Registro
- `GET /validate` - Validar token

### Conteúdo (`/api/content`)
- `GET /` - Listar conteúdo
- `GET /type/:type` - Por tipo
- `GET /search` - Buscar
- `POST /` - Criar
- `PUT /:id` - Atualizar
- `DELETE /:id` - Deletar
- `PATCH /:id/toggle` - Toggle status

### Menu (`/api/menu`)
- `GET /` - Listar itens
- `GET /tree` - Estrutura hierárquica
- `POST /` - Criar item
- `PUT /:id` - Atualizar
- `DELETE /:id` - Deletar
- `POST /reorder` - Reordenar

### Configurações (`/api/settings`)
- `GET /` - Listar configurações
- `GET /key/:key` - Por chave
- `POST /` - Criar
- `PUT /:id` - Atualizar
- `PATCH /key/:key` - Atualizar por chave
- `POST /bulk-update` - Atualização em lote

### Upload (`/api/upload`)
- `GET /` - Listar arquivos
- `GET /stats` - Estatísticas
- `POST /` - Upload
- `GET /:id/download` - Download
- `DELETE /:id` - Deletar

## Middleware

### Autenticação
- `authMiddleware` - Verifica token JWT
- `adminMiddleware` - Verifica role admin
- `optionalAuthMiddleware` - Autenticação opcional

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp env.example .env
```

3. Execute as migrations:
```bash
npm run migration:run
```

4. Execute o servidor:
```bash
npm run dev
```

## Migrations

O sistema usa TypeORM migrations para gerenciar mudanças no banco de dados.

### Comandos Disponíveis

- `npm run migration:generate -- src/migrations/NomeDaMigration` - Gerar nova migration
- `npm run migration:run` - Executar migrations pendentes
- `npm run migration:revert` - Reverter última migration
- `npm run migration:show` - Mostrar status das migrations
- `npm run schema:sync` - Sincronizar schema (apenas desenvolvimento)
- `npm run schema:drop` - Dropar todas as tabelas (cuidado!)

### Estrutura das Migrations

As migrations são criadas automaticamente na pasta `src/migrations/` com timestamp único.

### Migrations Iniciais

1. **CreateInitialTables** - Cria todas as tabelas do sistema
2. **InsertDefaultData** - Insere dados padrão (admin user, settings, menu)

## Banco de Dados

O TypeORM irá criar automaticamente as tabelas baseadas nas entidades. Os dados padrão serão inseridos na primeira execução.

## Autenticação

O sistema usa JWT para autenticação. Para acessar rotas protegidas, inclua o header:
```
Authorization: Bearer <token>
```

## Upload de Arquivos

Arquivos são salvos na pasta `uploads/` e referenciados no banco de dados. Tipos permitidos:
- Imagens: JPEG, PNG, GIF, WebP
- Documentos: PDF, DOC, DOCX
- Texto: TXT, CSV

Limite de tamanho: 10MB por arquivo. 