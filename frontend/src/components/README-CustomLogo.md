# Sistema de Logo Customizada

Este sistema permite configurar uma logo personalizada através de variáveis de ambiente, oferecendo flexibilidade para diferentes clientes/projetos.

## 🎯 **Como Funciona**

O componente `CustomLogo` verifica as variáveis de ambiente e decide automaticamente:
- **Se há URL de logo**: Exibe a imagem + nome (opcional)
- **Se não há logo**: Exibe apenas o nome do negócio

## ⚙️ **Configuração no .env**

Adicione estas variáveis no arquivo `.env` do frontend:

```bash
# ===== CONFIGURAÇÕES DE LOGO CUSTOMIZADA =====

# URL da logo customizada (opcional - padrão: /images/teste.png)
VITE_CUSTOM_LOGO_URL=/images/teste.png

# Nome do negócio/empresa (obrigatório)
VITE_BUSINESS_NAME=Viva Barra do Bugres

# Mostrar nome junto com a logo (opcional - padrão: true)
VITE_SHOW_BUSINESS_NAME=true
```

## 📋 **Variáveis Disponíveis**

| Variável | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `VITE_CUSTOM_LOGO_URL` | string | ❌ | URL da logo personalizada |
| `VITE_BUSINESS_NAME` | string | ✅ | Nome do negócio |
| `VITE_SHOW_BUSINESS_NAME` | boolean | ❌ | Mostrar texto junto com logo |

## 🎨 **Variantes de Estilo**

O componente suporta diferentes variantes para contextos específicos:

- `default` - Cor primária do tema
- `white` - Texto branco (para fundos escuros)
- `dark` - Texto escuro (para fundos claros)
- `header` - Otimizado para header

## 💻 **Como Usar**

### Importar o Componente
```tsx
import CustomLogo from './components/CustomLogo';
```

### Uso Básico
```tsx
<CustomLogo />
```

### Com Propriedades
```tsx
<CustomLogo 
  height={80}
  variant="white"
  showText={false}
/>
```

### Props Disponíveis
```tsx
interface CustomLogoProps {
  height?: number;        // Altura da logo (padrão: 60)
  width?: number;         // Largura da logo (opcional)
  variant?: 'default' | 'white' | 'dark' | 'header';
  className?: string;     // Classe CSS adicional
  showText?: boolean;     // Mostrar texto (padrão: true)
}
```

## 🔧 **Exemplos de Configuração**

### 1. Apenas Nome (sem logo)
```bash
VITE_BUSINESS_NAME=Minha Empresa
# Não definir VITE_CUSTOM_LOGO_URL
```
**Resultado**: Exibe apenas "Minha Empresa"

### 2. Logo + Nome
```bash
VITE_CUSTOM_LOGO_URL=https://exemplo.com/logo.png
VITE_BUSINESS_NAME=Minha Empresa
VITE_SHOW_BUSINESS_NAME=true
```
**Resultado**: Exibe logo + "Minha Empresa"

### 3. Apenas Logo (sem nome)
```bash
VITE_CUSTOM_LOGO_URL=https://exemplo.com/logo.png
VITE_BUSINESS_NAME=Minha Empresa
VITE_SHOW_BUSINESS_NAME=false
```
**Resultado**: Exibe apenas a logo

## 🎯 **Onde é Usado**

O `CustomLogo` substitui o componente `Logo` original nos seguintes locais:

- ✅ **Header** - Logo principal do site
- ✅ **Preloader** - Logo de carregamento
- ✅ **Menu Mobile** - Logo no drawer lateral

## 🔄 **Fallbacks Automáticos**

1. **Logo não carrega**: Remove a imagem e mantém o texto
2. **URL vazia**: Mostra apenas o nome
3. **Nome vazio**: Usa "Sistema de Turismo" como padrão

## 🚀 **Vantagens**

- ✅ **Flexível**: Funciona com ou sem logo
- ✅ **Responsivo**: Adapta-se a diferentes tamanhos
- ✅ **Temático**: Cores se adaptam ao tema
- ✅ **Configurável**: Via variáveis de ambiente
- ✅ **Fallback**: Sempre exibe algo útil
- ✅ **Performance**: Cache automático de imagens
