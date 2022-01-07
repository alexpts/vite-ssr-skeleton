import {dirname, resolve} from 'path'

const relPath = (importMetaUrl, ...args) => {
    const metaDirname = dirname(new URL(importMetaUrl).pathname)
    return resolve(metaDirname, ...args)
}

export default {
    relPath
}
