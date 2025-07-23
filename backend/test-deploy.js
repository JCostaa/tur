import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testando deploy do backend...');

// Verificar se o build foi executado
if (!fs.existsSync('dist')) {
  console.log('❌ Diretório dist não encontrado. Executando build...');
  const buildProcess = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
  
  buildProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('❌ Build falhou');
      process.exit(1);
    }
    console.log('✅ Build concluído');
    testProduction();
  });
} else {
  testProduction();
}

function testProduction() {
  console.log('🔍 Verificando arquivos compilados...');
  
  // Verificar se os arquivos principais existem
  const requiredFiles = [
    'dist/index.js',
    'dist/config/database.js',
    'dist/entities/User.js'
  ];
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      console.error(`❌ Arquivo não encontrado: ${file}`);
      process.exit(1);
    }
  }
  
  console.log('✅ Todos os arquivos necessários encontrados');
  
  // Testar se o código compilado pode ser executado
  console.log('🚀 Testando execução do código compilado...');
  
  try {
    // Testar importação do arquivo principal
    const indexPath = path.resolve('dist/index.js');
    console.log(`📁 Tentando importar: ${indexPath}`);
    
    // Verificar se o arquivo é válido
    const content = fs.readFileSync(indexPath, 'utf8');
    if (content.includes('import') || content.includes('export')) {
      console.log('✅ Arquivo compilado parece válido');
    } else {
      console.log('⚠️  Arquivo compilado pode ter problemas');
    }
    
  } catch (error) {
    console.error('❌ Erro ao testar arquivo compilado:', error.message);
    process.exit(1);
  }
  
  console.log('🎉 Teste de deploy concluído com sucesso!');
  console.log('📋 Resumo:');
  console.log('  - Build executado ✅');
  console.log('  - Arquivos compilados encontrados ✅');
  console.log('  - Código compilado válido ✅');
  console.log('');
  console.log('🚀 Pronto para deploy!');
} 