import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import type { Experience } from '../types/experience';
import {
  Hiking,
  DirectionsBike,
  Surfing,
  KayakingOutlined,
  Restaurant,
  LocalBar,
  Museum,
  PhotoCamera,
  Nature,
  Forest,
  Paragliding,
  Spa,
  Festival,
  MusicNote,
  Castle,
  Church,
  Theaters,
  SportsBar,
  FitnessCenter,
  Sailing,
  Pool,
  LocationOn,
  Park,
  WbSunny,
  Nightlife,
  LocalCafe,
  Icecream,
  Fastfood,
  Terrain,
  Waves,
  DirectionsBoat,
  Cake,
  LocalPizza,
  Sports,
  TravelExplore,
  Landscape,
  Flight,
  Hotel,
  LocalActivity,
  Celebration,
  FoodBank,
  Palette,
  AutoAwesome,
  WaterDrop,
  Air,
  Pets,
  ChildFriendly,
  Groups,
  Diversity3,
  Tour,
  LocalFlorist,
  Weekend,
} from '@mui/icons-material';

interface ExperienceCardProps {
  experience: Experience;
  onClick?: () => void;
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Mapeamento de ícones baseado no título da experiência
const getIconForExperience = (title: string, description?: string): React.ReactElement => {
  const titleLower = title.toLowerCase();
  const text = `${title} ${description || ''}`.toLowerCase();
  
  // MAPEAMENTO EXATO POR TÍTULO (personalize aqui com seus títulos específicos)
  const exactMatches: Record<string, React.ReactElement> = {
    // === TÍTULOS EXATOS DO SISTEMA ===
    'experiência gastronômica': <Restaurant />,
    'experiência cultural e histórica': <Castle />,
    'experiência de ecoturismo, aventura e natureza': <Hiking />,
    'experiência de saúde e beleza': <Spa />,
    'experiência no meio rural': <Nature />,
    'experiência em tecnologia e inovação': <TravelExplore />,
    
    // Aventura e Natureza
    'aventura': <Hiking />,
    'aventuras': <Hiking />,
    'ecoturismo': <Nature />,
    'eco-turismo': <Nature />,
    'natureza': <LocalFlorist />,
    'trilhas': <Hiking />,
    'trilha': <Hiking />,
    'caminhadas': <Hiking />,
    'montanha': <Terrain />,
    'montanhismo': <Terrain />,
    
    // Praias e Náutico
    'praias': <Waves />,
    'praia': <Waves />,
    'náutico': <DirectionsBoat />,
    'náuticos': <DirectionsBoat />,
    'náutica': <DirectionsBoat />,
    'mergulho': <Pool />,
    'surf': <Surfing />,
    'barco': <DirectionsBoat />,
    'passeio de barco': <DirectionsBoat />,
    'passeios de barco': <DirectionsBoat />,
    
    // Gastronomia
    'gastronomia': <Restaurant />,
    'culinária': <Restaurant />,
    'restaurantes': <Restaurant />,
    'bares': <LocalBar />,
    'bares e restaurantes': <LocalBar />,
    'comida típica': <Restaurant />,
    'sabores': <Restaurant />,
    
    // Cultura
    'cultura': <Museum />,
    'cultural': <Museum />,
    'história': <Castle />,
    'histórico': <Castle />,
    'história e cultura': <Museum />,
    'patrimônio': <Castle />,
    'museus': <Museum />,
    'arte': <Palette />,
    'música': <MusicNote />,
    'shows': <Festival />,
    'festas': <Festival />,
    'festivais': <Festival />,
    'eventos': <Festival />,
    
    // Turismo
    'turismo': <TravelExplore />,
    'passeios': <Tour />,
    'passeio': <Tour />,
    'tours': <Tour />,
    'roteiros': <Tour />,
    'pontos turísticos': <PhotoCamera />,
    'city tour': <Tour />,
    
    // Vida Noturna
    'vida noturna': <Nightlife />,
    'noite': <Nightlife />,
    'balada': <Nightlife />,
    'nightlife': <Nightlife />,
    
    // Bem-estar
    'bem-estar': <Spa />,
    'relaxamento': <Spa />,
    'spa': <Spa />,
    'wellness': <Spa />,
    
    // Esportes
    'esportes': <Sports />,
    'esporte': <Sports />,
    'esportivo': <Sports />,
    'esportiva': <Sports />,
    'atividades esportivas': <Sports />,
    
    // Público
    'família': <Groups />,
    'famílias': <Groups />,
    'familiar': <Groups />,
    'em família': <Groups />,
    'romântico': <Celebration />,
    'romance': <Celebration />,
    'casal': <Celebration />,
    'infantil': <ChildFriendly />,
    'crianças': <ChildFriendly />,
    'kids': <ChildFriendly />,
    
    // Outros
    'fotografia': <PhotoCamera />,
    'foto': <PhotoCamera />,
    'compras': <LocalActivity />,
    'shopping': <LocalActivity />,
    'hotelaria': <Hotel />,
    'hospedagem': <Hotel />,
    'acomodação': <Hotel />,
    'viagem': <Flight />,
    'lazer': <Weekend />,
    'entretenimento': <LocalActivity />,
    'diversão': <Celebration />,
  };
  
  // Procurar por match exato no título
  if (exactMatches[titleLower]) {
    return exactMatches[titleLower];
  }
  
  // MAPEAMENTO POR PALAVRAS-CHAVE (mais específico para menos específico)
  
  // Natureza e Aventura
  if (text.match(/trilha|caminhad|hiking|trekking/)) return <Hiking />;
  if (text.match(/montanha|morro|pico/)) return <Terrain />;
  if (text.match(/bike|bicicleta|ciclismo/)) return <DirectionsBike />;
  if (text.match(/surf|surfing/)) return <Surfing />;
  if (text.match(/praia|beach|mar/)) return <Waves />;
  if (text.match(/caiaque|kayak|remo|canoa/)) return <KayakingOutlined />;
  if (text.match(/floresta|mata|bosque/)) return <Forest />;
  if (text.match(/natureza|nature|verde/)) return <Nature />;
  if (text.match(/mergulho|dive|snorkel|submarino/)) return <Pool />;
  if (text.match(/voo|parapente|asa.?delta/)) return <Paragliding />;
  if (text.match(/vela|veleiro|iate/)) return <Sailing />;
  if (text.match(/barco|lancha|embarcação/)) return <DirectionsBoat />;
  if (text.match(/paisagem|vista|mirante/)) return <Landscape />;
  if (text.match(/cachoeira|rio|água/)) return <WaterDrop />;
  if (text.match(/observação.*pássaro|bird.?watching|aves/)) return <Air />;
  if (text.match(/animal|fauna|wildlife/)) return <Pets />;
  if (text.match(/jardim|flor|botânico/)) return <LocalFlorist />;
  
  // Gastronomia
  if (text.match(/gastronomia|gastronômic|culinária/)) return <Restaurant />;
  if (text.match(/restaurante|jantar|almoço/)) return <Restaurant />;
  if (text.match(/pizza|pizzaria/)) return <LocalPizza />;
  if (text.match(/bar|pub|cerveja|bebida|drink/)) return <LocalBar />;
  if (text.match(/café|coffee|cafeteria/)) return <LocalCafe />;
  if (text.match(/sorvete|gelato|ice.?cream/)) return <Icecream />;
  if (text.match(/doce|confeitaria|bolo|torta/)) return <Cake />;
  if (text.match(/lanche|fast|street.?food|comida.?rua/)) return <Fastfood />;
  if (text.match(/mercado|feira|alimento/)) return <FoodBank />;
  
  // Cultura e Arte
  if (text.match(/museu|museum|memorial/)) return <Museum />;
  if (text.match(/foto|fotografia|photo/)) return <PhotoCamera />;
  if (text.match(/arte|artístic|galeria/)) return <Palette />;
  if (text.match(/castelo|forte|fortaleza|fortificação/)) return <Castle />;
  if (text.match(/igreja|capela|catedral|religios|templo/)) return <Church />;
  if (text.match(/teatro|show|espetáculo|peça/)) return <Theaters />;
  if (text.match(/música|music|concert|musical/)) return <MusicNote />;
  if (text.match(/festival|festa|celebração|carnaval/)) return <Festival />;
  
  // Bem-estar e Saúde
  if (text.match(/spa|relaxamento|massage|massagem/)) return <Spa />;
  if (text.match(/fitness|academia|exercício|gym/)) return <FitnessCenter />;
  if (text.match(/yoga|meditação|zen/)) return <Spa />;
  
  // Turismo e Lazer
  if (text.match(/parque|park/)) return <Park />;
  if (text.match(/sol|praia|banho/)) return <WbSunny />;
  if (text.match(/noite|night|balada|noturno/)) return <Nightlife />;
  if (text.match(/eco|sustentável|ecológico/)) return <LocationOn />;
  if (text.match(/esporte|sport|esportiv/)) return <SportsBar />;
  if (text.match(/tour|passeio|roteiro/)) return <Tour />;
  if (text.match(/viagem|travel|turismo/)) return <TravelExplore />;
  if (text.match(/hotel|hospedagem|pousada|acomodação/)) return <Hotel />;
  if (text.match(/voo|aéreo|avião|flight/)) return <Flight />;
  if (text.match(/atividade|activity|entretenimento/)) return <LocalActivity />;
  
  // Público
  if (text.match(/família|familiar|family/)) return <Groups />;
  if (text.match(/grupo|grupos|amigos/)) return <Diversity3 />;
  if (text.match(/criança|infantil|kid|children/)) return <ChildFriendly />;
  if (text.match(/romântico|casal|romance|lua.?mel/)) return <Celebration />;
  
  // Temporal
  if (text.match(/fim.?semana|weekend|fds/)) return <Weekend />;
  
  // Ícone padrão - exploração
  return <AutoAwesome />;
};

// Gradientes baseados em cores
const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
];

