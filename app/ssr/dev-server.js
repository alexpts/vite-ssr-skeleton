import {createServer as createViteServer} from 'vite'
import utilPath from '../src/util/path.js';

const relPath = utilPath.relPath.bind(null, import.meta.url);

const vite = await createViteServer({
    configFile: relPath('..', 'vite.config.js'),
    root: relPath('..'),
    server: {
        port: 3000
    }
})

await vite.listen()
vite.printUrls()
