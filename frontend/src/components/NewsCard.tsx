import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import { Box, Typography, Chip, Avatar } from '@mui/material';
import { AccessTime, Person } from '@mui/icons-material';
import { theme } from '../theme/theme';

interface NewsCardProps {
  id: number;
  title: string;
  summary: string;
  image?: string;
  author?: string;
  date: string;
  category?: string;
  readTime?: string;
  onClick?: (id: number) => void;
  variant?: 'featured' | 'standard' | 'compact';
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Card = styled(Box)<{ variant?: string }>(({ variant }) => ({
  position: 'relative',
  borderRadius: variant === 'compact' ? 12 : 16,
  overflow: 'hidden',
  boxShadow: variant === 'compact' ? '0 2px 12px rgba(0,0,0,0.06)' : '0 4px 20px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  background: theme.palette.background.paper,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: `${fadeInUp} 0.6s ease-out`,
  height: variant === 'featured' ? 500 : variant === 'compact' ? 100 : 380, // Altura menor para compact
  display: variant === 'compact' ? 'flex' : 'block',
  
  '&:hover': {
    transform: variant === 'compact' ? 'translateY(-4px)' : 'translateY(-8px)',
    boxShadow: variant === 'compact' ? '0 6px 20px rgba(0,0,0,0.12)' : '0 12px 40px rgba(0,0,0,0.15)',
    
    '& .news-image': {
      transform: 'scale(1.05)',
    },
    
    '& .news-category': {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    }
  },
}));

const ImageContainer = styled(Box)<{ variant?: string }>(({ variant }) => ({
  position: 'relative',
  width: variant === 'compact' ? 140 : '100%', // Aumentei para 140px para melhor proporção
  height: variant === 'featured' ? 280 : variant === 'compact' ? 100 : 200, // Diminui a altura do compact
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: variant === 'compact' ? 8 : 16, // Bordas menores para compact
}));

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center center', // Centralizar a imagem
  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
});

const Content = styled(Box)<{ variant?: string }>(({ variant }) => ({
  padding: variant === 'compact' ? 16 : variant === 'featured' ? 24 : 20,
  display: 'flex',
  flexDirection: 'column',
  height: variant === 'featured' ? 220 : variant === 'compact' ? 'auto' : 180,
  justifyContent: 'space-between',
}));

const CategoryChip = styled(Chip)({
  position: 'absolute',
  top: 16,
  left: 16,
  fontSize: 12,
  fontWeight: 600,
  height: 28,
  background: 'rgba(255, 255, 255, 0.9)',
  color: theme.palette.text.primary,
  backdropFilter: 'blur(8px)',
  border: 'none',
  transition: 'all 0.3s ease',
  zIndex: 2,
});

const Title = styled(Typography)<{ variant?: string }>(({ variant }) => ({
  fontWeight: 700,
  fontSize: variant === 'featured' ? 24 : variant === 'compact' ? 16 : 20,
  lineHeight: 1.3,
  color: theme.palette.text.primary,
  marginBottom: variant === 'compact' ? 4 : 8,
  display: '-webkit-box',
  WebkitLineClamp: variant === 'compact' ? 2 : 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  transition: 'color 0.3s ease',
}));

const Summary = styled(Typography)<{ variant?: string }>(({ variant }) => ({
  fontSize: variant === 'compact' ? 12 : 14,
  lineHeight: 1.5,
  color: theme.palette.text.secondary,
  display: '-webkit-box',
  WebkitLineClamp: variant === 'featured' ? 4 : variant === 'compact' ? 2 : 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  marginBottom: variant === 'compact' ? 8 : 16,
  flex: 1,
}));

const MetaInfo = styled(Box)<{ variant?: string }>(({ variant }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: variant === 'compact' ? 11 : 12,
  color: theme.palette.text.secondary,
  marginTop: 'auto',
}));

const AuthorInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

const TimeInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  summary,
  image,
  author,
  date,
  category,
  readTime = '5 min',
  onClick,
  variant = 'standard'
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const placeholderImage = '/images/header-1.jpg';

  return (
    <Card variant={variant} onClick={handleClick}>
      <ImageContainer variant={variant}>
        <Image 
          className="news-image"
          src={image || placeholderImage}
          alt={title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = placeholderImage;
          }}
        />
        {category && variant !== 'compact' && (
          <CategoryChip 
            className="news-category"
            label={category}
            size="small"
          />
        )}
      </ImageContainer>
      
      <Content variant={variant}>
        <Box>
          <Title variant={variant}>{title}</Title>
          <Summary variant={variant}>{summary}</Summary>
        </Box>
        
        <MetaInfo variant={variant}>
          <AuthorInfo>
            {author && (
              <>
                <Avatar sx={{ width: 20, height: 20, fontSize: 10 }}>
                  {author.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="caption">{author}</Typography>
              </>
            )}
          </AuthorInfo>
          
          <TimeInfo>
            <AccessTime sx={{ fontSize: 14 }} />
            <Typography variant="caption">
              {formatDate(date)} • {readTime}
            </Typography>
          </TimeInfo>
        </MetaInfo>
      </Content>
    </Card>
  );
};

export default NewsCard;
