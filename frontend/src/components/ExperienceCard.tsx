import React from 'react';
import { styled, keyframes } from '@mui/material/styles';

interface ExperienceCardProps {
  image: {
    path: string;
  };
  title: string;
  subtitle: string;
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
  '&:hover div': {
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

const Overlay = styled('div')(({ theme }) => ({
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

const Title = styled('h2')({
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

const ExperienceCard: React.FC<ExperienceCardProps> = ({ image, title, subtitle }) => (
  <Card>
    <Image src={`${import.meta.env.VITE_API_URL}/${image.path}`} alt={title} />
    <Overlay>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Overlay>
  </Card>
);

export default ExperienceCard; 