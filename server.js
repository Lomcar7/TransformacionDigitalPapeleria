import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3000;

const server = http.createServer((req, res) => {

    let filePath = './public/index.html';

    if(req.url === '/styles.css'){
        filePath = './public/styles.css';
    }

    if(req.url === '/app.js'){
        filePath = './public/app.js';
    }

    const ext = path.extname(filePath);

    let contentType = 'text/html';

    if(ext === '.css'){
        contentType = 'text/css';
    }

    if(ext === '.js'){
        contentType = 'text/javascript';
    }

    fs.readFile(filePath, (err, content) => {

        if(err){
            res.writeHead(500);
            res.end('Error del servidor');
            return;
        }

        res.writeHead(200, {
            'Content-Type': contentType
        });

        res.end(content);
    });

});

server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
