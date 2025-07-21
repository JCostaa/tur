import React, { useState } from 'react';
import {
  Box,
  Container,
  IconButton,
  styled,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PlayArrow as PlayIcon
} from '@mui/icons-material';

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#fff',
  textAlign: 'center',
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: 600,
  margin: '0 auto',
  borderRadius: 20,
  overflow: 'hidden',
  boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  aspectRatio: '16/9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 12px 50px rgba(0,0,0,0.2)',
    '& .play-button': {
      transform: 'scale(1.1)',
      backgroundColor: alpha('#fff', 0.9),
      boxShadow: '0 0 30px rgba(255,255,255,0.5)',
    },
  },
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: alpha('#fff', 0.8),
  color: '#333',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#fff',
    transform: 'scale(1.1)',
    boxShadow: '0 0 30px rgba(255,255,255,0.5)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 40,
    marginLeft: 4, // Offset for play icon
  },
}));

const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handlePlayClick = () => {
    setIsPlaying(true);
    // Here you would typically open a modal with the video
    // For now, we'll just show an alert
    alert('Video player would open here!');
  };

  return (
    <SectionWrapper>
      <Container maxWidth="lg">
        <VideoContainer
          onClick={handlePlayClick}
          className="animate-zoomIn"
        >
          <PlayButton
            className="glow-enable"
            onClick={handlePlayClick}
            size="large"
          >
            <PlayIcon />
          </PlayButton>
        </VideoContainer>
      </Container>
    </SectionWrapper>
  );
};

export default VideoSection; 