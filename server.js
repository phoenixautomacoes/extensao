const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.zip': 'application/zip',
};

// Explicit route mapping
const ROUTE_MAP = {
  '/welcome': '/welcome.html',
  '/goodbye': '/goodbye.html',
  '/premium': '/index.html',
  '/changelog': '/index.html',
  '/issue': '/index.html',
  '/ajuda': '/index.html',
  '/help': '/index.html',
};

const server = http.createServer((req, res) => {
  let reqUrl = decodeURI(req.url.split('?')[0]);
  if (reqUrl === '/' || reqUrl === '') reqUrl = '/index.html';

  // Check route map
  if (ROUTE_MAP[reqUrl]) {
    reqUrl = ROUTE_MAP[reqUrl];
  }

  let filePath = path.join(__dirname, reqUrl);

  // If path doesn't have an extension, try appending .html
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      const indexInDir = path.join(filePath, 'index.html');
      if (fs.existsSync(indexInDir)) {
        filePath = indexInDir;
      }
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Fallback to index.html for extension routes while specific pages are prepared
        const indexPath = path.join(__dirname, 'index.html');
        fs.readFile(indexPath, (indexErr, indexContent) => {
          if (!indexErr) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(indexContent);
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Não encontrado');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Erro no servidor: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Phoenix Video Downloader v10.5.49.7 rodando em: http://localhost:${PORT}`);
  console.log(`Rotas ativas: / /welcome /goodbye /changelog /premium /issue /ajuda`);
});
