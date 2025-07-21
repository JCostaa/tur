import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  styled,
  useTheme,
  useMediaQuery
} from '@mui/material';

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#f8f9fa',
  position: 'relative',
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const StatCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
    '& .stat-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
  },
  '&:hover::before': {
    transform: 'scaleX(1)',
  },
}));

const StatIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '& svg': {
    color: '#fff',
    fontSize: 24,
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  fontFamily: '"Playfair Display", serif',
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: '#666',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: 1,
}));

const stats = [
  {
    id: 1,
    number: 450,
    label: 'Travel Destination',
    suffix: '+',
    icon: '🌍',
  },
  {
    id: 2,
    number: 120,
    label: 'Happy Travelers',
    suffix: 'K+',
    icon: '👥',
  },
  {
    id: 3,
    number: 15,
    label: 'Years Experience',
    suffix: '+',
    icon: '⭐',
  },
  {
    id: 4,
    number: 98,
    label: 'Customer Satisfaction',
    suffix: '%',
    icon: '❤️',
  },
];

const StatsSection: React.FC = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const intervals = stats.map((stat, index) => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = stat.number / steps;
        const stepDuration = duration / steps;

        return setInterval(() => {
          setCounts(prev => {
            const newCounts = [...prev];
            if (newCounts[index] < stat.number) {
              newCounts[index] = Math.min(
                newCounts[index] + increment,
                stat.number
              );
            }
            return newCounts;
          });
        }, stepDuration);
      });

      return () => {
        intervals.forEach(interval => clearInterval(interval));
      };
    }
  }, [isVisible]);

  return (
    <SectionWrapper id="stats-section">
      <Container maxWidth="xl">
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
          Ready to Travel With Real Adventure and Enjoy Natural
        </Typography>

        <StatsContainer>
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              className="animate-zoomIn elementor-animation-grow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <StatIcon className="stat-icon">
                <span style={{ fontSize: '24px' }}>{stat.icon}</span>
              </StatIcon>
              <StatNumber>
                {Math.floor(counts[index])}{stat.suffix}
              </StatNumber>
              <StatLabel>
                {stat.label}
              </StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
      </Container>
    </SectionWrapper>
  );
};

export default StatsSection; 