import React from 'react';
import { Box, Container, Typography, Link, Button, Tooltip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Facebook as FacebookIcon, 
  Instagram as InstagramIcon, 
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Home as HomeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcPaypal
} from 'react-icons/fa6';
import { SiPix, SiTiktok } from 'react-icons/si';
import brandColors from '../config/colors';
import { useCity } from '../hooks/useCity';
import { getVarMarketplaceUrl, getCityName } from '../utils/varMarketplace';

// Importe os logos disponíveis. Use placeholders para os que não existem.
import logoCentelha from '../../public/images/footer/sebrae.png'; // Placeholder
import logoFapemat from '../../public/images/footer/porto-velho.png'; // Placeholder
import logoConfap from '../../public/images/footer/confap.png'; // Placeholder
import logoCNPq from '../../public/images/footer/cnpq.png'; // Placeholder
import logoCerti from '../../public/images/footer/certi.png'; // Placeholder
import logoFNDCT from '../../public/images/footer/fndct.png'; // Placeholder
import logoFinep from '../../public/images/footer/finep.png'; // Placeholder
import logoMCTI from '../../public/images/footer/ministerio.png'; // Placeholder
import logoSebrae from '../../public/images/cunia/sebrae.png'; // Placeholder
import logoICMBio from '../../public/images/cunia/icm.png'; // Placeholder
import logoPGA from '../../public/images/cunia/pga.png'; // Placeholder
import logoFeco from '../../public/images/cunia/feco.png'; // Placeholder


const LogoImg = styled('img')({
  maxHeight: 60, // tamanho intermediário
  maxWidth: 160,
  margin: '0 12px 16px 12px',
  objectFit: 'contain',
  backgroundColor: 'transparent',
  borderRadius: 8,
  boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
  },
});

const SectionTitle = styled(Typography)({
  fontWeight: 500,
  fontSize: 20,
  color: brandColors.primary.green, // Verde da logo Cuniã
  marginBottom: 16,
  textAlign: 'center',
});

const FooterSection = styled(Box)({
  backgroundColor: brandColors.primary.greenDark, // Verde escuro da logo Cuniã
  color: 'white',
  padding: '48px 0',
});

const FooterBottomSection = styled(Box)({
  backgroundColor: brandColors.primary.black, // Preto da logo Cuniã
  color: '#B0B0B0',
  padding: '24px 0',
  borderTop: `1px solid ${brandColors.primary.greenDark}`,
});

const SocialIcon = styled(IconButton)<{ disabled?: boolean }>(({ disabled }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  backgroundColor: disabled ? '#7F8C8D' : brandColors.primary.gold, // Ouro da logo Cuniã
  borderRadius: '50%',
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: disabled ? '#7F8C8D' : brandColors.primary.goldDark, // Ouro escuro no hover
  },
  '&:disabled': {
    backgroundColor: '#7F8C8D',
    cursor: 'not-allowed',
  },
}));

const FooterLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  display: 'block',
  padding: '4px 0',
  fontSize: 14,
  '&:hover': {
    color: brandColors.primary.gold, // Ouro da logo Cuniã no hover
    textDecoration: 'none',
  },
});

const LanguageButton = styled(Button)({
  backgroundColor: 'transparent',
  border: `1px solid ${brandColors.primary.greenDark}`, // Verde escuro da logo Cuniã
  color: 'white',
  borderRadius: 8,
  padding: '8px 16px',
  margin: '0 8px',
  '&:hover': {
    backgroundColor: brandColors.primary.greenDark, // Verde escuro no hover
  },
});



