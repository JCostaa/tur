import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { experienceService } from '../../services/experienceService';
import type { Experience } from '../../types/experience';
import { theme } from '../../theme/theme';
import ExperienceCard from '../../components/ExperienceCard';
// Removido: import { getCategories } from '../../services/categories';

// Removido array estático - agora as categorias vêm dinamicamente da API

const Experiences: React.FC = () => {
  const [selected, setSelected] = useState('Todas');
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

  // Extrair categorias únicas dos dados de experiências
  const dynamicCategories = useMemo(() => {
    const categorySet = new Set<string>();
    
    if (Array.isArray(experiencesData)) {
      experiencesData.forEach((exp: Experience) => {
        // Adicionar categorias da experiência
        if (exp.categories && Array.isArray(exp.categories)) {
          exp.categories.forEach(cat => {
            if (cat.name) categorySet.add(cat.name);
          });
        }
      });
    }
    
    const result = ['Todas', ...Array.from(categorySet).sort()];
    console.log('🏷️ Categorias extraídas das experiências:', result);
    console.log('📊 Dados disponíveis:', { 
      experiences: experiencesData?.length || 0,
      totalCategories: result.length - 1
    });
    return result;
  }, [experiencesData]);

  // Removido: não mais processar parâmetros de URL
  // O filtro agora funciona apenas via props na Home


  // Usar diretamente os dados das experiências
  const experiences = Array.isArray(experiencesData) ? experiencesData : [];

  // Função local para filtrar categorias (sem atualizar URL)
  const handleLocalCategorySelect = (categoryName: string) => {
    setSelected(categoryName);
  };

  // Função para navegar para detalhes da experiência
  const handleExperienceClick = (experience: Experience) => {
    navigate(`/experience/${experience.id}`);
  };


  const filtered = selected === 'Todas'
    ? experiences
    : experiences.filter(exp => {
        // Filtrar por categorias
        if (exp.categories && Array.isArray(exp.categories)) {
          return exp.categories.some(cat => cat.name === selected);
        }
        return false;
      });

  // Debug: mostrar informações sobre o filtro
  console.log('Categoria selecionada:', selected);
  console.log('Total de experiências:', experiences.length);
  console.log('Experiências filtradas:', filtered.length);
  console.log('Experiências filtradas:', filtered.map(e => ({ 
    id: e.id,
    title: e.title, 
    categories: e.categories?.map(c => c.name) 
  })));

  return (
    <div style={{ padding: '40px 0', minHeight: '100vh', background: theme.palette.background.default }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h3 style={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: 2 }}>
          {selected === 'Todas' ? 'TODAS AS EXPERIÊNCIAS' : `CATEGORIA: ${selected.toUpperCase()}`}
        </h3>
        {selected !== 'Todas' && (
          <p style={{ color: '#666', fontSize: '16px', marginTop: '8px' }}>
            {filtered.length} {filtered.length === 1 ? 'experiência encontrada' : 'experiências encontradas'}
          </p>
        )}
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
            Não há experiências disponíveis para a categoria "{selected}".
          </div>
          <button
            onClick={() => handleLocalCategorySelect('Todas')}
            style={{
              marginTop: '16px',
              padding: '8px 24px',
              borderRadius: 20,
              border: '1px solid #1976d2',
              background: 'transparent',
              color: '#1976d2',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Ver todas as experiências
          </button>
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