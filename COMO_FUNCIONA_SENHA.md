# 🔐 Como a Senha Funciona Agora

## 📝 NO CÓDIGO (route.ts):
\`\`\`typescript
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ragnarok2024"
\`\`\`

**Traduzindo:** 
"Pegue a senha da variável de ambiente, se não tiver, use 'ragnarok2024'"

## 🌐 NO VERCEL (Environment Variables):
\`\`\`
ADMIN_PASSWORD = suasenhasecreta123
\`\`\`

## 🔄 COMO FUNCIONA:
1. Alguém tenta fazer login
2. Sistema pega a senha do Vercel (não do código)
3. Compara com o que a pessoa digitou
4. Se bater = entra ✅
5. Se não bater = acesso negado ❌

## 🎯 VANTAGENS:
- ✅ Senha não fica exposta no GitHub
- ✅ Você pode trocar sem mexer no código
- ✅ Cada ambiente pode ter senha diferente
- ✅ Muito mais seguro!
