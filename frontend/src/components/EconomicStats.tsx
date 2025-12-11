import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Tab, Tabs, Paper, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  // LocationOn,
  // Hotel,
  // Event,
  // Restaurant,
  TrendingUp,
  // People,
  // Star,
  // Tour,
  Business,
  AccountBalance,
  Work,
  ShowChart,
  Assessment,
  Terrain,
  Wc,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

// Cores do tema
const COLORS = {
  primary: '#D84315',
  secondary: '#E7A400',
  accent1: '#FF6B35',
  accent2: '#FFA726',
  accent3: '#42A5F5',
  accent4: '#66BB6A',
  accent5: '#AB47BC',
  accent6: '#26C6DA',
};

const CHART_COLORS = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.accent1,
  COLORS.accent2,
  COLORS.accent3,
  COLORS.accent4,
  COLORS.accent5,
  COLORS.accent6,
];

// Animações
const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const StatsContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
  padding: theme.spacing(12, 0),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `
      radial-gradient(circle at 20% 50%, rgba(216, 67, 21, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(231, 164, 0, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(216, 67, 21, 0.1) 0%, transparent 50%)
    `,
    animation: `${rotate} 30s linear infinite`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.02\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
    opacity: 0.5,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 900,
  background: 'linear-gradient(135deg, #fff 0%, #E7A400 50%, #fff 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  letterSpacing: '-0.02em',
  position: 'relative',
  animation: `${shimmer} 3s linear infinite`,
  textShadow: '0 0 40px rgba(231, 164, 0, 0.5)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  color: 'rgba(255, 255, 255, 0.75)',
  textAlign: 'center',
  maxWidth: 800,
  margin: '0 auto',
  marginBottom: theme.spacing(6),
  lineHeight: 1.8,
  fontWeight: 400,
  letterSpacing: '0.5px',
  position: 'relative',
  zIndex: 1,
}));

const StyledTabs = styled(Tabs)(() => ({
  marginBottom: 48,
  position: 'relative',
  zIndex: 10,
  '& .MuiTabs-indicator': {
    backgroundColor: COLORS.secondary,
    height: 3,
  },
}));

const StyledTab = styled(Tab)(() => ({
  color: 'rgba(255, 255, 255, 0.7)',
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  position: 'relative',
  zIndex: 10,
  cursor: 'pointer',
  '&.Mui-selected': {
    color: COLORS.secondary,
  },
  '&:hover': {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
}));

const ChartPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  borderRadius: 24,
  padding: theme.spacing(4),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 48px rgba(216, 67, 21, 0.3)',
    border: '1px solid rgba(216, 67, 21, 0.3)',
  },
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '& svg': {
    color: COLORS.secondary,
  },
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 800,
  color: '#fff',
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(6),
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1.5),
  '& svg': {
    color: COLORS.secondary,
    fontSize: '2.5rem',
  },
}));

const StatCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(20px)',
  borderRadius: 24,
  padding: theme.spacing(5),
  textAlign: 'center',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 24,
    padding: 2,
    background: 'linear-gradient(135deg, rgba(216, 67, 21, 0.8), rgba(231, 164, 0, 0.8))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0,
    transition: 'opacity 0.5s ease',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px)',
    background: 'rgba(255, 255, 255, 0.08)',
    boxShadow: '0 20px 60px rgba(216, 67, 21, 0.4), 0 0 0 1px rgba(216, 67, 21, 0.3)',
    border: '1px solid rgba(216, 67, 21, 0.3)',
    '&::before': {
      opacity: 1,
    },
    '&::after': {
      left: '100%',
    },
  },
}));

