# Ragnarok Veículos

Sistema de catálogo de veículos desenvolvido com Next.js.

## Configuração do Ambiente

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Banco de Dados

#### Opção A: MongoDB Local
1. Instale o MongoDB localmente
2. Inicie o serviço MongoDB
3. O arquivo `.env.local` já está configurado para usar `mongodb://localhost:27017/ragnarok_veiculos`

#### Opção B: MongoDB Atlas (Recomendado)
1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crie um cluster gratuito
3. Configure o acesso de rede (adicione seu IP ou 0.0.0.0/0 para desenvolvimento)
4. Obtenha a string de conexão
5. Edite o arquivo `.env.local` e substitua a linha MONGODB_URI:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ragnarok_veiculos?retryWrites=true&w=majority
```

### 3. Popular o Banco de Dados (Opcional)
```bash
node scripts/populate-cars.js
```

### 4. Executar o Projeto
```bash
npm run dev
```

## Estrutura do Projeto

- `/app` - Páginas e rotas da aplicação
- `/components` - Componentes React reutilizáveis
- `/lib` - Utilitários e configurações
- `/public` - Arquivos estáticos

## Deploy

Consulte o arquivo `DEPLOY_GUIDE.md` para instruções detalhadas de deploy em produção.

## Troubleshooting

### Erro de Conexão MongoDB
Se você receber erros como "ECONNREFUSED 127.0.0.1:27017":

1. **MongoDB Local**: Certifique-se de que o MongoDB está instalado e rodando
2. **MongoDB Atlas**: Verifique se a string de conexão no `.env.local` está correta
3. **Rede**: Confirme que seu IP está autorizado no MongoDB Atlas

### Variáveis de Ambiente
Certifique-se de que o arquivo `.env.local` existe na raiz do projeto com as configurações necessárias.