import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { experienceService } from '../../services/experienceService';
import type { Experience } from '../../types/experience';
import { theme } from '../../theme/theme';
import ExperienceCard from '../../components/ExperienceCard';
// Removido: import { getCategories } from '../../services/categories';

// Removido array estático - agora as categorias vêm dinamicamente da API

const Experiences: React.FC = () => {
  const navigate = useNavigate();

  const { data: experiencesData, isLoading, isError } = useQuery<Experience[]>({
    queryKey: ['experiences'],
    queryFn: experienceService.getAll,
  });

  // Removido: toursData - agora as experiências JÁ vêm da API de tours
  // const { data: toursData, isLoading: toursLoading, isError: toursError } = useQuery({
  //   queryKey: ['tours'],
  //   queryFn: getTours,
  // });

  // Removido: não precisamos mais buscar categorias separadamente
  // As categorias agora vêm dos próprios tours/experiências


  // Removido: não mais processar parâmetros de URL
  // O filtro agora funciona apenas via props na Home


  // Usar diretamente os dados das experiências
  const experiences = Array.isArray(experiencesData) ? experiencesData : [];


  // Função para navegar para detalhes da experiência
  const handleExperienceClick = (experience: Experience) => {
    navigate(`/experience/${experience.id}`);
  };


  const filtered = experiences;

  // Debug: mostrar informações
  console.log('Total de experiências:', experiences.length);
  console.log('Experiências filtradas:', filtered.map(e => ({ 
    id: e.id,
    title: e.title
  })));

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>
          TODAS AS EXPERIÊNCIAS
        </h3>
      </div>
      {/* Filtros por badges - funcionam localmente sem atualizar URL */}
     
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Carregando experiências...</div>
      ) : isError ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Erro ao carregar experiências.</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
          <div style={{ fontSize: '18px', fontWeight: 500 }}>Nenhuma experiência encontrada</div>
          <div style={{ fontSize: '14px', marginTop: '8px', opacity: 0.7 }}>
            Não há experiências disponíveis no momento.
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 20px',
        }}>
        {filtered.map((exp, idx) => (
          <ExperienceCard
            key={exp.id || idx}
            experience={exp}
            onClick={() => handleExperienceClick(exp)}
          />
        ))}
        </div>
      )}
    </div>
  );
};

export default Experiences;