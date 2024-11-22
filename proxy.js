const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const proxyTarget = 'https://formybaby-39rolkppn-eums046s-projects.vercel.app';

const proxyServer = http.createServer((req, res) => {
  proxy.web(req, res, { target: proxyTarget });
});

proxyServer.listen(4000, () => {
  console.log('Proxy server listening on port 4000');
});
