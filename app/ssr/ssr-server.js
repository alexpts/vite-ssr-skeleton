import fs from 'fs'
import Koa from 'koa'
import zlib from 'zlib'
import Router from '@koa/router'
import compress from 'koa-compress';
import serve from 'koa-static'
import utilPath from '../src/util/path.js';
import {render as renderSsr} from '../dist/ssr/entry-ssr.cjs'
import {baseUrl as vueBaseUrl} from '../vite.config.js';

const relPath = utilPath.relPath.bind(null, import.meta.url);
let templateHtml = fs.readFileSync(relPath('../dist/browser/index.html'), 'utf-8')

const app = new Koa

const router = new Router({prefix: '/app'})
router.get('/:path', async(ctx, next) => {
    let {url, originalUrl} = ctx
    await next()
})

app
    .use(compress({ // CPU bound
        threshold: 0,
        deflate: false,
        br: false,
        gzip: {
            flush: zlib.constants.Z_SYNC_FLUSH
        },
    }))
    .use(serve(
        relPath('../dist/browser'),
        {
            index: false
        }
    ))
    .use(router.routes())
    //.use(router.allowedMethods())
    // .use(async(ctx, next) => {
    //     ctx.body = {message: 'Hello World'};
    // })
    .use(async function ssr(ctx) {
        const {url} = ctx
        const appUrl = url.startsWith(`/${vueBaseUrl}`) ? url.slice(vueBaseUrl.length + 1) : url; // remove base url vue app
        let ssrHtml = '';

        try {
            ssrHtml = await renderSsr(appUrl)
        } catch (error) {
            ctx.throw(500, 'Unauthorized', {
                expose: false,
                middleware: 'ssr',
                prevError: error
            });
        }

        const html = templateHtml.replace(`<!--ssr-->`, ssrHtml)
        ctx.status = 200
        ctx.type = 'text/html; charset=utf-8'
        ctx.body = html

    })
    .listen(3001)
