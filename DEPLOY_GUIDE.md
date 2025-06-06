# Guia de Deploy para Produção

## Problemas Resolvidos

### 1. Upload de Imagens
- **Problema**: O sistema anterior salvava imagens localmente, não funcionando em serverless
- **Solução**: Implementado Vercel Blob para armazenamento em nuvem

### 2. APIs Serverless
- **Problema**: Algumas funções não eram compatíveis com ambiente serverless
- **Solução**: Criadas versões otimizadas das APIs

## Configuração no Vercel

### 1. Variáveis de Ambiente
Configure estas variáveis no painel do Vercel:

\`\`\`
MONGODB_URI=sua_string_de_conexao_mongodb
ADMIN_PASSWORD=sua_senha_admin
BLOB_READ_WRITE_TOKEN=seu_token_vercel_blob
\`\`\`

### 2. Vercel Blob
1. Acesse o painel do Vercel
2. Vá em Storage → Create Database → Blob
3. Copie o token gerado
4. Adicione como BLOB_READ_WRITE_TOKEN

### 3. MongoDB Atlas
1. Crie uma conta no MongoDB Atlas
2. Crie um cluster gratuito
3. Configure o acesso de rede (0.0.0.0/0 para permitir Vercel)
4. Copie a string de conexão
5. Adicione como MONGODB_URI

## Deploy

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático será feito

## Teste

Após o deploy:
1. Acesse /admin/login
2. Teste o upload de imagens
3. Verifique se os carros aparecem no catálogo

## Troubleshooting

### Erro de Upload
- Verifique se BLOB_READ_WRITE_TOKEN está configurado
- Confirme que o token tem permissões de escrita

### Carros não aparecem
- Verifique MONGODB_URI
- Confirme que o banco tem dados
- Execute o script de população se necessário

### Erro 500
- Verifique os logs no painel do Vercel
- Confirme todas as variáveis de ambiente
\`\`\`
