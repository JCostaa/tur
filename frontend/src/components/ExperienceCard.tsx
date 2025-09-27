import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import type { Experience } from '../types/experience';

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

const Card = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 24,
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  minHeight: 320,
  background: theme.palette.background.paper,
  transition: 'box-shadow 0.3s',
  '&:hover img': {
    transform: 'scale(1.08)',
  },
  '&:hover .hover-overlay': {
    opacity: 1,
    pointerEvents: 'auto',
  },
}));

const Image = styled('img')({
  width: '100%',
  height: 320,
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)',
});

// Overlay que aparece sempre na parte inferior
const TitleOverlay = styled('div')(() => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)',
  color: '#fff',
  padding: '40px 24px 24px',
  textAlign: 'center',
}));

// Overlay que aparece apenas no hover
const HoverOverlay = styled('div')(() => ({
  position: 'absolute',
  inset: 0,
  background: 'rgba(10, 32, 80, 0.72)',
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
  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
});

// Título para o hover
const HoverTitle = styled('h2')({
  fontSize: 28,
  fontWeight: 700,
  margin: 0,
  animation: `${fadeInUp} 0.5s cubic-bezier(.4,2,.6,1)`,
});

const Subtitle = styled('p')({
  fontSize: 18,
  fontWeight: 400,
  marginTop: 8,
  animation: `${fadeInUp} 0.7s cubic-bezier(.4,2,.6,1)`,
});

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onClick }) => {
  // Usar a imagem do backend ou uma imagem padrão
  let imageSrc = experience.image?.url || experience.image?.path || '';
  
  // Se não há imagem, usar uma imagem padrão
  if (!imageSrc) {
    imageSrc = '/images/browse-3.jpg'; // Imagem padrão para experiências
  }
  
  console.log('🖼️ ExperienceCard - Processando imagem do backend:', {
    experienceId: experience.id,
    originalImageData: experience.image,
    finalSrc: imageSrc,
    hasImage: !!experience.image,
    willShow: !!imageSrc
  });
  
  return (
    <Card onClick={onClick}>
      <Image src={imageSrc} alt={experience.title} />
      
      {/* Título sempre visível na parte inferior */}
      <TitleOverlay>
        <Title>{experience.title}</Title>
      </TitleOverlay>
      
      {/* Overlay completo que aparece no hover */}
      <HoverOverlay className="hover-overlay">
        <HoverTitle>{experience.title}</HoverTitle>
        <Subtitle>{experience.subtitle || experience.description?.substring(0, 100) + '...' || 'Experiência única'}</Subtitle>
      </HoverOverlay>
    </Card>
  );
};

export default ExperienceCard; 