# 🎯 Exemplo de Configuração

## NO SEU CÓDIGO (já está certo):
\`\`\`typescript
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ragnarok2025"
\`\`\`

## NO VERCEL (você vai configurar):
\`\`\`
Environment Variables:
┌─────────────────┬──────────────────────┐
│ Name            │ Value                │
├─────────────────┼──────────────────────┤
│ ADMIN_PASSWORD  │ minhaLoja@2024!      │
│ MONGODB_URI     │ mongodb+srv://...    │
│ BLOB_READ_...   │ vercel_blob_rw_...   │
└─────────────────┴──────────────────────┘
\`\`\`

## RESULTADO:
- Código pega "minhaLoja@2024!" do Vercel
- Ignora o "ragnarok2025" (só era backup)
- Login funciona com "minhaLoja@2024!"
