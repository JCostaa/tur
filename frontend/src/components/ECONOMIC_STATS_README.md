# EconomicStats Component

## Descrição
Componente de estatísticas econômicas da região que exibe indicadores econômicos e gráficos interativos usando a biblioteca Recharts.

## Características

### Dados Exibidos
- **Total de Empresas Ativas**: 839 empresas
- **PIB 2021**: R$ 387,8 milhões
- **Representação Regional**: 0,17% do PIB estadual
- **População Empregada**: 15,97% em 2022
- **Extensão Territorial**: 5.410,138 km²
- **Índice de Gini**: 0,6779
- **IDH**: 0,638
- **Distribuição de Gênero**: 47,5% Homens / 52,5% Mulheres

### Gráficos Disponíveis

#### 1. Tab "PIB Histórico"
- **Gráfico de Linha**: Evolução do PIB de 2010 a 2021
- Mostra o crescimento consistente da economia regional
- De R$ 82,8M (2010) para R$ 387,8M (2021)

#### 2. Tab "Setores Econômicos"
- **Gráfico de Pizza**: Valor Adicionado Bruto por Setor (2021)
  - Agropecuária: R$ 69,051M
  - Serviços: R$ 86,638M
  - Indústria: R$ 107,5M
  - Administração: R$ 87,65M

- **Gráfico de Barras**: Variação Setorial 2021 x 2020
  - Agropecuária: +65%
  - Administração: +5%
  - Serviços: +1%
  - Indústria: -1%
  - Impostos: +15%

#### 3. Tab "Empresas"
- **Gráfico de Pizza**: Empresas por Porte
  - MEI: 421 empresas
  - NÃO MEI: 418 empresas

- **Gráfico de Barras Horizontal**: Empresas por Setor
  - Comércio varejista mercadorias: 61
  - Extração de minério: 44
  - Criação de bovinos: 32
  - Comércio varejista vestuário: 24

#### 4. Tab "Emprego"
- **Gráfico de Barras**: Setores que Mais Empregam
  - Agropecuária: 561 empregados
  - Comércio: 213 empregados
  - Indústria: 209 empregados
  - Serviço: 190 empregados
  - Construção: 59 empregados

## Tecnologias Utilizadas

- **React** com TypeScript
- **Material-UI (MUI)** para componentes de UI
- **Recharts** para gráficos interativos
- **Styled Components** do MUI para estilização

## Fontes dos Dados

- **Receita Federal**: Dados de setembro/2025
- **IBGE**: Dados de 2010, 2021, 2022, 2024
- **PNUD/Atlas**: IDH 2010
- **RAIS**: Dados de emprego 2024

## Características Visuais

- Design consistente com o tema do site (cores laranja/dourado #D84315 e #E7A400)
- Fundo com gradiente escuro (#0f172a, #1e293b)
- Efeitos glassmorphism nos cards
- Animações suaves ao hover
- Tooltips customizados
- Responsivo para mobile, tablet e desktop
- Intersection Observer para otimização de performance

## Como Usar

```tsx
import EconomicStats from '../components/EconomicStats';

// Em seu componente
<Box id="economia">
  <EconomicStats />
</Box>
```

## Estrutura dos Dados

Os dados estão organizados em objetos dentro do componente:

```typescript
const economicData = {
  pibHistorico: [...],
  valorAdicionadoSetor: [...],
  variacaoSetorial: [...],
  empresasPorPorte: [...],
  empresasPorSetor: [...],
  setoresEmprego: [...],
  keyStats: {...}
};
```

## Customização

Para atualizar os dados, edite o objeto `economicData` dentro do componente `EconomicStats.tsx`.

Para mudar as cores, edite o objeto `COLORS` no início do arquivo.

## Performance

- Usa Intersection Observer para detectar quando o componente está visível
- Animações otimizadas com CSS
- Gráficos renderizados sob demanda através de tabs

