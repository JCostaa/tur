# Sistema de Parâmetros Globais

Este sistema permite adicionar automaticamente parâmetros GET a todas as requisições HTTP da aplicação usando interceptors do Axios.

## Como Funciona

### 1. Configuração Centralizada
O arquivo `globalParams.ts` contém toda a lógica para obter os parâmetros que devem ser adicionados às requisições.

### 2. Interceptors Automáticos
Os arquivos `api.ts` e `skoobtur.tsx` têm interceptors que automaticamente adicionam os parâmetros globais a todas as requisições.

### 3. Parâmetros Incluídos Automaticamente

#### Localização
- `city`: Cidade selecionada pelo usuário
- `state`: Estado selecionado pelo usuário  
- `region`: Região selecionada

#### Usuário
- `userId`: ID do usuário logado
- `sessionId`: ID da sessão atual
- `deviceToken`: Token do dispositivo para analytics

#### Aplicação
- `lang`: Idioma da aplicação (padrão: pt-BR)
- `appVersion`: Versão da aplicação
- `platform`: Plataforma (web)
- `timezone`: Fuso horário do usuário

#### Negócio
- `userType`: Tipo de usuário (turista, agência, etc.)
- `currency`: Moeda preferida (padrão: BRL)

## Como Usar

### Definir Parâmetros Globais
```typescript
import { setGlobalParam } from './services/globalParams';

// Definir cidade selecionada
setGlobalParam('selectedCity', 'Cuiabá');

// Definir estado
setGlobalParam('selectedState', 'MT');

// Definir tipo de usuário
setGlobalParam('userType', 'turista');
```

### Fazer Requisições Normalmente
```typescript
import api from './services/api';

// Esta requisição automaticamente incluirá os parâmetros globais
const response = await api.get('/accommodations');

// URL final será algo como:
// /api/accommodations?city=Cuiabá&state=MT&lang=pt-BR&userType=turista&currency=BRL
```

### Remover Parâmetros
```typescript
import { removeGlobalParam, clearGlobalParams } from './services/globalParams';

// Remover um parâmetro específico
removeGlobalParam('selectedCity');

// Limpar todos os parâmetros (útil para logout)
clearGlobalParams();
```

### Debug
```typescript
import { debugGlobalParams } from './services/globalParams';

// Ver todos os parâmetros globais atuais
debugGlobalParams();
```

## Personalização

Para adicionar novos parâmetros globais, edite a função `getGlobalParams()` no arquivo `globalParams.ts`:

```typescript
export const getGlobalParams = (): GlobalParams => {
  const params: GlobalParams = {};
  
  // Seus parâmetros personalizados aqui
  const customParam = localStorage.getItem('customParam');
  if (customParam) {
    params.customParam = customParam;
  }
  
  return params;
};
```

## Logs

O sistema inclui logs automáticos no console para debug:
- 🔗 Requisições com parâmetros
- ✅ Respostas bem-sucedidas  
- ❌ Erros de requisição/resposta

## Benefícios

1. **Centralizado**: Todos os parâmetros globais em um lugar
2. **Automático**: Não precisa lembrar de adicionar em cada requisição
3. **Flexível**: Fácil de adicionar/remover parâmetros
4. **Consistente**: Garante que todas as APIs recebam os mesmos parâmetros
5. **Debug**: Logs automáticos para facilitar desenvolvimento

## Exemplo Prático

```typescript
// 1. Usuário seleciona uma cidade
setGlobalParam('selectedCity', 'Cuiabá');
setGlobalParam('selectedState', 'MT');

// 2. Todas as requisições subsequentes incluirão automaticamente:
// ?city=Cuiabá&state=MT&lang=pt-BR&platform=web&currency=BRL&timezone=America/Cuiaba

// 3. Requisições específicas podem adicionar seus próprios parâmetros
const accommodations = await api.get('/accommodations', {
  params: {
    category: 'hotel',
    priceRange: '100-500'
  }
});

// URL final: /api/accommodations?city=Cuiabá&state=MT&lang=pt-BR&platform=web&currency=BRL&timezone=America/Cuiaba&category=hotel&priceRange=100-500
```
