# 👆 Onde Clicar - Guia Visual

## 1. MongoDB Atlas
\`\`\`
🌐 mongodb.com/atlas
👆 "Try Free" (botão verde)
👆 "Build a Database" 
👆 "Shared" (opção gratuita)
👆 "Create Cluster"
👆 "Connect" 
👆 "Connect your application"
📋 COPIE a string que aparece
\`\`\`

## 2. Vercel - Fazer Deploy
\`\`\`
🌐 vercel.com
👆 "Continue with GitHub"
👆 "Import Project"
👆 Escolha seu repositório "ragnarok-veiculos"
👆 "Deploy"
\`\`\`

## 3. Vercel - Configurar Variáveis
\`\`\`
🌐 vercel.com/dashboard
👆 Clique no seu projeto
👆 "Settings" (aba no topo)
👆 "Environment Variables" (menu lateral)
👆 "Add New" (botão)

📝 Adicione uma por vez:
   Nome: MONGODB_URI
   Valor: [cole a string do MongoDB]
   👆 "Save"

   Nome: ADMIN_PASSWORD  
   Valor: suasenha123
   👆 "Save"
\`\`\`

## 4. Vercel - Criar Blob Storage
\`\`\`
🌐 vercel.com/dashboard
👆 "Storage" (aba no topo)
👆 "Create Database"
👆 "Blob" 
📝 Nome: ragnarok-fotos
👆 "Create"
📋 COPIE o token que aparece

Volte para Environment Variables:
   Nome: BLOB_READ_WRITE_TOKEN
   Valor: [cole o token do Blob]
   👆 "Save"
\`\`\`

## 5. Fazer Novo Deploy
\`\`\`
🌐 vercel.com/dashboard
👆 Seu projeto
👆 "Deployments" (aba)
👆 "Redeploy" (nos 3 pontinhos)
⏳ Aguarde alguns minutos
\`\`\`

## 6. Testar o Site
\`\`\`
🌐 seu-projeto.vercel.app
👆 Deve abrir a home do site

🌐 seu-projeto.vercel.app/admin/login
📝 Digite sua senha
👆 "Entrar"
👆 "Adicionar Veículo"