const Card = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 24,
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  minHeight: 320,
  background: theme.palette.background.paper,
  transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
  '&:hover .icon-container': {
    transform: 'scale(1.15)',
  },
  '&:hover .hover-overlay': {
    opacity: 1,
    pointerEvents: 'auto',
  },
}));

const GradientBackground = styled('div')<{ gradient: string }>(({ gradient }) => ({
  width: '100%',
  height: 320,
  background: gradient,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}));

const IconContainer = styled('div')({
  fontSize: 120,
  color: 'rgba(255, 255, 255, 0.95)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)',
  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
  '& svg': {
    fontSize: 'inherit',
  },
});

// Overlay que aparece sempre na parte inferior
const TitleOverlay = styled('div')(() => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent)',
  color: '#fff',
  padding: '60px 24px 24px',
  textAlign: 'center',
}));

// Overlay que aparece apenas no hover
const HoverOverlay = styled('div')(() => ({
  position: 'absolute',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.85)',
  backdropFilter: 'blur(4px)',
  color: '#fff',
  opacity: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.4s cubic-bezier(.4,2,.6,1)',
  padding: 24,
  textAlign: 'center',
  pointerEvents: 'none',
}));

// Título sempre visível
const Title = styled('h2')({
  fontSize: 24,
  fontWeight: 700,
  margin: 0,
  textShadow: '0 2px 8px rgba(0,0,0,0.5)',
  letterSpacing: '0.5px',
});

