/**
 * Exercise 3: Create an HTTP web server
 */
const fs = require('fs');

const http = require('http');

//create a server
const getFileText = async (file) => {
  const data = await fs.promises.readFile(file, 'utf8');
  return data.toString();
};

let server = http.createServer(async (req, res) => {
  const urlMapping = {
    '/': ['index.html', 'text/html'],
    '/index.js': ['index.js', 'text/javascript'],
    '/style.css': ['style.css', 'text/css'],
  };

  const [file, type] = urlMapping[req.url] || [null, null];

  if (file) {
    const data = await getFileText(file);
    res.writeHead(200, { 'Content-Type': type });
    res.write(data);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});

server.listen(3000); // The server starts to listen on port 3000
