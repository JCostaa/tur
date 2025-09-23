import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  styled,
  useTheme
} from '@mui/material';
import {
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getExperiences } from '../services/experiences';
// Removido: import { getCategories } from '../services/categories';

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#f8f9fa',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontSize: '2.5rem',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  color: '#333',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
}));

const CategoriesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const CategoryCard = styled(Card)(() => ({
  position: 'relative',
  background: '#fff',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
    '& .category-image': {
      transform: 'scale(1.1)',
    },
    '& .category-overlay': {
      opacity: 1,
    },
    '& .category-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
}));

const ImageContainer = styled(Box)(() => ({
  position: 'relative',
  height: 200,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
    zIndex: 1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
  '&::after': {
    content: '"Ver Experiências"',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    zIndex: 2,
    opacity: 0,
    transition: 'opacity 0.3s ease',
    textAlign: 'center',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  },
  '&:hover::after': {
    opacity: 1,
  },
}));

const CategoryImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
});

// CategoryIcon removido - agora usamos as imagens dos atrativos como preview

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#333',
  marginBottom: theme.spacing(1),
  fontFamily: '"Playfair Display", serif',
}));

const CategoryPrice = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: theme.palette.primary.main,
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

const CategoryDestinations = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: '#666',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: 1,
}));

const DestinationLink = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.primary.main,
  fontSize: '0.9rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

const ArrowIconStyled = styled(ArrowIcon)(({ theme }) => ({
  fontSize: 16,
  transition: 'transform 0.3s ease',
}));

interface TravelCategoriesProps {
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

const TravelCategories: React.FC<TravelCategoriesProps> = ({ 
  onCategorySelect,
  selectedCategory = 'Todas'
}) => {
  const theme = useTheme();

  const { data: experiencesData, isLoading: experiencesLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: getExperiences,
  });

  // Removido: não precisamos mais buscar categorias separadamente
  // As categorias agora vêm dos próprios tours/experiências

  // Processar dados para criar categorias com base nas experiências
  const categories = React.useMemo(() => {
    if (!experiencesData || !Array.isArray(experiencesData)) {
      console.log('Dados das experiências não disponíveis ou inválidos:', experiencesData);
      return [];
    }

    console.log('Processando experiências:', experiencesData.length, 'itens');

    const categoryMap = new Map();
    
    // Contar experiências por categoria e coletar imagens
    experiencesData.forEach((experience: any, index: number) => {
      console.log(`Processando experiência ${index + 1}:`, {
        title: experience.title,
        categories: experience.categories,
        category: experience.category,
        attributes: experience.attributes,
        image: experience.image
      });

      const processCategory = (categoryName: string, categoryId?: number) => {
        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, {
            id: categoryId || Math.random(),
            title: categoryName,
            count: 0,
            images: [],
            experiences: []
          });
        }
        
        const categoryInfo = categoryMap.get(categoryName);
        categoryInfo.count += 1;
        categoryInfo.experiences.push(experience);
        
        // Adicionar imagem se disponível
        let imagePath = '';
        if (typeof experience.image === 'string') {
          // Se é string (URL completa da API), usar diretamente
          imagePath = experience.image;
        } else if (experience.image?.url) {
          // Se tem propriedade url (dados mockados)
          imagePath = experience.image.url;
        } else if (experience.image?.path) {
          // Se tem propriedade path (dados mockados)
          imagePath = experience.image.path;
        }
        
        if (imagePath && !categoryInfo.images.includes(imagePath)) {
          categoryInfo.images.push(imagePath);
          console.log(`✅ Imagem adicionada para ${categoryName}:`, imagePath);
        }
      };

      // Verificar experience.categories (array)
      if (experience.categories && Array.isArray(experience.categories)) {
        experience.categories.forEach((category: any) => {
          if (category.name) {
            processCategory(category.name, category.id);
          }
        });
      }
      
      // Verificar experience.category (string único)
      if (experience.category && typeof experience.category === 'string') {
        processCategory(experience.category);
      }
      
      // Verificar experience.attributes (como nos outros arquivos)
      if (experience.attributes && Array.isArray(experience.attributes)) {
        experience.attributes.forEach((attr: any) => {
          if (Array.isArray(attr.items)) {
            attr.items.forEach((item: string) => {
              if (item && typeof item === 'string') {
                processCategory(item);
              }
            });
          } else if (attr.name && typeof attr.name === 'string') {
            processCategory(attr.name);
          }
        });
      }
    });

