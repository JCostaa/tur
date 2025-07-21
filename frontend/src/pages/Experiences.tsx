import React, { useState } from 'react';

import { theme } from '../theme/theme';
import ExperienceCard from '../components/ExperienceCard';

const filters = [
  'Todas', 'Aventura', 'Cultural', 'Ecoturismo', 'Enoturismo',
  'Místico e Esotérico', 'Cachoeiras', 'Negócios e Eventos',
  'Vida Selvagem', 'Pesca', 'Sol e Praia', 'Turismo Rural', 'Rotas e Roteiros'
];

const experiences = [
  {
    image: '/public/images/browse-1.jpg',
    title: 'Cidade Noturna',
    subtitle: 'Descubra a vida noturna vibrante',
    type: 'Cultural',
  },
  {
    image: '/public/images/browse-2.jpg',
    title: 'Centro Histórico',
    subtitle: 'Passeios guiados e cultura',
    type: 'Cultural',
  },
  {
    image: '/public/images/browse-3.jpg',
    title: 'Arquitetura Exótica',
    subtitle: 'Belezas arquitetônicas únicas',
    type: 'Cultural',
  },
  // ...adicione mais experiências conforme necessário
];

const Experiencias: React.FC = () => {
  const [selected, setSelected] = useState('Todas');

  const filtered = selected === 'Todas'
    ? experiences
    : experiences.filter(e => e.type === selected);

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>EXPERIÊNCIAS</h3>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: '8px 0 0 0', color: theme.palette.text.primary }}>no município</h1>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setSelected(f)}
            style={{
              padding: '10px 28px',
              borderRadius: 24,
              border: selected === f ? 'none' : `1.5px solid ${theme.palette.primary.main}`,
              background: selected === f ? theme.palette.primary.main : 'transparent',
              color: selected === f ? theme.palette.primary.contrastText : theme.palette.primary.main,
              fontWeight: 500,
              fontSize: 18,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: selected === f ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 32,
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {filtered.map((exp, idx) => (
          <ExperienceCard  key={idx} {...exp} />
        ))}
      </div>
    </div>
  );
};

export default Experiencias; 