import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve, extname, sep} from 'node:path';
const root=resolve(import.meta.dirname);
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.json':'application/json'};
createServer(async(req,res)=>{try{const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(path!==root&&!path.startsWith(root+sep))throw Error();const file=path===root?resolve(root,'index.html'):path;const data=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}}).listen(4173,'127.0.0.1',()=>console.log('RoseGames: http://127.0.0.1:4173'));
