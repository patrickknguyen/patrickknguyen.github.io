/* ==========================================
   server.js
   Local preview server: run `node server.js`
   and open http://localhost:8000. Not used
   by GitHub Pages.
   ========================================== */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  // Decoding lets paths with spaces resolve to real files
  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(req.url);
  } catch (e) {
    decodedUrl = req.url;
  }

  const urlPath = decodedUrl.split('?')[0].split('#')[0];

  let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);

  // Folder URLs like /vigor serve that folder's index.html
  try {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch (e) {
    // A missing path falls through to readFile, which returns the 404
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The requested file could not be found.</p>', 'utf-8');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      const headers = {
        'Content-Type': contentType,
        'Content-Length': content.length
      };
      if (ext === '.pdf') {
        headers['Content-Disposition'] = 'inline';
      }
      res.writeHead(200, headers);
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\x1b[32m✔ Local server successfully started!\x1b[0m`);
  console.log(`Server running at: \x1b[36mhttp://localhost:${PORT}/\x1b[0m`);
  console.log(`Press \x1b[31mCtrl+C\x1b[0m to stop the server.`);
});