// Título para o hover
const HoverTitle = styled('h2')({
  fontSize: 28,
  fontWeight: 700,
  margin: 0,
  marginBottom: 12,
  animation: `${fadeInUp} 0.5s cubic-bezier(.4,2,.6,1)`,
  letterSpacing: '0.5px',
});

const Subtitle = styled('p')({
  fontSize: 16,
  fontWeight: 400,
  marginTop: 8,
  lineHeight: 1.6,
  animation: `${fadeInUp} 0.7s cubic-bezier(.4,2,.6,1)`,
  maxWidth: '90%',
});

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onClick }) => {
  // Selecionar um gradiente baseado no ID da experiência
  const gradient = gradients[experience.id % gradients.length];
  
  // Obter o ícone apropriado
  const icon = getIconForExperience(experience.title, experience.description);
  
  return (
    <Card onClick={onClick}>
      <GradientBackground gradient={gradient}>
        <IconContainer className="icon-container">
          {icon}
        </IconContainer>
      </GradientBackground>
      
      {/* Título sempre visível na parte inferior */}
      <TitleOverlay>
        <Title>{experience.title}</Title>
      </TitleOverlay>
      
      {/* Overlay completo que aparece no hover */}
      <HoverOverlay className="hover-overlay">
        <HoverTitle>{experience.title}</HoverTitle>
        <Subtitle>
          {experience.subtitle || experience.description?.substring(0, 120) + '...' || 'Descubra esta experiência única'}
        </Subtitle>
      </HoverOverlay>
    </Card>
  );
};

export default ExperienceCard; 