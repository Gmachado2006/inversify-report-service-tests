import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { createContainer } from './infra/config/container';
import { createApp } from './http/app';

dotenv.config();


const requiredEnvVars = ['APP_PORT'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Variável de ambiente ${envVar} não definida`);
    process.exit(1);
  }
}

const container = createContainer();

const app = createApp(container);


const port = parseInt(process.env.APP_PORT || '3000');
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(`📝 Ambiente: ${process.env.APP_ENV || 'dev'}`);
  console.log(`🔗 Health check: http://localhost:${port}/health`);
  console.log(`📊 Exemplo: http://localhost:${port}/relatorio/5?email=teste@exemplo.com`);
});