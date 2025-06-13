# Configuração para Produção

## 🚀 Deploy no Vercel

### 1. Configurar Vercel Blob
1. Acesse [vercel.com](https://vercel.com)
2. Vá em seu projeto → Storage → Create Database → Blob
3. Copie o token gerado
4. Adicione como variável de ambiente: `BLOB_READ_WRITE_TOKEN`

### 2. Configurar MongoDB Atlas
1. Acesse [mongodb.com/atlas](https://mongodb.com/atlas)
2. Crie um cluster gratuito
3. Configure Network Access: `0.0.0.0/0` (para permitir Vercel)
4. Copie a connection string
5. Adicione como variável de ambiente: `MONGODB_URI`

### 3. Variáveis de Ambiente no Vercel
Configure estas variáveis no painel do Vercel:

\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ragnarok_veiculos
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_token_aqui
ADMIN_PASSWORD=sua_senha_admin_segura
\`\`\`

### 4. Deploy
1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente
3. Deploy será feito automaticamente

## ✅ Funcionalidades em Produção

- ✅ Upload de imagens via Vercel Blob
- ✅ Banco de dados MongoDB Atlas
- ✅ Sistema de autenticação admin
- ✅ Múltiplas imagens por veículo
- ✅ Galeria de imagens responsiva
- ✅ Verificação automática de configuração

## 🔧 Teste Após Deploy

1. Acesse `/admin/login`
2. Teste upload de imagens
3. Verifique se carros aparecem no catálogo
4. Confirme que não há erros no console

## 🆘 Troubleshooting

### Erro de Upload
- Verifique `BLOB_READ_WRITE_TOKEN`
- Confirme que o token tem permissões de escrita

### Carros não aparecem
- Verifique `MONGODB_URI`
- Confirme conexão com MongoDB Atlas
- Execute script de população se necessário

### Erro 500
- Verifique logs no painel do Vercel
- Confirme todas as variáveis de ambiente
