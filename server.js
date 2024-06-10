const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 4000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'help.html'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading the HTML file');
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url === '/discord' && req.method === 'POST') {
    // Handle the POST request to '/discord' endpoint
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      // Process the request body and send the response
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true }));
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});