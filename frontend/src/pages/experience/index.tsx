import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getExperiences } from '../../services/experiences';
import { theme } from '../../theme/theme';
import ExperienceCard from '../../components/ExperienceCard';
import { getCategories } from '../../services/categories';

const filters = [
  'Todas', 'Aventura', 'Cultural', 'Ecoturismo', 'Enoturismo',
  'Místico e Esotérico', 'Cachoeiras', 'Negócios e Eventos',
  'Vida Selvagem', 'Pesca', 'Sol e Praia', 'Turismo Rural', 'Rotas e Roteiros'
];

const Experiences: React.FC = () => {
  const [selected, setSelected] = useState('Todas');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['experiences'],
    queryFn: getExperiences,
  });

  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  console.log(categories);

  // Mapeamento dos dados da API para o formato esperado pelo ExperienceCard
  const experiences = Array.isArray(data)
    ? data.map((exp: any) => ({
        image: exp.image || '/images/browse-1.jpg',
        title: exp.title || 'Experiência',
        subtitle: exp.subtitle || '',
        type: exp.type || 'Cultural',
      }))
    : [];

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
        <button
          onClick={() => setSelected('Todas')}
          style={{
            padding: '10px 28px',
            borderRadius: 24,
            border: selected === 'Todas' ? 'none' : `1.5px solid ${theme.palette.primary.main}`,
            background: selected === 'Todas' ? theme.palette.primary.main : 'transparent',
            color: selected === 'Todas' ? theme.palette.primary.contrastText : theme.palette.primary.main,
            fontWeight: 500,
            fontSize: 18,
            cursor: 'pointer',
            transition: 'all 0.2s', 
            boxShadow: selected === 'Todas' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
          }}
        >
          Todas
        </button>
        {categories?.map((c: any) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.name)}
            style={{
              padding: '10px 28px',
              borderRadius: 24,
              border: selected === c.name ? 'none' : `1.5px solid ${theme.palette.primary.main}`,
              background: selected === c.name ? theme.palette.primary.main : 'transparent',
              color: selected === c.name ? theme.palette.primary.contrastText : theme.palette.primary.main,
              fontWeight: 500,
              fontSize: 18,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: selected === c.name ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Carregando experiências...</div>
      ) : isError ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'error.main' }}>Erro ao carregar experiências.</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          {filtered.map((exp, idx) => (
            <ExperienceCard key={idx} {...exp} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Experiences; 