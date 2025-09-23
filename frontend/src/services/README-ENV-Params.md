# Parâmetros GET Dinâmicos via Variáveis de Ambiente

Este sistema permite adicionar parâmetros GET automaticamente a todas as requisições através de variáveis de ambiente.

## Como Funciona

O interceptor configurado em `api.ts` e `skoobtur.tsx` automaticamente adiciona parâmetros GET baseados nas variáveis de ambiente definidas no arquivo `.env`.

## Configuração

### 1. Crie um arquivo `.env` na raiz do projeto frontend:

```bash
# ===== CONFIGURAÇÕES DE API =====
VITE_API_URL=https://tur-production.up.railway.app
VITE_SKOOBTUR_API_URL=https://www.skoobtur.com/api/public
VITE_SKOOBTUR_API_KEY=your_api_key_here

# ===== PARÂMETROS GLOBAIS AUTOMÁTICOS =====

# Localização
VITE_CITY=Barra do Bugres
VITE_STATE=MT
VITE_COUNTRY=BR
VITE_REGION=Centro-Oeste

# Configurações de negócio
VITE_BUSINESS_ID=123
VITE_TENANT_ID=tenant_001
VITE_PARTNER_ID=partner_viva_barra

# Configurações de API
VITE_API_VERSION=v1
VITE_LANGUAGE=pt-BR
VITE_CURRENCY=BRL

# Configurações de filtros padrão
VITE_DEFAULT_CATEGORY=turismo
VITE_DEFAULT_SEGMENT=lazer
VITE_DEFAULT_STATUS=active

# Configurações de paginação
VITE_DEFAULT_LIMIT=20
VITE_DEFAULT_PAGE_SIZE=10

# ===== CONFIGURAÇÕES DE LOGO CUSTOMIZADA =====

# URL da logo customizada (se não definida, usa logo padrão /images/teste.png)
VITE_CUSTOM_LOGO_URL=/images/teste.png

# Nome do negócio/empresa
VITE_BUSINESS_NAME=Viva Barra do Bugres

# Mostrar nome junto com a logo (true/false)
VITE_SHOW_BUSINESS_NAME=true
```

### 2. Mapeamento de Variáveis

As variáveis de ambiente são mapeadas para parâmetros de query conforme definido em `globalParams.ts`:

| Variável de Ambiente | Parâmetro de Query | Tipo | Descrição |
|---------------------|-------------------|------|-----------|
| `VITE_CITY` | `city` | string | Cidade |
| `VITE_STATE` | `state` | string | Estado |
| `VITE_COUNTRY` | `country` | string | País |
| `VITE_REGION` | `region` | string | Região |
| `VITE_BUSINESS_ID` | `business_id` | number | ID do negócio |
| `VITE_TENANT_ID` | `tenant_id` | string | ID do tenant |
| `VITE_PARTNER_ID` | `partner_id` | string | ID do parceiro |
| `VITE_API_VERSION` | `version` | string | Versão da API |
| `VITE_LANGUAGE` | `lang` | string | Idioma |
| `VITE_CURRENCY` | `currency` | string | Moeda |
| `VITE_DEFAULT_CATEGORY` | `category` | string | Categoria padrão |
| `VITE_DEFAULT_SEGMENT` | `segment` | string | Segmento padrão |
| `VITE_DEFAULT_STATUS` | `status` | string | Status padrão |
| `VITE_DEFAULT_LIMIT` | `limit` | number | Limite padrão |
| `VITE_DEFAULT_PAGE_SIZE` | `page_size` | number | Tamanho da página |
| `VITE_CUSTOM_LOGO_URL` | - | string | URL da logo customizada |
| `VITE_BUSINESS_NAME` | - | string | Nome do negócio |
| `VITE_SHOW_BUSINESS_NAME` | - | boolean | Mostrar nome junto com logo |

## Comportamento

### Conversão Automática de Tipos

- **Números**: Valores numéricos são convertidos para `number`
- **Booleanos**: "true"/"false" são convertidos para `boolean`
- **Strings**: Outros valores permanecem como `string`

### Prioridade de Parâmetros

1. **Parâmetros específicos da requisição** (têm prioridade máxima)
2. **Parâmetros globais do .env** (adicionados automaticamente)

### Exemplo de Uso

```typescript
// Requisição sem parâmetros específicos
const restaurants = await api.get('/restaurants');
// URL final: /restaurants?city=Barra%20do%20Bugres&state=MT&lang=pt-BR

// Requisição com parâmetros específicos
const restaurants = await api.get('/restaurants', { 
  params: { category: 'fine-dining' } 
});
// URL final: /restaurants?city=Barra%20do%20Bugres&state=MT&lang=pt-BR&category=fine-dining
```

## Debug

Em modo de desenvolvimento, o interceptor registra no console os parâmetros adicionados:

```
🔧 Parâmetros adicionados à requisição: { city: "Barra do Bugres", state: "MT", lang: "pt-BR" }
```

## Adicionando Novos Parâmetros

Para adicionar novos parâmetros globais:

1. **Adicione a variável no `.env`**:
   ```
   VITE_NEW_PARAM=valor
   ```

2. **Adicione o mapeamento em `globalParams.ts`**:
   ```typescript
   const ENV_TO_PARAMS_MAP = {
     // ... outros mapeamentos
     VITE_NEW_PARAM: 'new_param',
   } as const;
   ```

## Observações Importantes

- ✅ Apenas requisições **GET** recebem os parâmetros automáticos
- ✅ Parâmetros vazios ou undefined não são adicionados
- ✅ O sistema funciona tanto para `api.ts` quanto para `skoobtur.tsx`
- ✅ Parâmetros específicos da requisição sempre têm prioridade
- ✅ Conversão automática de tipos (string, number, boolean)
