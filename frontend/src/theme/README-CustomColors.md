# Sistema de Cores Personalizadas

Este sistema permite configurar cores personalizadas através de variáveis de ambiente, oferecendo flexibilidade para diferentes clientes/projetos, similar ao sistema de logo customizada.

## 🎯 **Como Funciona**

O sistema verifica as variáveis de ambiente e aplica automaticamente:
- **Cores Primárias**: Usadas para botões principais, links e elementos de destaque
- **Cores Secundárias**: Usadas para header, navegação e fundos
- **Cores de Fundo**: Cor de fundo padrão da aplicação
- **Cores de Texto**: Cor principal do texto

## ⚙️ **Configuração no .env**

Adicione estas variáveis no arquivo `.env` do frontend:

```bash
# ===== CONFIGURAÇÕES DE CORES PERSONALIZADAS =====

# Cores primárias (usadas para botões principais, links, destaques)
VITE_PRIMARY_COLOR=#ff6b35
VITE_PRIMARY_LIGHT=#ff8a65
VITE_PRIMARY_DARK=#e55a2b

# Cores secundárias (usadas para header, navegação, fundos)
VITE_SECONDARY_COLOR=#2c5f2d
VITE_SECONDARY_LIGHT=#4a7c59
VITE_SECONDARY_DARK=#1e3d1e

# Cor de fundo padrão (opcional)
VITE_BACKGROUND_COLOR=#ffffff

# Cor do texto principal (opcional)
VITE_TEXT_COLOR=#333333
```

## 📋 **Variáveis Disponíveis**

| Variável | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `VITE_PRIMARY_COLOR` | string | ❌ | Cor primária principal |
| `VITE_PRIMARY_LIGHT` | string | ❌ | Versão clara da cor primária |
| `VITE_PRIMARY_DARK` | string | ❌ | Versão escura da cor primária |
| `VITE_SECONDARY_COLOR` | string | ❌ | Cor secundária principal |
| `VITE_SECONDARY_LIGHT` | string | ❌ | Versão clara da cor secundária |
| `VITE_SECONDARY_DARK` | string | ❌ | Versão escura da cor secundária |
| `VITE_BACKGROUND_COLOR` | string | ❌ | Cor de fundo da aplicação |
| `VITE_TEXT_COLOR` | string | ❌ | Cor principal do texto |

## 🎨 **Esquemas de Cores Pré-definidos**

### 1. Azul Profissional
```bash
VITE_PRIMARY_COLOR=#1976d2
VITE_PRIMARY_LIGHT=#42a5f5
VITE_PRIMARY_DARK=#1565c0
VITE_SECONDARY_COLOR=#424242
VITE_SECONDARY_LIGHT=#6d6d6d
VITE_SECONDARY_DARK=#1b1b1b
```

### 2. Verde Natural
```bash
VITE_PRIMARY_COLOR=#4caf50
VITE_PRIMARY_LIGHT=#81c784
VITE_PRIMARY_DARK=#388e3c
VITE_SECONDARY_COLOR=#ff9800
VITE_SECONDARY_LIGHT=#ffb74d
VITE_SECONDARY_DARK=#f57c00
```

### 3. Roxo Moderno
```bash
VITE_PRIMARY_COLOR=#9c27b0
VITE_PRIMARY_LIGHT=#ba68c8
VITE_PRIMARY_DARK=#7b1fa2
VITE_SECONDARY_COLOR=#e91e63
VITE_SECONDARY_LIGHT=#f06292
VITE_SECONDARY_DARK=#c2185b
```

## 💻 **Como Usar**

### Hook de Cores Personalizadas
```tsx
import { useCustomColors } from '../hooks/useCustomColors';

const MyComponent = () => {
  const colors = useCustomColors();
  
  return (
    <div style={{ color: colors.primary.main }}>
      Texto com cor primária personalizada
    </div>
  );
};
```

### Verificar Se Há Cores Personalizadas
```tsx
import { useHasCustomColors } from '../hooks/useCustomColors';

const MyComponent = () => {
  const { hasAnyCustomColors, hasCustomPrimary } = useHasCustomColors();
  
  if (hasAnyCustomColors) {
    console.log('Usando cores personalizadas!');
  }
};
```

### Usar com Material-UI Theme
```tsx
import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <Button 
      sx={{ 
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        }
      }}
    >
      Botão com cor personalizada
    </Button>
  );
};
```

## 🔧 **Arquitetura Técnica**

### 1. Hook `useCustomColors`
- Lê variáveis de ambiente usando `import.meta.env`
- Retorna cores padrão como fallback
- Memoiza o resultado para performance

### 2. `CustomThemeProvider`
- Provê tema dinâmico baseado no hook
- Substitui o ThemeProvider padrão do Material-UI
- Aplica CssBaseline automaticamente

### 3. Função `createCustomTheme`
- Cria tema Material-UI dinâmico
- Aceita cores personalizadas como parâmetro
- Mantém configurações de tipografia e componentes

## 📊 **Cores de Estado**

As cores de estado (sucesso, aviso, erro) permanecem fixas por serem padrões de UX:
- **Sucesso**: `#4caf50` (verde)
- **Aviso**: `#ff9800` (laranja)
- **Erro**: `#f44336` (vermelho)

## 🔄 **Fallbacks**

Se uma variável não for definida, o sistema usa as cores padrão:
- **Primária**: `#ff6b35` (laranja)
- **Secundária**: `#2c5f2d` (verde)
- **Fundo**: `#ffffff` (branco)
- **Texto**: `#333333` (cinza escuro)

## 🐛 **Debug**

Em modo de desenvolvimento, o console mostra as configurações ativas:
```
🎨 Custom Colors - Configurações: {
  primary: { main: "#1976d2", light: "#42a5f5", dark: "#1565c0" },
  secondary: { main: "#424242", light: "#6d6d6d", dark: "#1b1b1b" },
  hasCustomPrimary: true,
  hasCustomSecondary: true
}
```

## 🎯 **Exemplos Práticos**

### Exemplo 1: Portal Turístico Verde
```bash
VITE_PRIMARY_COLOR=#2e7d32
VITE_SECONDARY_COLOR=#ff8f00
VITE_BUSINESS_NAME=EcoTur Verde
```

### Exemplo 2: Portal Corporativo Azul
```bash
VITE_PRIMARY_COLOR=#1565c0
VITE_SECONDARY_COLOR=#37474f
VITE_BUSINESS_NAME=Turismo Corporativo
```

### Exemplo 3: Portal Praiano
```bash
VITE_PRIMARY_COLOR=#0277bd
VITE_SECONDARY_COLOR=#ff6f00
VITE_BACKGROUND_COLOR=#f1f8e9
VITE_BUSINESS_NAME=Praia Paradise
```

## 🔄 **Migração**

Para aplicar cores personalizadas em um projeto existente:

1. Copie o arquivo `env-example.txt` para `.env`
2. Defina as variáveis de cor desejadas
3. Reinicie o servidor de desenvolvimento
4. As cores serão aplicadas automaticamente em todo o portal

---

**💡 Dica**: Utilize ferramentas como [Coolors](https://coolors.co/) ou [Material Design Color Tool](https://material.io/tools/color/) para criar paletas harmoniosas.

