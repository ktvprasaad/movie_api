const http = require('http'),
      fs = require('fs'),
      url = require('url');

http.createServer((request, response) => {
    var addr = request.url,
        q = url.parse(addr, true);

    if (q.pathname.includes('documentation')) {
        fs.readFile('documentation.html', function (error, pageResponse) {
            if (error) {
               throw error;
            } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(pageResponse);
            }
            response.end();
        });
    } else {
        fs.readFile('index.html', function (error, pageResponse) {
            if (error) {
                throw error;
             } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(pageResponse);
            }
            response.end();
        });
    }

    fs.appendFile('log.txt', 'URL: ' + addr + '\Timestamp: ' + new Date() + '\n\n', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(addr + 'Added to log');
        }
    });

}).listen(8080);