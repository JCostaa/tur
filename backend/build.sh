#!/bin/bash

echo "🚀 Iniciando build do projeto..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Compilar TypeScript
echo "🔨 Compilando TypeScript..."
npm run build

# Verificar se o build foi bem-sucedido
if [ -d "dist" ]; then
    echo "✅ Build concluído com sucesso!"
    echo "📁 Conteúdo do diretório dist:"
    ls -la dist/
else
    echo "❌ Erro no build - diretório dist não encontrado"
    exit 1
fi

# Criar diretório uploads se não existir
mkdir -p dist/uploads

echo "�� Build finalizado!" 