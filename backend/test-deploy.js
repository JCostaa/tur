// Script para testar o deploy da API
const https = require('https');

const testEndpoint = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log(`✅ ${url} - Status: ${res.statusCode}`);
          console.log(`   Response:`, jsonData);
          resolve(jsonData);
        } catch (error) {
          console.log(`❌ ${url} - Error parsing JSON:`, error.message);
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.log(`❌ ${url} - Error:`, error.message);
      reject(error);
    });
  });
};

// Substitua pela URL do seu deploy no Railway
const RAILWAY_URL = 'https://seu-app.railway.app'; // Mude para sua URL

console.log('🚀 Testando API no Railway...\n');

// Teste 1: Health Check
testEndpoint(`${RAILWAY_URL}/api/health`)
  .then(() => {
    console.log('\n🎉 API está funcionando!');
    console.log(`📡 URL da API: ${RAILWAY_URL}`);
    console.log('\n📋 Próximos passos:');
    console.log('1. Configure a URL da API no frontend');
    console.log('2. Teste as rotas de autenticação');
    console.log('3. Configure o CORS se necessário');
  })
  .catch((error) => {
    console.log('\n❌ API não está respondendo corretamente');
    console.log('Verifique:');
    console.log('1. Se o deploy foi concluído');
    console.log('2. Se as variáveis de ambiente estão corretas');
    console.log('3. Os logs do Railway');
  }); 