    console.log('Mapa de categorias:', Array.from(categoryMap.entries()));

    // Converter para array, formatar e limitar a 10 categorias
    const allCategories = Array.from(categoryMap.entries())
      .map(([name, info]: [string, any]) => {
        const categoryData = {
          id: info.id,
          title: name,
          price: `A partir de R$ 50`,
          destinations: `${info.count} ${info.count === 1 ? 'Experiência' : 'Experiências'}`,
          image: info.images[0] || '',
          count: info.count
        };
        console.log(`Categoria processada: ${name}`, categoryData);
        return categoryData;
      })
      .sort((a, b) => b.count - a.count);

    // Limitar a 10 categorias mais populares
    const result = allCategories.slice(0, 10);

    console.log('🎯 Resultado final das categorias:', result);
    console.log('📊 Total de categorias encontradas:', allCategories.length);
    console.log('📊 Categorias limitadas a:', result.length);
    console.log('📋 Lista de categorias:', result.map(cat => cat.title));
    
    // Se não há categorias processadas, usar dados de fallback para teste
    if (result.length === 0 && experiencesData && experiencesData.length > 0) {
      console.log('⚠️ Nenhuma categoria processada, usando fallback');
      console.log('🔍 Debug - Estrutura do primeiro tour:', experiencesData[0]);
      return [
        {
          id: 1,
          title: 'Aventura',
          price: 'A partir de R$ 50',
          destinations: '3 Experiências',
          image: '',
          count: 3
        },
        {
          id: 2,
          title: 'Cultural',
          price: 'A partir de R$ 50',
          destinations: '2 Experiências',
          image: '/images/browse-2.jpg',
          count: 2
        },
        {
          id: 3,
          title: 'Ecoturismo',
          price: 'A partir de R$ 50',
          destinations: '2 Experiências',
          image: '/images/browse-3.jpg',
          count: 2
        }
      ];
    }
    
