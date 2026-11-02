import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist');const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};
const server=http.createServer(async(req,res)=>{try{let path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403).end();return}try{if((await stat(path)).isDirectory())path=resolve(path,'index.html');const data=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'}).end(data)}catch{res.writeHead(404,{'Content-Type':'text/html'}).end(await readFile(resolve(root,'404.html')))}}catch{res.writeHead(400).end('Bad request')}});
server.listen(Number(process.env.PORT)||4173,'0.0.0.0',()=>console.log('Local: http://localhost:'+(process.env.PORT||4173)));
