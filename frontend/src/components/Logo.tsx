import React from 'react';
import { styled } from '@mui/material/styles';
import icon from '../assets/icon.png';

interface LogoProps {
  height?: number;
  width?: number;
  variant?: 'default' | 'white' | 'dark';
  className?: string;
}

const StyledLogo = styled('img')<LogoProps>(({ height = 50, width, variant }) => ({
  height,
  width: width || 'auto',
  transition: 'transform 0.3s ease',
  filter: variant === 'white' ? 'brightness(0) invert(1)' : 'none',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const Logo: React.FC<LogoProps> = ({ 
  height = 50, 
  width, 
  variant = 'default',
  className 
}) => {
  return (
    <StyledLogo
      src={icon}
      alt="Viva Barra do Bugres"
      height={height}
      width={width}
      variant={variant}
      className={className}
    />
  );
};

export default Logo; 