const Footer: React.FC = () => {
  const { currentCity } = useCity();
  const touristSupport = currentCity?.tourist_support_agency;

  // useEffect para carregar o script do Calendly
  React.useEffect(() => {
    // Verifica se o script já foi carregado
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        console.log('Calendly script loaded successfully');
      };
      script.onerror = () => {
        console.error('Failed to load Calendly script');
      };
      document.head.appendChild(script);
    } else {
      console.log('Calendly script already loaded');
    }

    return () => {
      // Cleanup não é necessário para o script, mas pode ser útil remover o widget ao desmontar
    };
  }, []);

  // Função para renderizar ícone social com tooltip
  const renderSocialIcon = (
    icon: React.ReactNode,
    url: string | null,
    platform: string
  ) => {
    const isDisabled = !url;
    const tooltipTitle = isDisabled ? `${platform} não informado` : `Visitar ${platform}`;

    return (
      <Tooltip title={tooltipTitle} arrow>
        <span>
          <SocialIcon
            disabled={isDisabled}
            onClick={() => !isDisabled && window.open(url, '_blank')}
            aria-label={`${platform} ${isDisabled ? '(não disponível)' : ''}`}
          >
            {icon}
          </SocialIcon>
        </span>
      </Tooltip>
    );
  };

  return (
  <>
    {/* Footer original com logos */}
    <Box component="footer" sx={{
      background: brandColors.neutral.white,
      borderTop: `1px solid ${brandColors.neutral.lightGray}`,
      py: { xs: 4, md: 6 },
      px: 2,
      mt: 8,
    }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 4, md: 6 },
            textAlign: 'center',
            py: { xs: 2, md: 3 },
          }}
        >
          {/* Apoio */}
          <Box flex={1} sx={{ mb: { xs: 4, md: 0 } }}>
            <SectionTitle>Apoio</SectionTitle>
            <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
              <LogoImg src={logoSebrae} alt="Centelha" />
              <LogoImg src={logoFapemat} alt="Fapemat" />
            </Box>
          </Box>
          {/* Parceria */}
          {/* <Box flex={1} sx={{ mb: { xs: 4, md: 0 } }}>
            <SectionTitle>Parceria</SectionTitle>
            <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
              <LogoImg src={logoConfap} alt="Confap" />
              <LogoImg src={logoCNPq} alt="CNPq" />
              <LogoImg src={logoCerti} alt="Certi" />
            </Box>
          </Box> */}
          {/* Realização */}
          <Box flex={1}>
            <SectionTitle>Realização</SectionTitle>
            <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
              <LogoImg src={logoICMBio} alt="ICM" />
              <LogoImg src={logoFeco} alt="Feco" />
              <LogoImg src={logoPGA} alt="PPGA" />
            </Box>
          </Box>
        </Box>

        {/* Calendly Widget */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <SectionTitle sx={{ mb: 4 }}>Agende sua Visita</SectionTitle>
          <Box sx={{ 
            width: '100%',
            minHeight: '700px',
            backgroundColor: 'white',
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/resexcunia/30min" 
              style={{ minWidth: '320px', height: '700px', width: '100%' }}
            />
          </Box>
        </Box>
      </Container>
    </Box>

    {/* Nova seção do footer */}
    <FooterSection>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          flexWrap: 'wrap'
        }}>
          {/* Informações de Suporte Turístico */}
          <Box sx={{ flex: { xs: '1', md: '0 0 300px' }, mb: { xs: 4, md: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              {touristSupport?.name || 'Suporte Turístico'}
            </Typography>
            <Box sx={{ mb: 2 }}>
              {/* Endereço */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <HomeIcon sx={{ fontSize: 16, mr: 1, mt: 0.5 }} />
                <Typography variant="body2">
                  {touristSupport?.address || 'Endereço não informado'}
                </Typography>
              </Box>
              
              {/* Email */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailIcon sx={{ fontSize: 16, mr: 1 }} />
                <Typography variant="body2">
                  {touristSupport?.email || 'Email não informado'}
                </Typography>
              </Box>
              
              {/* Telefone */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PhoneIcon sx={{ fontSize: 16, mr: 1 }} />
                <Typography variant="body2">
                  {touristSupport?.phone_number || 'Telefone não informado'}
                </Typography>
              </Box>
              
              {/* Fax (se disponível) */}
              {touristSupport?.phone_number && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PrintIcon sx={{ fontSize: 16, mr: 1 }} />
                  <Typography variant="body2">
                    {touristSupport.phone_number}
                  </Typography>
                </Box>
              )}
            </Box>
            
            {/* Redes Sociais */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: 1,
              maxWidth: '150px'
            }}>
              {renderSocialIcon(
                <FacebookIcon sx={{ fontSize: 20, color: 'white' }} />,
                touristSupport?.facebook || null,
                'Facebook'
              )}
              {renderSocialIcon(
                <InstagramIcon sx={{ fontSize: 20, color: 'white' }} />,
                touristSupport?.instagram || null,
                'Instagram'
              )}
              {renderSocialIcon(
                <YouTubeIcon sx={{ fontSize: 20, color: 'white' }} />,
                touristSupport?.youtube || null,
                'YouTube'
              )}
              {renderSocialIcon(
                <LinkedInIcon sx={{ fontSize: 20, color: 'white' }} />,
                touristSupport?.linkedin || null,
                'LinkedIn'
              )}
              {renderSocialIcon(
                <SiTiktok size={20} color="white" />,
                touristSupport?.tiktok || null,
                'TikTok'
              )}
            </Box>
          </Box>

          {/* Menu */}
          <Box sx={{ flex: { xs: '1', md: '0 0 150px' }, mb: { xs: 4, md: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              Menu
            </Typography>
            <FooterLink href="/">Início</FooterLink>
            <FooterLink href="/#servicos">Serviços</FooterLink>
            <FooterLink href="/#experiencias">Experiências</FooterLink>
            <FooterLink href="/#eventos">Eventos</FooterLink>
            <FooterLink href="/#noticias">Notícias</FooterLink>
            <FooterLink href="/#tours">Promoções</FooterLink>
            <FooterLink href="/#fornecedores-atrativos">Fornecedores</FooterLink>
            <FooterLink href={getVarMarketplaceUrl()} target="_blank" rel="noopener noreferrer">Var Marketplace</FooterLink>
          </Box>

          {/* Suporte */}
          <Box sx={{ flex: { xs: '1', md: '0 0 150px' }, mb: { xs: 4, md: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              Suporte
            </Typography>
            <FooterLink href="#">LGPD</FooterLink>
            <FooterLink href="#">Legislação</FooterLink>
            <FooterLink href="#">Política de Privacidade</FooterLink>
            <FooterLink href="#">Termos e Condições</FooterLink>
            <FooterLink href="#">Sistema</FooterLink>
            <FooterLink href="#">Cookie</FooterLink>
          </Box>

          {/* Idioma e Moeda */}
          <Box sx={{ flex: { xs: '1', md: '0 0 150px' }, mb: { xs: 4, md: 0 } }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, color: 'white' }}>Idioma</Typography>
              <LanguageButton size="small">Português</LanguageButton>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, color: 'white' }}>Moeda</Typography>
              <LanguageButton size="small">BRA</LanguageButton>
            </Box>
          </Box>

          {/* Pagamentos */}
          <Box sx={{ flex: { xs: '1', md: '0 0 250px' } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              Pagamentos
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {/* Ícones de pagamento reais */}
              <Box sx={{ 
                width: 50, height: 32, backgroundColor: '#ffffff', 
                borderRadius: 1, display: 'flex', alignItems: 'center', 
                justifyContent: 'center', padding: 1
              }}>
                <FaCcVisa size={28} color="#1A1F71" />
              </Box>
              <Box sx={{ 
                width: 50, height: 32, backgroundColor: '#ffffff', 
                borderRadius: 1, display: 'flex', alignItems: 'center', 
                justifyContent: 'center', padding: 1
              }}>
                <FaCcMastercard size={28} color="#EB001B" />
              </Box>
              <Box sx={{ 
                width: 50, height: 32, backgroundColor: '#ffffff', 
                borderRadius: 1, display: 'flex', alignItems: 'center', 
                justifyContent: 'center', padding: 1
              }}>
                <FaCcPaypal size={28} color="#0070BA" />
              </Box>
              <Box sx={{ 
                width: 50, height: 32, backgroundColor: '#32BCAD', 
                borderRadius: 1, display: 'flex', alignItems: 'center', 
                justifyContent: 'center', padding: 1
              }}>
                <SiPix size={24} color="#ffffff" />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <img 
                src={import.meta.env.VITE_CUSTOM_LOGO_URL || 'RESEX Cuniã'}
                alt="RESEX Cuniã" 
                style={{ height: 250, opacity: 0.8, width: 250 }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </FooterSection>

    {/* Rodapé final */}
    <FooterBottomSection>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}>
          <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
            ©  {getCityName()}. All right reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
            Desenvolvido Por <Link href="https://bizmd.com.br/2020/" sx={{ color: brandColors.primary.gold }}>BIZ Marketing Digital</Link>. 
            Com a tecnologia <Link href="https://var.tur.br/" sx={{ color: brandColors.primary.gold }}>VAR - Plataforma de Inteligência Turística</Link>
          </Typography>
        </Box>
      </Container>
    </FooterBottomSection>
  </>
  );
};

export default Footer; 