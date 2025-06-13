# 🚀 Como Colocar Seu Site no Ar - Guia Simples

## Passo 1: MongoDB (Banco de Dados) 🗄️

1. **Acesse:** https://mongodb.com/atlas
2. **Clique:** "Try Free" 
3. **Crie conta** com seu email
4. **Escolha:** "Shared" (gratuito)
5. **Região:** escolha a mais próxima do Brasil
6. **Nome:** `ragnarok-veiculos`
7. **Usuário:** crie um usuário e senha
8. **IP:** coloque `0.0.0.0/0` (permite acesso de qualquer lugar)
9. **Copie** a connection string que aparece

## Passo 2: Vercel (Hospedagem) 🌐

1. **Acesse:** https://vercel.com
2. **Login** com GitHub
3. **Import Project** → escolha seu repositório
4. **Deploy** (vai falhar, mas é normal)

## Passo 3: Configurar Variáveis 🔧

No painel do Vercel:
1. **Vá em:** Settings → Environment Variables
2. **Adicione estas 3 variáveis:**

\`\`\`
Nome: MONGODB_URI
Valor: [cole aqui a string do MongoDB]

Nome: ADMIN_PASSWORD  
Valor: [sua senha para admin, ex: minhasenha123]

Nome: BLOB_READ_WRITE_TOKEN
Valor: [vai ser criado automaticamente quando você criar o Blob Storage]
\`\`\`

## Passo 4: Criar Blob Storage (Para Fotos) 📸

1. **No Vercel:** Storage → Create Database → Blob
2. **Nome:** `ragnarok-images`
3. **Copie o token** que aparece
4. **Cole** na variável `BLOB_READ_WRITE_TOKEN`

## Passo 5: Fazer Novo Deploy ✅

1. **No Vercel:** Deployments → Redeploy
2. **Aguarde** alguns minutos
3. **Teste:** acesse seu-site.vercel.app

## Passo 6: Adicionar Carros 🚗

1. **Acesse:** seu-site.vercel.app/admin/login
2. **Digite** sua senha de admin
3. **Clique:** "Adicionar Veículo"
4. **Preencha** os dados
5. **Faça upload** das fotos
6. **Salve**

## 🆘 Se Algo Der Errado

- **Site não abre:** verifique se todas as variáveis estão corretas
- **Não consegue fazer login:** verifique a senha em ADMIN_PASSWORD
- **Upload não funciona:** verifique se criou o Blob Storage
- **Carros não aparecem:** verifique a connection string do MongoDB

## 📱 Testando

Depois de tudo configurado, teste:
- ✅ Site abre na home
- ✅ Consegue fazer login em /admin/login
- ✅ Consegue adicionar um carro
- ✅ Carro aparece no catálogo
- ✅ Fotos carregam corretamente
