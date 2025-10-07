# ===== CONFIGURAÇÃO DO VAR MARKETPLACE DINÂMICO =====
# 
# Para configurar o link dinâmico do Var Marketplace, você precisa definir
# a variável VITE_CITY no arquivo .env do frontend.
#
# Exemplo de configuração:
# VITE_CITY=Barra do Bugres
#
# Isso fará com que o link do Var Marketplace seja:
# https://skoobtur.com/municipio/barra-do-bugres
#
# A função cityToSlug() converte automaticamente:
# - Remove acentos e caracteres especiais
# - Converte para minúsculas
# - Substitui espaços por hífens
# - Remove hífens duplicados
#
# Exemplos de conversão:
# "Barra do Bugres" -> "barra-do-bugres"
# "São Paulo" -> "sao-paulo"
# "Rio de Janeiro" -> "rio-de-janeiro"
# "Brasília" -> "brasilia"
#
# ===== ARQUIVO .ENV COMPLETO =====
# 
# Crie um arquivo .env na pasta packages/frontend/ com o seguinte conteúdo:

VITE_CITY=Barra do Bugres
VITE_STATE=MT
VITE_COUNTRY=BR
VITE_REGION=Centro-Oeste

# ===== COMO USAR =====
#
# A função getVarMarketplaceUrl() está disponível em:
# packages/frontend/src/utils/varMarketplace.ts
#
# Exemplo de uso em componentes:
# import { getVarMarketplaceUrl } from '../utils/varMarketplace';
# 
# const url = getVarMarketplaceUrl();
# // Resultado: "https://skoobtur.com/municipio/barra-do-bugres"
#
# ===== COMPONENTES ATUALIZADOS =====
#
# Os seguintes componentes já foram atualizados para usar a URL dinâmica:
# - Footer.tsx (link do Var Marketplace)
# - TourDetail.tsx (botão "Reservar Agora")
#
# ===== TESTE =====
#
# Para testar se está funcionando:
# 1. Configure VITE_CITY no .env
# 2. Execute o projeto
# 3. Verifique se o link do Var Marketplace no footer está correto
# 4. Teste o botão "Reservar Agora" em qualquer tour
