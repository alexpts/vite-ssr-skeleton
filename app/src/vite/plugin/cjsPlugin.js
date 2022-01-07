import fs from 'fs/promises';
import {dirname} from 'path';
import utilPath from '../../util/path.js';

const relPath = utilPath.relPath.bind(null, import.meta.url);

const fixSsrCjs = async() => {
    const srcFile = relPath('../../../dist/ssr/entry-ssr.js')
    const targetFile = relPath('../../../dist/ssr/entry-ssr.cjs')
    await fs.copyFile(srcFile, targetFile)
}

const createSymlinkToAssertWithBasePrefix = async(baseDir) => {
    let pathDir = baseDir.split('/').filter(Boolean).join('/')
    const srcDir = relPath('../../../dist/browser/assets');
    const targetDir = relPath(`../../../dist/browser`, pathDir, 'assets');

    await fs.mkdir(dirname(targetDir))
    await fs.symlink(srcDir, targetDir)
}

export default function projectCjsPlugin(rawOptions) {
    let isSsr = false;
    let baseDir = '';

    return {
        name: 'vite:project-cjs',
        config(config, env) {
            isSsr = config.build.hasOwnProperty('ssr');
            baseDir = config.base || '';
        },
        /**
         * @return {Promise<void>}
         */
        async closeBundle() {
            if (isSsr) {
                await fixSsrCjs();
            }

            if (!isSsr && baseDir) {
                await createSymlinkToAssertWithBasePrefix(baseDir);
            }
        }
    }
}
