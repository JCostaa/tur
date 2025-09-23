import React from 'react';
import { styled } from '@mui/material/styles';
import icon from '../../public/images/teste.png';

interface LogoProps {
  height?: number;
  width?: number;
  variant?: 'default' | 'white' | 'dark' | 'header';
  className?: string;
}

const StyledLogo = styled('img')<LogoProps>(({ height = 80, width=80, variant }) => ({
  height,
  width: width || 'auto',
  transition: 'all 0.3s ease',
  filter: variant === 'white' 
    ? 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))' 
    : variant === 'header'
    ? 'brightness(1.3) contrast(1.4) saturate(1.2) drop-shadow(0 2px 8px rgba(0,0,0,0.4))'
    : 'brightness(1.1) contrast(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
  cursor: 'pointer',
  borderRadius: '8px',
  background: variant === 'header' ? 'rgba(255,255,255,0.15)' : 'transparent',
  padding: variant === 'header' ? '6px 10px' : '0',
  backdropFilter: variant === 'header' ? 'blur(6px)' : 'none',
  border: variant === 'header' ? '1px solid rgba(255,255,255,0.3)' : 'none',
  boxShadow: variant === 'header' ? '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)' : '0 2px 8px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'scale(1.05)',
    filter: variant === 'white' 
      ? 'brightness(0) invert(1) drop-shadow(0 4px 8px rgba(0,0,0,0.5))' 
      : variant === 'header'
      ? 'brightness(1.4) contrast(1.5) saturate(1.3) drop-shadow(0 3px 10px rgba(0,0,0,0.5))'
      : 'brightness(1.2) contrast(1.2) drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
    background: variant === 'header' ? 'rgba(255,255,255,0.25)' : 'transparent',
    boxShadow: variant === 'header' ? '0 3px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)' : '0 4px 15px rgba(0,0,0,0.2)',
  },
}));

const Logo: React.FC<LogoProps> = ({ 
  height = 80, 
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