const IconWrapper = styled(Box)(() => ({
  width: 90,
  height: 90,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(216, 67, 21, 0.2), rgba(231, 164, 0, 0.2))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  position: 'relative',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 0 30px rgba(216, 67, 21, 0.3), inset 0 0 20px rgba(216, 67, 21, 0.1)',
  '& svg': {
    fontSize: 45,
    color: '#E7A400',
    filter: 'drop-shadow(0 0 10px rgba(231, 164, 0, 0.5))',
    transition: 'all 0.5s ease',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '120%',
    height: '120%',
    borderRadius: '50%',
    background: 'conic-gradient(from 0deg, transparent, rgba(216, 67, 21, 0.4), transparent)',
    animation: `${rotate} 3s linear infinite`,
    opacity: 0,
    transition: 'opacity 0.5s ease',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: '2px solid rgba(231, 164, 0, 0.3)',
    animation: 'pulse 2.5s ease-out infinite',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
      opacity: 0.8,
    },
    '100%': {
      transform: 'scale(1.5)',
      opacity: 0,
    },
  },
  '.stat-card:hover &': {
    transform: 'scale(1.15) rotate(360deg)',
    background: 'linear-gradient(135deg, rgba(231, 164, 0, 0.3), rgba(216, 67, 21, 0.3))',
    boxShadow: '0 0 40px rgba(231, 164, 0, 0.6), inset 0 0 30px rgba(231, 164, 0, 0.2)',
    '&::before': {
      opacity: 1,
    },
    '& svg': {
      color: '#fff',
      filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))',
      transform: 'scale(1.1)',
    },
  },
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 900,
  background: 'linear-gradient(135deg, #E7A400 0%, #D84315 50%, #E7A400 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: theme.spacing(1.5),
  fontFamily: '"Poppins", "Roboto", sans-serif',
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  textShadow: '0 0 30px rgba(231, 164, 0, 0.3)',
  position: 'relative',
  transition: 'all 0.5s ease',
  '.stat-card:hover &': {
    backgroundPosition: 'right center',
    transform: 'scale(1.05)',
    filter: 'brightness(1.2)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.8rem',
  },
}));

const StatLabel = styled(Typography)(() => ({
  fontSize: '0.95rem',
  color: 'rgba(255, 255, 255, 0.7)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: 2,
  lineHeight: 1.6,
  transition: 'all 0.3s ease',
  '.stat-card:hover &': {
    color: 'rgba(255, 255, 255, 0.95)',
    letterSpacing: 3,
  },
}));

// Hook personalizado para animação de contagem
const useCountUp = (end: number, duration: number = 2000, isVisible: boolean = false) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    setHasAnimated(true);
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function (easeOutQuart)
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (end - startValue) * easeOut);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible, hasAnimated]);

  return count;
};

const StatItem: React.FC<StatItemProps & { isVisible: boolean }> = ({ 
  icon, 
  value, 
  label, 
  suffix = '', 
  prefix = '',
  isVisible 
}) => {
  const animatedValue = useCountUp(value, 2000, isVisible);
  
  return (
    <StatCard className="stat-card">
      <IconWrapper>
        {icon}
      </IconWrapper>
      <StatValue>
        {prefix}{animatedValue.toLocaleString('pt-BR', {
          minimumFractionDigits: value < 10 && value % 1 !== 0 ? 2 : 0,
          maximumFractionDigits: value < 10 && value % 1 !== 0 ? 2 : 0,
        })}{suffix}
      </StatValue>
      <StatLabel>{label}</StatLabel>
    </StatCard>
  );
};

const EconomicStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.05, // Reduzido para funcionar melhor no mobile
        rootMargin: '50px 0px' // Adiciona margem para detectar antes de entrar na viewport
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Dados de Turismo
  /* const tourismStats = [
    { icon: <LocationOn />, value: 150, label: 'Atrativos Turísticos', suffix: '+' },
    { icon: <Hotel />, value: 45, label: 'Hospedagens', suffix: '+' },
    { icon: <Restaurant />, value: 80, label: 'Restaurantes', suffix: '+' },
    { icon: <Event />, value: 120, label: 'Eventos Anuais', suffix: '+' },
    { icon: <Tour />, value: 200, label: 'Experiências', suffix: '+' },
    { icon: <People />, value: 50, label: 'Fornecedores', suffix: 'K+' },
    { icon: <Star />, value: 98, label: 'Satisfação', suffix: '%' },
    { icon: <TrendingUp />, value: 30, label: 'Crescimento Anual', suffix: '%' },
  ]; */

  // Dados Econômicos Principais
  const economicKeyStats = [
    { icon: <Business />, value: 839, label: 'Empresas Ativas', suffix: '' },
    { icon: <Business />, value: 421, label: 'Empresas MEI', suffix: '' },
    { icon: <Business />, value: 418, label: 'Empresas NÃO MEI', suffix: '' },
    { icon: <AccountBalance />, value: 387, label: 'PIB 2021', suffix: 'M', prefix: 'R$ ' },
    { icon: <TrendingUp />, value: 0.17, label: 'PIB Regional/Estado', suffix: '%' },
    { icon: <Work />, value: 15.97, label: 'Pop. Empregada 2022', suffix: '%' },
    { icon: <Terrain />, value: 5410, label: 'Extensão Territorial', suffix: ' km²' },
    { icon: <Terrain />, value: 0.60, label: 'Part. Extensão de MT', suffix: '%' },
    { icon: <Assessment />, value: 0.64, label: 'IDH (2010)', suffix: '' },
    { icon: <Assessment />, value: 0.68, label: 'Índice de Gini', suffix: '' },
    { icon: <Wc />, value: 47.5, label: 'Homens', suffix: '%' },
    { icon: <Wc />, value: 52.5, label: 'Mulheres', suffix: '%' },
  ];

  // Dados econômicos para gráficos
  const economicData = {
    pibHistorico: [
      { ano: '2010', valor: 82.874 },
      { ano: '2011', valor: 96.524 },
      { ano: '2012', valor: 102.08 },
      { ano: '2013', valor: 117.94 },
      { ano: '2014', valor: 141.361 },
      { ano: '2015', valor: 158.092 },
      { ano: '2016', valor: 214.3 },
      { ano: '2017', valor: 256.235 },
      { ano: '2018', valor: 292.512 },
      { ano: '2019', valor: 300.885 },
      { ano: '2020', valor: 351.464 },
      { ano: '2021', valor: 387.845 },
    ],
    valorAdicionadoSetor: [
      { setor: 'Agropecuária', valor: 69.051, percentual: 20.0 },
      { setor: 'Serviços', valor: 86.638, percentual: 25.1 },
      { setor: 'Indústria', valor: 107.5, percentual: 31.1 },
      { setor: 'Administração', valor: 87.65, percentual: 25.4 },
    ],
    variacaoSetorial: [
      { setor: 'Agropecuária', variacao: 65 },
      { setor: 'Administração', variacao: 5 },
      { setor: 'Serviços', variacao: 1 },
      { setor: 'Indústria', variacao: -1 },
      { setor: 'Impostos', variacao: 15 },
    ],
    empresasPorSetor: [
      { setor: 'Comércio varejista mercadorias', total: 61 },
      { setor: 'Extração de minério', total: 44 },
      { setor: 'Criação de bovinos', total: 32 },
      { setor: 'Comércio varejista vestuário', total: 24 },
    ],
    setoresEmprego: [
      { setor: 'Agropecuária', total: 561 },
      { setor: 'Comércio', total: 213 },
      { setor: 'Indústria', total: 209 },
      { setor: 'Serviço', total: 190 },
      { setor: 'Construção', total: 59 },
    ],
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{name: string; value: number | string; dataKey: string}>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(231, 164, 0, 0.3)',
            borderRadius: 2,
            padding: 2,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography sx={{ color: '#E7A400', fontWeight: 600, mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry, index: number) => (
            <Typography key={index} sx={{ color: '#fff', fontSize: '0.875rem' }}>
              {entry.name}: {typeof entry.value === 'number' 
                ? entry.value.toLocaleString('pt-BR', { 
                    minimumFractionDigits: entry.value < 100 ? 2 : 0,
                    maximumFractionDigits: entry.value < 100 ? 3 : 0
                  })
                : entry.value}
              {entry.dataKey === 'valor' ? ' milhões' : ''}
              {entry.dataKey === 'variacao' ? '%' : ''}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <StatsContainer ref={sectionRef}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle>
          Números que Inspiram
        </SectionTitle>
        <SectionSubtitle>
          Descubra o impacto do nosso portal turístico e o potencial econômico da região através de dados oficiais
        </SectionSubtitle>
        
        {/* Tabs de Navegação */}
        <Box sx={{ position: 'relative', zIndex: 10, mb: 6 }}>
          <StyledTabs 
            value={tabValue} 
            onChange={handleTabChange} 
            centered
            variant="scrollable"
            scrollButtons="auto"
          >
            {/* <StyledTab label="Turismo" icon={<Tour />} iconPosition="start" /> */}
            <StyledTab label="Economia Geral" icon={<AccountBalance />} iconPosition="start" />
            <StyledTab label="PIB & Setores" icon={<ShowChart />} iconPosition="start" />
            <StyledTab label="Empresas & Emprego" icon={<Business />} iconPosition="start" />
          </StyledTabs>
        </Box>

        {/* Tab 0: Turismo */}
        {/* {tabValue === 0 && (
          <Box>
            <CategoryTitle>
              <Tour />
              Indicadores de Turismo
            </CategoryTitle>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 4
            }}>
              {tourismStats.map((stat, index) => (
                <Box key={index}>
                  <StatItem {...stat} isVisible={isVisible} />
                </Box>
              ))}
            </Box>
          </Box>
        )} */}

        {/* Tab 0: Economia Geral */}
        {tabValue === 0 && (
          <Box>
            <CategoryTitle>
              <AccountBalance />
              Indicadores Econômicos e Demográficos
            </CategoryTitle>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 4
            }}>
              {economicKeyStats.map((stat, index) => (
                <Box key={index}>
                  <StatItem {...stat} isVisible={isVisible} />
                </Box>
              ))}
            </Box>

            {/* Fontes dos Dados */}
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Typography sx={{ 
                color: 'rgba(255, 255, 255, 0.5)', 
                fontSize: '0.875rem',
                fontStyle: 'italic'
              }}>
                Fontes: Receita Federal (set/2025), IBGE (2010, 2021, 2022, 2024), PNUD/Atlas (2010), RAIS (2024)
              </Typography>
            </Box>
          </Box>
        )}

        {/* Tab 1: PIB & Setores */}
        {tabValue === 1 && (
          <Box>
            <CategoryTitle>
              <ShowChart />
              PIB e Setores Econômicos
            </CategoryTitle>
            
            {/* Gráfico de PIB Histórico - Ocupa toda a largura */}
            <Box sx={{ mb: 4 }}>
                <ChartPaper>
                  <ChartTitle>
                    <ShowChart />
                    Evolução do PIB (2010-2021)
                  </ChartTitle>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={economicData.pibHistorico}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="ano" 
                        stroke="rgba(255,255,255,0.7)"
                        style={{ fontSize: '0.875rem' }}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.7)"
                        style={{ fontSize: '0.875rem' }}
                        tickFormatter={(value) => `R$ ${value}M`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        wrapperStyle={{ color: '#fff' }}
                        iconType="circle"
                      />
                      <Line
                        type="monotone"
                        dataKey="valor"
                        name="PIB (milhões R$)"
                        stroke={COLORS.secondary}
                        strokeWidth={3}
                        dot={{ fill: COLORS.secondary, r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartPaper>
            </Box>

            {/* Valor Adicionado e Variação Setorial */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
              <Box>
                <ChartPaper>
                  <ChartTitle>
                    <Assessment />
                    Valor Adicionado Bruto por Setor (2021)
                  </ChartTitle>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={economicData.valorAdicionadoSetor}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(props: unknown) => {
                          const entry = props as { setor?: string; percentual?: number };
                          return `${entry.setor || ''}: ${(entry.percentual || 0).toFixed(1)}%`;
                        }}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="valor"
                      >
                        {economicData.valorAdicionadoSetor.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartPaper>
              </Box>

              <Box>
                <ChartPaper>
                  <ChartTitle>
                    <TrendingUp />
                    Variação Setorial (2021 x 2020)
                  </ChartTitle>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={economicData.variacaoSetorial}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="setor" 
                        stroke="rgba(255,255,255,0.7)"
                        style={{ fontSize: '0.75rem' }}
                        angle={-15}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.7)"
                        style={{ fontSize: '0.875rem' }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ color: '#fff' }} />
                      <Bar 
                        dataKey="variacao" 
                        name="Variação (%)"
                        fill={COLORS.secondary}
                        radius={[8, 8, 0, 0]}
                      >
                        {economicData.variacaoSetorial.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.variacao >= 0 ? COLORS.accent4 : COLORS.primary} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartPaper>
              </Box>
            </Box>
          </Box>
        )}

        {/* Tab 2: Empresas & Emprego */}
        {tabValue === 2 && (
          <Box>
            <CategoryTitle>
              <Business />
              Empresas e Emprego
            </CategoryTitle>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
              <Box>
                <ChartPaper>
                  <ChartTitle>
                    <Business />
                    Empresas por Setor Principal
                  </ChartTitle>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={economicData.empresasPorSetor} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        type="number"
                        stroke="rgba(255,255,255,0.7)"
                        style={{ fontSize: '0.875rem' }}
                      />
                      <YAxis 
                        type="category"
                        dataKey="setor" 
                        stroke="rgba(255,255,255,0.7)"
                        style={{ fontSize: '0.75rem' }}
                        width={180}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="total" 
                        name="Total de Empresas"
                        fill={COLORS.primary}
                        radius={[0, 8, 8, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartPaper>
              </Box>

              <Box>
                <ChartPaper>
                  <ChartTitle>
                    <Work />
                    Setores que Mais Empregam (2024)
                  </ChartTitle>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={economicData.setoresEmprego}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="setor" 
                        stroke="rgba(255,255,255,0.7)"
                        style={{ fontSize: '0.875rem' }}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.7)"
                        style={{ fontSize: '0.875rem' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ color: '#fff' }} />
                      <Bar 
                        dataKey="total" 
                        name="Total de Empregados"
                        fill={COLORS.accent3}
                        radius={[8, 8, 0, 0]}
                      >
                        {economicData.setoresEmprego.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartPaper>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </StatsContainer>
  );
};

export default EconomicStats;

