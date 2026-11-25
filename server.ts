import { createServer } from 'https';
import { parse } from 'url';
import next from 'next';
import { readFileSync } from "fs";
import { IncomingMessage, ServerResponse } from "node:http";
import {RequestHandler} from "next/dist/server/next";

const port: number = 3000;
const dev: boolean = process.env.NODE_ENV !== 'production';

// create next app in dev mode
const app = next({ dev });
const handle: RequestHandler = app.getRequestHandler();

// use our local ssl cert + key
const httpsOptions = {
  key: readFileSync('./localhost-key.pem'),
  cert: readFileSync('./localhost.pem')
};

// create & run https server using our ssl cert on `localhost`
app.prepare().then(() => {
    createServer(httpsOptions, (req: IncomingMessage, res: ServerResponse) => {
        const parsedUrl = parse(req.url!, true);
        handle(req,  res,  parsedUrl);
    }).listen(port,  () => { console.log(`HTTPS running on port ${port}`)});
})