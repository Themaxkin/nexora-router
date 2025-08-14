// lib/watcher.js

const nodemon = require('nodemon');
const path = require('path');

/**
 * 文件监视器
 * 当监视目录中的文件发生变化时，执行 'nexora build' 命令
 * @param {import('./types').ProRouterConfig} config - 已加载的配置对象
 */
function startWatcher(config) {
  const scriptPath = path.resolve(__dirname, '../bin/cli.js');

  nodemon({
    script: scriptPath,
    args: ['build'],
    watch: [config.routersPath],
    ext: config.watchExtensions,
    stdout: true,
  });

  nodemon
    .on('start', () => {
      console.log(`[Nexora] Watching for changes in: ${config.routersPath}`);
      console.log(`[Nexora] Press "rs" to restart at any time.`);
    })
    .on('quit', () => {
      console.log('[Nexora] Process has quit.');
      process.exit();
    })
    .on('restart', (files) => {
      console.log('[Nexora] Restarting due to change in:', files);
    });
}

module.exports = { startWatcher };