var http = require('http');

function RequestListener(req, res) {
	res.write("Hello fuck");
	res.end();
}

var server = http.createServer(RequestListener);
server.listen(5517);

console.log('Server running at http://127.0.0.1:5517/');