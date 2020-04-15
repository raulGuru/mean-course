const http = require('http');
const app = require('./backend/app');

const port = process.env.PORT || 3000;

// const server = http.createServer((req, res) => {
//   res.end('This is response');
// });

app.set(port);
const server = http.createServer(app);

server.listen(port);