    return result;
  }, [experiencesData]);

  const handleCategoryClick = (category: any) => {
    if (onCategorySelect) {
      // Usar callback para filtrar na mesma página
      onCategorySelect(category.title);
    }
    // Removido o fallback de navegação - filtro deve ser sempre na Home
  };

  if (experiencesLoading) {
    return (
      <SectionWrapper>
        <Container maxWidth="xl">
          <SectionTitle>Carregando Categorias...</SectionTitle>
        </Container>
      </SectionWrapper>
    );
  }

  console.log('🔍 TravelCategories renderizando com:', {
    experiencesData: experiencesData?.length || 0,
    categories: categories.length
  });

  return (
    <SectionWrapper>
      <Container maxWidth="xl">
        <SectionTitle>
          Navegue por Categoria
        </SectionTitle>
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '3rem',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: theme.spacing(6),
            color: '#333',
            [theme.breakpoints.down('md')]: {
              fontSize: '2.5rem',
            },
          }}
        >
          Tipos de Experiências & Atrativos
        </Typography>

        <CategoriesGrid>
          {/* Botão "Todas" para limpar filtro */}
          <CategoryCard
            onClick={() => onCategorySelect && onCategorySelect('Todas')}
            sx={{
              transform: selectedCategory === 'Todas' ? 'scale(1.02)' : 'scale(1)',
              boxShadow: selectedCategory === 'Todas'
                ? '0 8px 32px rgba(0,0,0,0.2)' 
                : '0 4px 20px rgba(0,0,0,0.1)',
              border: selectedCategory === 'Todas'
                ? `2px solid ${theme.palette.primary.main}` 
                : '2px solid transparent',
              transition: 'all 0.3s ease',
            }}
          >
            <ImageContainer>
              <div style={{ 
                width: '100%', 
                height: '100%', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
            TODAS    
              </div>
            </ImageContainer>
            <CardContentStyled>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                <Chip 
                  label="Todas"
                  color="primary"
                  variant="filled"
                  size="medium"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    background: theme.palette.primary.main,
                    color: '#fff',
                    alignSelf: 'flex-start',
                    '&:hover': {
                      background: theme.palette.primary.dark,
                    }
                  }}
                />
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  <Chip 
                    label="Todas as experiências"
                    variant="outlined"
                    size="small"
                    sx={{
                      fontSize: '0.75rem',
                      height: 24,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Chip 
                    label="Disponível"
                    variant="outlined"
                    size="small"
                    color="success"
                    sx={{
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                </Box>
              </Box>
              <CategoryPrice>
                A partir de R$ 50
              </CategoryPrice>
              <DestinationLink>
                <span>Ver todas</span>
                <ArrowIconStyled className="arrow-icon" />
              </DestinationLink>
            </CardContentStyled>
          </CategoryCard>

          {categories.length === 0 ? (
            <Box sx={{ textAlign: 'center', gridColumn: '1 / -1', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Nenhuma categoria encontrada
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                As categorias serão exibidas quando houver experiências disponíveis.
              </Typography>
            </Box>
          ) : (
            categories.map((category, index) => {
              console.log('Renderizando categoria:', category.title, 'com imagem:', category.image);
              const isSelected = selectedCategory === category.title;
              return (
              <CategoryCard
                key={category.id}
                className="animate-zoomIn hover-from-left"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleCategoryClick(category)}
                sx={{
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: isSelected 
                    ? '0 8px 32px rgba(0,0,0,0.2)' 
                    : '0 4px 20px rgba(0,0,0,0.1)',
                  border: isSelected 
                    ? `2px solid ${theme.palette.primary.main}` 
                    : '2px solid transparent',
                  transition: 'all 0.3s ease',
                }}
              >
                <ImageContainer>
                  {(() => {
                    // TODAS as imagens devem vir do Skoobtur - não usar VITE_API_URL
                    let imageSrc = category.image || '';
                    
                    // Só usar imagens que já são URLs completas do Skoobtur (começam com http)
                    if (!imageSrc || !imageSrc.startsWith('http')) {
                      imageSrc = ''; // Se não é URL completa do Skoobtur, não mostrar imagem
                    }
                    
                    console.log('🖼️ TravelCategories - Processando imagem da categoria (APENAS SKOOBTUR):', {
                      categoryTitle: category.title,
                      originalImage: category.image,
                      finalSrc: imageSrc,
                      isValidSkoobturUrl: imageSrc.startsWith('http'),
                      willShow: !!imageSrc
                    });
                    
                    return imageSrc ? (
                      <CategoryImage
                        src={imageSrc}
                        alt={category.title}
                        className="category-image"
                        onError={(e) => {
                          console.log('Erro ao carregar imagem do Skoobtur:', imageSrc);
                          e.currentTarget.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log('Imagem do Skoobtur carregada com sucesso:', imageSrc);
                        }}
                      />
                    ) : (
                      <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                        fontSize: '14px'
                      }}>
                        {category.title}
                      </div>
                    );
                  })()}
                </ImageContainer>
                <CardContentStyled>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                    <Chip 
                      label={category.title}
                      color="primary"
                      variant="filled"
                      size="medium"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        background: theme.palette.primary.main,
                        color: '#fff',
                        alignSelf: 'flex-start',
                        '&:hover': {
                          background: theme.palette.primary.dark,
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      <Chip 
                        label={`${category.count} ${category.count === 1 ? 'Experiência' : 'Experiências'}`}
                        variant="outlined"
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          height: 24,
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                        }}
                      />
                      <Chip 
                        label="Disponível"
                        variant="outlined"
                        size="small"
                        color="success"
                        sx={{
                          fontSize: '0.75rem',
                          height: 24,
                        }}
                      />
                      {category.count >= 3 && (
                        <Chip 
                          label="Popular"
                          variant="filled"
                          size="small"
                          sx={{
                            fontSize: '0.75rem',
                            height: 24,
                            background: '#FF5722',
                            color: '#fff',
                            '&:hover': {
                              background: '#e64a19',
                            }
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  <CategoryPrice>
                    {category.price}
                  </CategoryPrice>
                  <DestinationLink>
                    <span>Ver experiências</span>
                    <ArrowIconStyled className="arrow-icon" />
                  </DestinationLink>
                </CardContentStyled>
              </CategoryCard>
            );
            })
          )}
        </CategoriesGrid>
      </Container>
    </SectionWrapper>
  );
};

export default TravelCategories; 