import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowUp, FaComments } from 'react-icons/fa';
import brandColors from '../../config/colors';
import Header from '../../components/Header';

const primaryColor = brandColors.primary.teal; // Verde escuro do projeto
const accentColor = brandColors.primary.orange; // Laranja principal
const lightGray = brandColors.neutral.lightGray; // Fundo cinza claro
const cardBg = brandColors.neutral.white;
const textGray = brandColors.neutral.gray;

// Hook para detectar se está em mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};

const Contact: React.FC = () => {
  const isMobile = useIsMobile();
  // Scroll to top handler
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <div style={{ background: lightGray, minHeight: '100vh', paddingBottom: isMobile ? 20 : 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '20px 0' : '40px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 16 : 24 }}>
          
            <h1 style={{ fontSize: isMobile ? 26 : 40, fontWeight: 700, margin: isMobile ? '12px 0 0 0' : '16px 0 0 0', color: brandColors.neutral.darkGray }}>
              Contato para qualquer dúvida
            </h1>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 16 : 32,
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            {/* Card lateral */}
            <div
              style={{
                background: cardBg,
                borderRadius: 16,
                padding: isMobile ? 20 : 40,
                minWidth: isMobile ? 'unset' : 340,
                maxWidth: isMobile ? 'unset' : 380,
                width: isMobile ? '100%' : undefined,
                marginBottom: isMobile ? 16 : 0,
                boxShadow: '0 2px 12px #0001',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaMapMarkerAlt size={isMobile ? 36 : 48} color={primaryColor} style={{ marginBottom: 16 }} />
              <div style={{ color: textGray, textAlign: 'center', marginBottom: 32, fontSize: isMobile ? 14 : 16 }}>
                Rua Voluntários da Pátria, 118 - Centro Norte<br />
                Cuiabá - MT,<br />
                78005-180
              </div>
              <FaPhoneAlt size={isMobile ? 28 : 40} color={primaryColor} style={{ marginBottom: 8 }} />
              <div style={{ fontWeight: 600, color: primaryColor, fontSize: isMobile ? 16 : 22, marginBottom: 8 }}>Telefone</div>
              <div style={{ color: textGray, marginBottom: 24, fontSize: isMobile ? 14 : 16 }}>
                +012 345 67890<br />
                +012 345 67890
              </div>
              <FaEnvelope size={isMobile ? 28 : 40} color={primaryColor} style={{ marginBottom: 8 }} />
              <div style={{ fontWeight: 600, color: primaryColor, fontSize: isMobile ? 16 : 22, marginBottom: 8 }}>E-mail</div>
              <div style={{ color: textGray, fontSize: isMobile ? 14 : 16 }}>
                info@example.com<br />
                info@example.com
              </div>
            </div>
            {/* Formulário */}
            <div
              style={{
                flex: 1,
                background: cardBg,
                borderRadius: 16,
                padding: isMobile ? 20 : 40,
                boxShadow: '0 2px 12px #0001',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: isMobile ? '100%' : undefined,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: isMobile ? 20 : 28, marginBottom: 8, color: brandColors.neutral.darkGray }}>Escreva sua mensagem</div>
              <div style={{ color: textGray, marginBottom: 4, fontSize: isMobile ? 13 : 16 }}>Iremos te responder o mais breve possível.</div>
              <div style={{ color: textGray, marginBottom: 16, fontSize: isMobile ? 13 : 16 }}>
                Se desejar, baixe nosso catálogo de experiências em Mato Grosso. <a href="#" style={{ color: primaryColor, textDecoration: 'underline', fontWeight: 500 }}>Download</a>.
              </div>
              <form style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 16 }}>
                <div style={{ display: 'flex', gap: isMobile ? 8 : 16, flexDirection: isMobile ? 'column' : 'row' }}>
                  <input type="text" placeholder="Seu Nome" style={{ flex: 1, padding: isMobile ? 10 : 14, borderRadius: 8, border: `1px solid ${brandColors.neutral.gray}`, fontSize: isMobile ? 14 : 16 }} />
                  <input type="email" placeholder="Seu E-mail" style={{ flex: 1, padding: isMobile ? 10 : 14, borderRadius: 8, border: `1px solid ${brandColors.neutral.gray}`, fontSize: isMobile ? 14 : 16 }} />
                </div>
                <input type="text" placeholder="Assunto" style={{ padding: isMobile ? 10 : 14, borderRadius: 8, border: `1px solid ${brandColors.neutral.gray}`, fontSize: isMobile ? 14 : 16 }} />
                <textarea placeholder="Mensagem" rows={5} style={{ padding: isMobile ? 10 : 14, borderRadius: 8, border: `1px solid ${brandColors.neutral.gray}`, fontSize: isMobile ? 14 : 16, resize: 'vertical' }} />
                <button type="submit" style={{ background: primaryColor, color: brandColors.neutral.white, fontWeight: 700, fontSize: isMobile ? 16 : 20, border: 'none', borderRadius: 8, padding: isMobile ? '12px 0' : '16px 0', marginTop: 8, cursor: 'pointer', letterSpacing: 1 }}>
                  ENVIAR
                </button>
              </form>
            </div>
          </div>
          {/* Mapa Google */}
          <div style={{ marginTop: isMobile ? 24 : 40, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: isMobile ? 600 : 1300, borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px #0001' }}>
              <iframe
                title="Mapa Mato Grosso"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15819018.393698497!2d-65.00000000000001!3d-13.000000000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x939da1b6e7e7e7e7%3A0x7e7e7e7e7e7e7e7e!2sMato%20Grosso!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height={isMobile ? 220 : 350}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        {/* Botão de chat flutuante */}
        <button
          style={{
            position: 'fixed',
            left: isMobile ? 12 : 24,
            bottom: isMobile ? 12 : 24,
            background: accentColor,
            color: brandColors.neutral.white,
            border: 'none',
            borderRadius: 32,
            padding: isMobile ? '10px 18px 10px 12px' : '12px 28px 12px 18px',
            fontWeight: 700,
            fontSize: isMobile ? 15 : 18,
            boxShadow: '0 2px 8px #0002',
            display: 'flex',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'pointer',
          }}
        >
          <FaComments size={isMobile ? 18 : 22} style={{ marginRight: 10 }} /> Clique AQUI
        </button>
        {/* Botão de voltar ao topo */}
        <button
          onClick={handleScrollTop}
          style={{
            position: 'fixed',
            right: isMobile ? 16 : 32,
            bottom: isMobile ? 16 : 32,
            background: primaryColor,
            color: brandColors.neutral.white,
            border: 'none',
            borderRadius: '50%',
            width: isMobile ? 38 : 48,
            height: isMobile ? 38 : 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px #0002',
            zIndex: 1000,
            cursor: 'pointer',
          }}
          aria-label="Voltar ao topo"
        >
          <FaArrowUp size={isMobile ? 16 : 22} />
        </button>
      </div>
    </>
  );
};

export default Contact; 