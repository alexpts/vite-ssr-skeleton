import express from 'express'
import fs from 'fs'
import compression from 'compression'
import {createServer as createViteServer} from 'vite'
import utilPath from '../src/util/path.js';
import {render} from '../dist/ssr/entry-ssr.cjs' // @todo need rename extension after build
//import ssr from '../dist/ssr.cjs'

const relPath = utilPath.relPath.bind(null, import.meta.url);
//const manifest = JSON.parse(fs.readFileSync(relPath('..', 'dist', 'client', 'ssr-manifest.json')));
const manifest = {};

const app = express()
// https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/server.js
// https://vitejs.dev/config/#server-middlewaremode

const viteConfig = {
    server: {
        middlewareMode: 'ssr',
    },
    configFile: relPath('..', 'vite.config.js'),
    root: relPath('..'),
    base: '/'
}

const viteSSR = await createViteServer(viteConfig)
//const viteFallback = await createViteServer({...viteConfig, server: {middlewareMode: 'html'}})

app
    // nginx send files compressions
    .use(compression({
        threshold: 4096,
        level: 1 // 1-9 - cpu bound operation
    }))
    // nginx send files
    .use('/app/', express.static(
        relPath('..', 'dist', 'browser'),
        {
            index: false,
            redirect: false,
        }
    ))
    //.use(viteSSR.middlewares)
    //.use(viteFallback.middlewares) //

    // ssr middleware
    app.use('/app/', async (req, res) => {
        //const url = req.originalUrl
        const url = req.url

        try {
            let templateHtml = fs.readFileSync(relPath('../dist/browser/index.html'), 'utf-8') // @todo need cache (not live reload)
            let template = templateHtml;
            // @todo apply transformIndexHtml for src template index.htnl and apply ssrLoadModule to src ssr entry point,
            // compile version is prepared and dont apply to compile versions
            //let template = await viteSSR.transformIndexHtml(url, templateHtml)
            // const { render } = await viteSSR.ssrLoadModule(relPath('..', 'dist', 'ssr', 'entry-ssr.js'))
            const appHtml = await render(url, manifest)

            const html = template.replace(`<!--ssr-->`, appHtml)
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            viteSSR.ssrFixStacktrace(e)
            console.error(e)
            res.status(500).end(e.message)
        }
    })
    .use((req, res, next) => {
        res.status(404).json({error: 'not found'});
    })
app.listen(4000)
