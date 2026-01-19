const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let filePath;

  // Routes
  if (req.url === '/' || req.url === '/fr' || req.url === '/french') {
    filePath = path.join(__dirname, 'presentation.html');
  } else if (req.url === '/he' || req.url === '/hebrew' || req.url === '/heb') {
    filePath = path.join(__dirname, 'presentation_hebrew.html');
  } else if (req.url === '/presentation.html') {
    filePath = path.join(__dirname, 'presentation.html');
  } else if (req.url === '/presentation_hebrew.html') {
    filePath = path.join(__dirname, 'presentation_hebrew.html');
  } else {
    // Page d'accueil avec les deux liens
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MASA - Présentations</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            padding: 40px;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 10px;
            background: linear-gradient(135deg, #00d4aa 0%, #00b894 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        p { color: #94a3b8; margin-bottom: 50px; font-size: 1.2rem; }
        .links {
            display: flex;
            gap: 30px;
            justify-content: center;
            flex-wrap: wrap;
        }
        a {
            display: block;
            padding: 25px 50px;
            background: rgba(255,255,255,0.05);
            border: 2px solid rgba(0, 212, 170, 0.3);
            border-radius: 16px;
            color: white;
            text-decoration: none;
            font-size: 1.3rem;
            transition: all 0.3s ease;
        }
        a:hover {
            background: rgba(0, 212, 170, 0.1);
            border-color: #00d4aa;
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 212, 170, 0.2);
        }
        .flag { font-size: 2rem; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>MASA</h1>
        <p>Marketplace Intelligente BTP</p>
        <div class="links">
            <a href="/fr">
                <div class="flag">🇫🇷</div>
                Présentation Française
            </a>
            <a href="/he">
                <div class="flag">🇮🇱</div>
                מצגת בעברית
            </a>
        </div>
    </div>
</body>
</html>
    `);
    return;
  }

  // Serve the HTML file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`French: http://localhost:${PORT}/fr`);
  console.log(`Hebrew: http://localhost:${PORT}/he`);
});
