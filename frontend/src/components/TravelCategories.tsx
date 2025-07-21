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
  ArrowForward as ArrowIcon
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

const CategoriesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const CategoryCard = styled(Card)(({ theme }) => ({
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
    '& .category-image': {
      transform: 'scale(1.1)',
    },
    '& .category-overlay': {
      opacity: 1,
    },
    '& .category-icon': {
      transform: 'scale(1.1) rotate(5deg)',
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

const CategoryImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
});

const CategoryIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: alpha('#fff', 0.9),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#fff',
    transform: 'scale(1.1) rotate(5deg)',
  },
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#333',
  marginBottom: theme.spacing(1),
  fontFamily: '"Playfair Display", serif',
}));

const CategoryPrice = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: theme.palette.primary.main,
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

const CategoryDestinations = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: '#666',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: 1,
}));

const DestinationLink = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.primary.main,
  fontSize: '0.9rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

const ArrowIconStyled = styled(ArrowIcon)(({ theme }) => ({
  fontSize: 16,
  transition: 'transform 0.3s ease',
}));

const categories = [
  {
    id: 1,
    title: 'Adventures',
    price: 'Start $2299',
    destinations: '12 Destination',
    image: '/images/category-1.jpg',
  },
  {
    id: 2,
    title: 'Exploring',
    price: 'Start $2299',
    destinations: '25 Destination',
    image: '/images/category-2.jpg',
  },
  {
    id: 3,
    title: 'Camping',
    price: 'Start $2299',
    destinations: '16 Destination',
    image: '/images/category-3.jpg',
  },
  {
    id: 4,
    title: 'City Tour',
    price: 'Start $2299',
    destinations: '20 Destination',
    image: '/images/category-4.jpg',
  },
  {
    id: 5,
    title: 'Boat Tour',
    price: 'Start $2299',
    destinations: '15 Destination',
    image: '/images/category-5.jpg',
  },
];

const TravelCategories: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SectionWrapper>
      <Container maxWidth="xl">
        <SectionTitle>
          Browse By Category
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
          Tour & Travel Types
        </Typography>

        <CategoriesGrid>
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              className="animate-zoomIn hover-from-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ImageContainer>
                <CategoryImage
                  src={category.image}
                  alt={category.title}
                  className="category-image"
                />
                <CategoryIcon className="category-icon">
                  <ArrowIcon />
                </CategoryIcon>
              </ImageContainer>
              <CardContentStyled>
                <CategoryTitle>
                  {category.title}
                </CategoryTitle>
                <CategoryPrice>
                  {category.price}
                </CategoryPrice>
                <CategoryDestinations>
                  {category.destinations}
                </CategoryDestinations>
                <DestinationLink>
                  <span>{category.destinations}</span>
                  <ArrowIconStyled className="arrow-icon" />
                </DestinationLink>
              </CardContentStyled>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </Container>
    </SectionWrapper>
  );
};

export default TravelCategories; 