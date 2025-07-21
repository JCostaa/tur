import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  styled,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowUpward as ArrowIcon
} from '@mui/icons-material';

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#f8f9fa',
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

const DestinationsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
}));

const DestinationCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  background: '#fff',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
    '& .destination-image': {
      transform: 'scale(1.1)',
    },
    '& .destination-overlay': {
      opacity: 1,
    },
    '& .icon-box-header': {
      transform: 'scale(1.1)',
    },
    '& .arrow-icon': {
      transform: 'translate(5px, -5px) rotate(15deg)',
    },
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 200,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
    zIndex: 1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const DestinationImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
});

const IconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: alpha('#fff', 0.9),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#fff',
    transform: 'scale(1.1)',
  },
}));

const ArrowIconStyled = styled(ArrowIcon)(({ theme }) => ({
  color: '#333',
  fontSize: 20,
  transition: 'transform 0.3s ease',
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}));

const DestinationTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#333',
  marginBottom: theme.spacing(1),
  fontFamily: '"Playfair Display", serif',
}));

const DestinationSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#666',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: 1,
}));

const destinations = [
  {
    id: 1,
    title: 'California',
    subtitle: 'ITALY',
    image: '/images/browse-3.jpg',
  },
  {
    id: 2,
    title: 'Cappadocia',
    subtitle: 'TURKEY',
    image: '/images/browse-4.jpg',
  },
  {
    id: 3,
    title: 'Panorama',
    subtitle: 'INDONESIA',
    image: '/images/browse-1.jpg',
  },
  {
    id: 4,
    title: 'Tokyo',
    subtitle: 'JAPAN',
    image: '/images/browse-2.jpg',
  },
  {
    id: 5,
    title: 'Santa Monica',
    subtitle: 'CALIFORNIA',
    image: '/images/browse-5.jpg',
  },
];

const FeaturedDestinations: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SectionWrapper>
      <Container maxWidth="xl">
        <SectionTitle>
          WE GIVE
        </SectionTitle>
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '3rem',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: theme.spacing(2),
            color: '#333',
            [theme.breakpoints.down('md')]: {
              fontSize: '2.5rem',
            },
          }}
        >
          Memorable Experience Of Nature
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            maxWidth: 800,
            margin: '0 auto',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            color: '#666',
            marginBottom: theme.spacing(6),
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do nulla eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut ad minim veniam, quis nostrud exercitation 
          ullamco laboris nisi ut qui aliquip ex ea commodo consequat.
        </Typography>

        <DestinationsGrid>
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              className="animate-zoomIn hover-from-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ImageContainer>
                <DestinationImage
                  src={destination.image}
                  alt={destination.title}
                  className="destination-image"
                />
                <IconContainer className="arrow-icon">
                  <ArrowIconStyled />
                </IconContainer>
              </ImageContainer>
              <CardContentStyled>
                <DestinationTitle>
                  {destination.title}
                </DestinationTitle>
                <DestinationSubtitle>
                  {destination.subtitle}
                </DestinationSubtitle>
              </CardContentStyled>
            </DestinationCard>
          ))}
        </DestinationsGrid>
      </Container>
    </SectionWrapper>
  );
};

export default FeaturedDestinations; 