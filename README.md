# Phoenix Video Downloader — Landing & Portal Oficial

Portal oficial, landing page e rotas integradas para a extensão de navegador **Phoenix Video Downloader v10.5.49.7**.

- **Domínio de Produção:** [https://extensao.phoenixautomacoes.com.br/](https://extensao.phoenixautomacoes.com.br/)
- **E-mail de Suporte:** `extensao@phoenixautomacoes.com.br`

---

## 🚀 Rotas Integradas da Extensão

| Rota | Arquivo / Destino | Finalidade |
|---|---|---|
| `/` | `index.html` | Landing page oficial com apresentação, simulador e download da v10.5.49.7 |
| `/welcome` | `welcome.html` (e `/welcome/index.html`) | Tela de boas-vindas pós-instalação com guia visual para fixar o ícone (Pin 📌) |
| `/goodbye` | `goodbye.html` (e `/goodbye/index.html`) | Tela de desinstalação com formulário de pesquisa e coleta de feedback |
| `/changelog` | `/changelog/index.html` | Notas de atualização da versão v10.5.49.7 (redireciona para novidades) |
| `/premium` | `/premium/index.html` | Modo Turbo e recursos avançados |
| `/issue` | `/issue/index.html` | Abertura de chamado ou envio de relato de erro |
| `/ajuda` | `/ajuda/index.html` | Central de Ajuda e Suporte |

---

## 🛠️ Como Executar Localmente

### Usando Node.js (Servidor nativo incluso):
```bash
node server.js
```
Acesse em: `http://localhost:3000`

---

## 🌐 Deploy em Produção

O projeto é 100% compatível e pronto para deploy imediato em:
- **Vercel** (arquivo `vercel.json` incluso)
- **Netlify / Cloudflare Pages** (arquivo `_redirects` incluso)
- **GitHub Pages** (estrutura de diretórios estáticos + `404.html` SPA inclusos)
- **Servidor VPS / Nginx / Apache** (Node.js ou arquivos HTML estáticos)

---

&copy; 2026 Phoenix Automações • Todos os direitos reservados.
