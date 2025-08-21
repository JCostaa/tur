
import { Box, Container, Typography, Link, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  LinkedIn as LinkedInIcon,
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
import { SiPix } from 'react-icons/si';
import brandColors from '../config/colors';

// Importe os logos disponíveis. Use placeholders para os que não existem.
import logoCentelha from '../../public/images/footer/centelha.png'; // Placeholder
import logoFapemat from '../../public/images/footer/fapemat.png'; // Placeholder
import logoConfap from '../../public/images/footer/confap.png'; // Placeholder
import logoCNPq from '../../public/images/footer/cnpq.png'; // Placeholder
import logoCerti from '../../public/images/footer/certi.png'; // Placeholder
import logoFNDCT from '../../public/images/footer/fndct.png'; // Placeholder
import logoFinep from '../../public/images/footer/finep.png'; // Placeholder
import logoMCTI from '../../public/images/footer/ministerio.png'; // Placeholder

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
  color: brandColors.primary.teal,
  marginBottom: 16,
  textAlign: 'center',
});

const FooterSection = styled(Box)({
  backgroundColor: '#2C3E50',
  color: 'white',
  padding: '48px 0',
});

const FooterBottomSection = styled(Box)({
  backgroundColor: '#1A252F',
  color: '#B0B0B0',
  padding: '24px 0',
  borderTop: '1px solid #34495E',
});

const SocialIcon = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  backgroundColor: '#3498DB',
  borderRadius: '50%',
  margin: '0 8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#2980B9',
  },
});

const FooterLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  display: 'block',
  padding: '4px 0',
  fontSize: 14,
  '&:hover': {
    color: '#3498DB',
    textDecoration: 'none',
  },
});

const LanguageButton = styled(Button)({
  backgroundColor: 'transparent',
  border: '1px solid #34495E',
  color: 'white',
  borderRadius: 8,
  padding: '8px 16px',
  margin: '0 8px',
  '&:hover': {
    backgroundColor: '#34495E',
  },
});



const Footer: React.FC = () => (
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
              <LogoImg src={logoCentelha} alt="Centelha" />
              <LogoImg src={logoFapemat} alt="Fapemat" />
            </Box>
          </Box>
          {/* Parceria */}
          <Box flex={1} sx={{ mb: { xs: 4, md: 0 } }}>
            <SectionTitle>Parceria</SectionTitle>
            <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
              <LogoImg src={logoConfap} alt="Confap" />
              <LogoImg src={logoCNPq} alt="CNPq" />
              <LogoImg src={logoCerti} alt="Certi" />
            </Box>
          </Box>
          {/* Realização */}
          <Box flex={1}>
            <SectionTitle>Realização</SectionTitle>
            <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
              <LogoImg src={logoFNDCT} alt="FNDCT" />
              <LogoImg src={logoFinep} alt="Finep" />
              <LogoImg src={logoMCTI} alt="MCTI" />
            </Box>
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
          {/* Secretaria Adjunta de Turismo */}
          <Box sx={{ flex: { xs: '1', md: '0 0 300px' }, mb: { xs: 4, md: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              Secretaria Adjunta de Turismo
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <HomeIcon sx={{ fontSize: 16, mr: 1, mt: 0.5 }} />
                <Typography variant="body2">
                  Rua Voluntários da Pátria, 118 - Centro Norte,<br />
                  Cuiabá - MT, 78005-180
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailIcon sx={{ fontSize: 16, mr: 1 }} />
                <Typography variant="body2">
                  contato@descubramatogrosso.com.br
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PhoneIcon sx={{ fontSize: 16, mr: 1 }} />
                <Typography variant="body2">+55 (65) 3613-9300</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PrintIcon sx={{ fontSize: 16, mr: 1 }} />
                <Typography variant="body2">+55 (65) 3613-9300</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SocialIcon>
                <FacebookIcon sx={{ fontSize: 20, color: 'white' }} />
              </SocialIcon>
              <SocialIcon>
                <TwitterIcon sx={{ fontSize: 20, color: 'white' }} />
              </SocialIcon>
              <SocialIcon>
                <InstagramIcon sx={{ fontSize: 20, color: 'white' }} />
              </SocialIcon>
              <SocialIcon>
                <LinkedInIcon sx={{ fontSize: 20, color: 'white' }} />
              </SocialIcon>
            </Box>
          </Box>

          {/* Menu */}
          <Box sx={{ flex: { xs: '1', md: '0 0 150px' }, mb: { xs: 4, md: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              Menu
            </Typography>
            <FooterLink href="/services">Serviços</FooterLink>
            <FooterLink href="/experiences">Experiências</FooterLink>
            <FooterLink href="#">Pacotes</FooterLink>
            <FooterLink href="/news">Notícias</FooterLink>
            <FooterLink href="/contact">Contato</FooterLink>
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
                  src="/images/teste.png" 
                  alt="Descubra Mato Grosso" 
                  style={{ height: 250, filter: 'brightness(0) invert(1)', width: 250 }}
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
            © Descubra Mato Grosso. All right reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
            Desenvolvido Por <Link href="https://bizmd.com.br/2020/" sx={{ color: '#3498DB' }}>BIZ Marketing Digital</Link>. 
            Com a tecnologia <Link href="https://var.tur.br/" sx={{ color: '#3498DB' }}>VAR - Plataforma de Inteligência Turística</Link>
          </Typography>
        </Box>
      </Container>
    </FooterBottomSection>
  </>
);

export default Footer; 