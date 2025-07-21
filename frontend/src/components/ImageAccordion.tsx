import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  styled,
  alpha,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import {
  ArrowForward as ArrowIcon
} from '@mui/icons-material';

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#f5f5f5',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontSize: '2.5rem',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  color: '#333',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
}));

const AccordionContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(2),
  height: 400,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    height: 'auto',
  },
}));

const AccordionItem = styled(Box)<{ $active: boolean; $image: string }>(({ theme, $active, $image }) => ({
  position: 'relative',
  backgroundImage: `url(${$image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: 16,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.5s ease',
  transform: $active ? 'scale(1.02)' : 'scale(1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)',
    opacity: $active ? 0.8 : 0.4,
    transition: 'opacity 0.5s ease',
  },
  '&:hover': {
    transform: 'scale(1.05)',
    '&::before': {
      opacity: 0.7,
    },
    '& .accordion-content': {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
}));

const AccordionContent = styled(Box)<{ $active: boolean }>(({ theme, $active }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(3),
  color: '#fff',
  transform: $active ? 'translateY(0)' : 'translateY(20px)',
  opacity: $active ? 1 : 0.9,
  transition: 'all 0.5s ease',
  zIndex: 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.8) 100%)',
    zIndex: -1,
  },
}));

const AccordionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  fontFamily: '"Playfair Display", serif',
  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
}));

const AccordionDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  marginBottom: theme.spacing(2),
  opacity: 0.9,
  lineHeight: 1.5,
}));

const ViewMoreButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255,255,255,0.2)',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: 25,
  padding: theme.spacing(0.5, 2),
  fontSize: '0.8rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: 1,
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    background: 'rgba(255,255,255,0.3)',
    borderColor: 'rgba(255,255,255,0.5)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
}));

const ButtonText = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#fff',
}));

const ArrowIconStyled = styled(ArrowIcon)(({ theme }) => ({
  fontSize: 16,
  color: '#fff',
  transition: 'transform 0.3s ease',
}));

const destinations = [
  {
    id: 1,
    title: 'California',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    image: '/images/browse-3.jpg',
  },
  {
    id: 2,
    title: 'Japan',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    image: '/images/browse-4.jpg',
  },
  {
    id: 3,
    title: 'Turkey',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    image: '/images/browse-5.jpg',
  },
  {
    id: 4,
    title: 'Indonesia',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    image: '/images/browse-1.jpg',
  },
  {
    id: 5,
    title: 'Spain',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    image: '/images/browse-2.jpg',
  },
];

const ImageAccordion: React.FC = () => {
  const [activeItem, setActiveItem] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };

  return (
    <SectionWrapper>
      <Container maxWidth="xl">
        <SectionTitle>
          WE GAVE
        </SectionTitle>
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '3rem',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: theme.spacing(6),
            color: '#333',
            [theme.breakpoints.down('md')]: {
              fontSize: '2.5rem',
            },
          }}
        >
          Discover A Mesmerizing Nature & Stunning Culture
        </Typography>

        <AccordionContainer>
          {destinations.map((destination, index) => (
            <AccordionItem
              key={destination.id}
              $active={index === activeItem}
              $image={destination.image}
              onClick={() => handleItemClick(index)}
              className="animate-zoomIn hover-from-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AccordionContent $active={index === activeItem}>
                <AccordionTitle>
                  {destination.title}
                </AccordionTitle>
                <AccordionDescription>
                  {destination.description}
                </AccordionDescription>
                <ViewMoreButton>
                  <ButtonText>View More</ButtonText>
                  <ArrowIconStyled />
                </ViewMoreButton>
              </AccordionContent>
            </AccordionItem>
          ))}
        </AccordionContainer>
      </Container>
    </SectionWrapper>
  );
};

export default ImageAccordion; 